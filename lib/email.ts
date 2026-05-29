import { Resend } from "resend";

let resend: Resend | null = null;

export class EmailConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EmailConfigurationError";
  }
}

type SendEmailInput = {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
};

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new EmailConfigurationError(
      "Email is not configured. Add RESEND_API_KEY to your environment.",
    );
  }

  resend ??= new Resend(apiKey);
  return resend;
}

export function getFromEmail() {
  return process.env.RESEND_FROM_EMAIL ?? "Quarix <onboarding@resend.dev>";
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function formatPaise(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: amount % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount / 100);
}

export async function sendEmail({
  to,
  subject,
  html,
  replyTo,
}: SendEmailInput) {
  const response = await getResendClient().emails.send({
    from: getFromEmail(),
    to,
    subject,
    html,
    ...(replyTo ? { replyTo } : {}),
  });

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data;
}
