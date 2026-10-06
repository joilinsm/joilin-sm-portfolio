import {
  buildContactEmail,
  CONTACT_RECIPIENT,
  parseContactPayload,
} from "@/lib/contact";

const RESEND_EMAIL_ENDPOINT = "https://api.resend.com/emails";
const recentSubmissions = new Map<string, number>();
const SUBMISSION_COOLDOWN_MS = 20_000;

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return Response.json({ error: "invalid_request" }, { status: 415 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "invalid_request" }, { status: 400 });
  }

  const { fields, errors, isHoneypot } = parseContactPayload(payload);

  if (isHoneypot) {
    return Response.json({ ok: true });
  }

  if (Object.keys(errors).length) {
    return Response.json({ error: "validation", fields: errors }, { status: 400 });
  }

  const submissionKey = `${fields.email.toLowerCase()}:${fields.message.slice(0, 80)}`;
  const lastSubmittedAt = recentSubmissions.get(submissionKey);
  const now = Date.now();

  if (lastSubmittedAt && now - lastSubmittedAt < SUBMISSION_COOLDOWN_MS) {
    return Response.json({ error: "too_many_requests" }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const fromAddress =
    process.env.CONTACT_FROM_EMAIL?.trim() ||
    "JOILIN S M Portfolio <beth.t@example.com>";

  if (!apiKey) {
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  const email = buildContactEmail(fields);

  try {
    const providerResponse = await fetch(RESEND_EMAIL_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [CONTACT_RECIPIENT],
        reply_to: fields.email,
        subject: email.subject,
        text: email.text,
        html: email.html,
      }),
    });

    if (!providerResponse.ok) {
      return Response.json({ error: "send_failed" }, { status: 502 });
    }
  } catch {
    return Response.json({ error: "send_failed" }, { status: 502 });
  }

  recentSubmissions.set(submissionKey, now);
  pruneRecentSubmissions(now);

  return Response.json({ ok: true });
}

function pruneRecentSubmissions(now: number) {
  for (const [key, submittedAt] of recentSubmissions) {
    if (now - submittedAt > SUBMISSION_COOLDOWN_MS) {
      recentSubmissions.delete(key);
    }
  }
}
