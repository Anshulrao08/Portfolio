"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertCircle, CheckCircle2, Loader2, Mail, Send } from "lucide-react";
import { profile } from "@/data/profile";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name (at least 2 characters).").max(100),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(3, "Please provide a brief subject.").max(150),
  message: z
    .string()
    .min(10, "Please share a little more detail (at least 10 characters).")
    .max(3000),
  website: z.string().max(0).optional(), // honeypot
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [status, setStatus] = useState<{
    kind: "idle" | "sent" | "fallback" | "error";
    message?: string;
    mailtoHref?: string;
  }>({ kind: "idle" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      website: "",
    },
  });

  const buildMailto = (values: ContactFormValues) => {
    const subject = encodeURIComponent(`[Portfolio] ${values.subject}`);
    const body = encodeURIComponent(
      `Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`
    );
    return `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  const onSubmit = async (values: ContactFormValues) => {
    setStatus({ kind: "idle" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        mode?: "resend" | "unconfigured";
        error?: string;
      };

      if (res.ok && data.ok && data.mode === "resend") {
        setStatus({
          kind: "sent",
          message:
            "Your message has been delivered to Anshul Yadav. Thank you for reaching out.",
        });
        reset();
        return;
      }

      if (data.mode === "unconfigured") {
        setStatus({
          kind: "fallback",
          message:
            "Automated email delivery is not configured on this deployment yet. Your message has NOT been sent automatically—please use the direct email link below to send it via your mail client.",
          mailtoHref: buildMailto(values),
        });
        return;
      }

      setStatus({
        kind: "error",
        message:
          data.error ||
          "Could not send message right now. You can reach out directly via email.",
        mailtoHref: buildMailto(values),
      });
    } catch {
      setStatus({
        kind: "error",
        message:
          "Network error while submitting the form. Please use the direct email link instead.",
        mailtoHref: buildMailto(values),
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="border border-border bg-bg-secondary/40 p-6 sm:p-8 space-y-5"
    >
      {/* Honeypot field for spam protection */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label
            htmlFor="contact-name"
            className="block font-mono text-xs uppercase tracking-wider text-text"
          >
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            placeholder="Your full name"
            {...register("name")}
            aria-invalid={Boolean(errors.name)}
            className="w-full border border-border bg-bg px-3.5 py-2.5 text-sm text-text placeholder:text-text-secondary focus:border-accent focus:outline-none"
          />
          {errors.name && (
            <p className="text-xs text-red-400">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="contact-email"
            className="block font-mono text-xs uppercase tracking-wider text-text"
          >
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            aria-invalid={Boolean(errors.email)}
            className="w-full border border-border bg-bg px-3.5 py-2.5 text-sm text-text placeholder:text-text-secondary focus:border-accent focus:outline-none"
          />
          {errors.email && (
            <p className="text-xs text-red-400">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="contact-subject"
          className="block font-mono text-xs uppercase tracking-wider text-text"
        >
          Subject
        </label>
        <input
          id="contact-subject"
          type="text"
          placeholder="Collaboration, hiring inquiry, speaking, or project discussion"
          {...register("subject")}
          aria-invalid={Boolean(errors.subject)}
          className="w-full border border-border bg-bg px-3.5 py-2.5 text-sm text-text placeholder:text-text-secondary focus:border-accent focus:outline-none"
        />
        {errors.subject && (
          <p className="text-xs text-red-400">{errors.subject.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="contact-message"
          className="block font-mono text-xs uppercase tracking-wider text-text"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          rows={5}
          placeholder="Share details about your opportunity, project, or initiative..."
          {...register("message")}
          aria-invalid={Boolean(errors.message)}
          className="w-full border border-border bg-bg px-3.5 py-2.5 text-sm text-text placeholder:text-text-secondary focus:border-accent focus:outline-none resize-y"
        />
        {errors.message && (
          <p className="text-xs text-red-400">{errors.message.message}</p>
        )}
      </div>

      {status.kind === "sent" && (
        <div
          role="status"
          className="flex items-start gap-2.5 border border-accent bg-bg p-3.5 text-sm text-text"
        >
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <p>{status.message}</p>
        </div>
      )}

      {(status.kind === "fallback" || status.kind === "error") && (
        <div
          role="alert"
          className="space-y-3 border border-border-strong bg-bg p-4 text-sm text-text"
        >
          <div className="flex items-start gap-2.5">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <p className="text-text-secondary">{status.message}</p>
          </div>
          {status.mailtoHref && (
            <a
              href={status.mailtoHref}
              className="inline-flex items-center gap-2 border border-accent bg-accent px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-accent-ink"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Send via Email Client ({profile.email})</span>
            </a>
          )}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 border border-text bg-text px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-bg hover:border-accent hover:bg-accent hover:text-accent-ink disabled:opacity-60 transition-colors"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send className="h-3.5 w-3.5" />
              <span>Send Message</span>
            </>
          )}
        </button>

        <a
          href={`mailto:${profile.email}`}
          className="font-mono text-xs text-text-secondary underline underline-offset-4 hover:text-text"
        >
          Or email directly: {profile.email}
        </a>
      </div>
    </form>
  );
}
