"use client";

import { LoaderCircle, Send } from "lucide-react";
import { FormEvent, useState } from "react";
import {
  type ContactFieldErrors,
  type ContactFields,
  validateContactFields,
} from "@/lib/contact";

type SubmissionState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [status, setStatus] = useState<SubmissionState>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const values: ContactFields = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      subject: String(data.get("subject") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    };
    const nextErrors = validateContactFields(values);

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus("idle");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          website: String(data.get("website") ?? "").trim(),
        }),
      });

      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string; fields?: ContactFieldErrors }
        | null;

      if (response.status === 400 && result?.fields) {
        setErrors(result.fields);
        setStatus("idle");
        return;
      }

      if (!response.ok || !result?.ok) {
        throw new Error(result?.error ?? "Contact form request failed");
      }

      form.reset();
      setErrors({});
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="relative space-y-5">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="name"
          label="Name"
          placeholder="Your name"
          autoComplete="name"
          error={errors.name}
        />
        <Field
          id="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          error={errors.email}
        />
      </div>
      <Field
        id="subject"
        label="Subject"
        placeholder="Reason for getting in touch"
        error={errors.subject}
      />
      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-semibold text-ink">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          placeholder="Write your message here…"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="w-full resize-y rounded-sm border border-line bg-paper px-4 py-3 text-sm text-ink transition placeholder:text-ink-muted/60 hover:border-line-strong focus:border-accent focus:outline-none"
        />
        {errors.message ? (
          <p id="message-error" className="mt-2 text-xs text-red-700 dark:text-red-300">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[0.4rem] border border-ink bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition hover:-translate-y-0.5 hover:border-accent-strong hover:bg-accent-strong disabled:cursor-wait disabled:opacity-60"
        >
          {status === "submitting" ? (
            <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
          ) : (
            <Send aria-hidden="true" className="size-4" />
          )}
          {status === "submitting" ? "Sending..." : "Submit message"}
        </button>

        <div aria-live="polite" className="max-w-md text-sm leading-6">
          {status === "success" ? (
            <p className="text-emerald-700 dark:text-emerald-300">
              Message sent successfully. Thank you for reaching out.
            </p>
          ) : null}
          {status === "error" ? (
            <p className="text-red-700 dark:text-red-300">
              Unable to send your message right now. Please try again or contact
              me directly by email.
            </p>
          ) : null}
        </div>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  type = "text",
  placeholder,
  autoComplete,
  error,
}: {
  id: keyof ContactFields;
  label: string;
  type?: string;
  placeholder: string;
  autoComplete?: string;
  error?: string;
}) {
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-ink">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className="h-12 w-full rounded-sm border border-line bg-paper px-4 text-sm text-ink transition placeholder:text-ink-muted/60 hover:border-line-strong focus:border-accent focus:outline-none"
      />
      {error ? (
        <p id={errorId} className="mt-2 text-xs text-red-700 dark:text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}
