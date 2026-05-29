import { NextResponse } from "next/server";

import {
  EmailConfigurationError,
  escapeHtml,
  isValidEmail,
  sendEmail,
} from "@/lib/email";

type ContactPayload = {
  serviceSlug?: unknown;
  serviceTitle?: unknown;
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  budget?: unknown;
  message?: unknown;
};

function getString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const contactEmail = process.env.CONTACT_EMAIL;

  if (!contactEmail) {
    return NextResponse.json(
      {
        message:
          "Email is not configured. Add CONTACT_EMAIL to your environment.",
      },
      { status: 500 },
    );
  }

  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { message: "Invalid request. Please try again." },
      { status: 400 },
    );
  }

  const serviceTitle = getString(payload.serviceTitle);
  const serviceSlug = getString(payload.serviceSlug);
  const name = getString(payload.name);
  const email = getString(payload.email);
  const phone = getString(payload.phone);
  const budget = getString(payload.budget);
  const message = getString(payload.message);

  if (!serviceTitle || !serviceSlug || !name || !email || !message) {
    return NextResponse.json(
      { message: "Please fill in all required fields." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { message: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const safeServiceTitle = escapeHtml(serviceTitle);
  const safeServiceSlug = escapeHtml(serviceSlug);
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone || "Not provided");
  const safeBudget = escapeHtml(budget || "Not selected");
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

  try {
    await sendEmail({
      to: [contactEmail],
      replyTo: email,
      subject: `New Quarix inquiry - ${serviceTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
          <h2>New Quarix inquiry</h2>
          <p><strong>Service:</strong> ${safeServiceTitle}</p>
          <p><strong>Service slug:</strong> ${safeServiceSlug}</p>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Phone:</strong> ${safePhone}</p>
          <p><strong>Budget:</strong> ${safeBudget}</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
          <p><strong>Project details:</strong></p>
          <p>${safeMessage}</p>
        </div>
      `,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown email error.";

    if (error instanceof EmailConfigurationError) {
      return NextResponse.json(
        {
          message:
            "Resend is not configured. Add RESEND_API_KEY and RESEND_FROM_EMAIL to your environment.",
        },
        { status: 500 },
      );
    }

    console.error("Resend contact email failed:", errorMessage);

    return NextResponse.json(
      {
        message:
          process.env.NODE_ENV === "development"
            ? errorMessage
            : "Email could not be sent. Please try again later.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    message: "Your request has been sent. I will contact you soon.",
  });
}
