export const CONTACT_RECIPIENT = "joilinsm@gmail.com";

export const CONTACT_LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  subject: { min: 3, max: 150 },
  message: { min: 20, max: 5000 },
} as const;

export type ContactFields = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactFieldErrors = Partial<Record<keyof ContactFields, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asTrimmedString(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export function validateContactFields(
  values: ContactFields,
): ContactFieldErrors {
  const fields: ContactFieldErrors = {};

  if (values.name.length < CONTACT_LIMITS.name.min) {
    fields.name = "Please enter your name.";
  } else if (values.name.length > CONTACT_LIMITS.name.max) {
    fields.name = "Please use a shorter name.";
  }

  if (!values.email) {
    fields.email = "Please enter a valid email address.";
  } else if (
    values.email.length > CONTACT_LIMITS.email.max ||
    !EMAIL_PATTERN.test(values.email)
  ) {
    fields.email = "Please enter a valid email address.";
  }

  if (values.subject.length < CONTACT_LIMITS.subject.min) {
    fields.subject = "Please add a clear subject.";
  } else if (values.subject.length > CONTACT_LIMITS.subject.max) {
    fields.subject = "Please use a shorter subject.";
  }

  if (values.message.length < CONTACT_LIMITS.message.min) {
    fields.message = "Please write at least 20 characters.";
  } else if (values.message.length > CONTACT_LIMITS.message.max) {
    fields.message = "Please shorten your message.";
  }

  return fields;
}

export function parseContactPayload(input: unknown): {
  fields: ContactFields;
  errors: ContactFieldErrors;
  isHoneypot: boolean;
} {
  const source =
    input && typeof input === "object" ? (input as Record<string, unknown>) : {};

  const fields: ContactFields = {
    name: asTrimmedString(source.name, CONTACT_LIMITS.name.max + 50),
    email: asTrimmedString(source.email, CONTACT_LIMITS.email.max + 50),
    subject: asTrimmedString(source.subject, CONTACT_LIMITS.subject.max + 50),
    message: asTrimmedString(source.message, CONTACT_LIMITS.message.max + 200),
  };

  const honeypot = asTrimmedString(source.website, 200);

  return {
    fields,
    errors: validateContactFields(fields),
    isHoneypot: honeypot.length > 0,
  };
}

export function buildContactEmail(fields: ContactFields): {
  subject: string;
  text: string;
  html: string;
} {
  const subject = `[Portfolio Contact] ${fields.subject}`;
  const text = [
    "New portfolio contact message",
    "",
    "A new message was received from the JOILIN S M portfolio website.",
    "",
    "Name",
    fields.name,
    "",
    "Email",
    fields.email,
    "",
    "Subject",
    fields.subject,
    "",
    "Message",
    fields.message,
    "",
    "Received via",
    "JOILIN S M Portfolio",
  ].join("\n");

  const html = `
    <div style="font-family: Georgia, 'Times New Roman', serif; color: #14202b; line-height: 1.6; max-width: 640px;">
      <p style="margin: 0 0 16px;">New portfolio contact message</p>
      <p style="margin: 0 0 24px; color: #4b5b68;">A new message was received from the JOILIN S M portfolio website.</p>
      <p style="margin: 0 0 4px; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: #6b7c89;">Name</p>
      <p style="margin: 0 0 16px;">${escapeHtml(fields.name)}</p>
      <p style="margin: 0 0 4px; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: #6b7c89;">Email</p>
      <p style="margin: 0 0 16px;"><a href="mailto:${escapeHtml(fields.email)}">${escapeHtml(fields.email)}</a></p>
      <p style="margin: 0 0 4px; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: #6b7c89;">Subject</p>
      <p style="margin: 0 0 16px;">${escapeHtml(fields.subject)}</p>
      <p style="margin: 0 0 4px; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: #6b7c89;">Message</p>
      <p style="margin: 0 0 24px; white-space: pre-wrap;">${escapeHtml(fields.message)}</p>
      <p style="margin: 0; font-size: 12px; color: #6b7c89;">Received via: JOILIN S M Portfolio</p>
    </div>
  `;

  return { subject, text, html };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
