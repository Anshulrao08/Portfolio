import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { profile } from "@/data/profile";

const payloadSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(150),
  subject: z.string().trim().min(3).max(150),
  message: z.string().trim().min(10).max(3000),
  website: z.string().max(0).optional(), // honeypot
});

export async function POST(request: Request) {
  try {
    const json = (await request.json()) as unknown;
    const parsed = payloadSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Invalid form submission. Please check all required fields.",
        },
        { status: 400 }
      );
    }

    const { name, email, subject, message, website } = parsed.data;

    // Silently reject honeypot bots without sending mail
    if (website && website.length > 0) {
      return NextResponse.json({ ok: false, error: "Blocked submission." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          ok: false,
          mode: "unconfigured",
          error: "Email provider is not configured.",
        },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";
    const toEmail = process.env.CONTACT_TO_EMAIL || profile.email;

    const { error } = await resend.emails.send({
      from: `Portfolio Contact <${fromEmail}>`,
      to: [toEmail],
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `New message from ${name} (${email})\n\nSubject: ${subject}\n\n${message}`,
    });

    if (error) {
      return NextResponse.json(
        {
          ok: false,
          error: "Email provider returned an error. Please use direct email.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, mode: "resend" }, { status: 200 });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unable to process request." },
      { status: 500 }
    );
  }
}
