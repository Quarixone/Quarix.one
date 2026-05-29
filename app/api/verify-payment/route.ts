import crypto from "node:crypto";
import { NextResponse } from "next/server";

import {
  EmailConfigurationError,
  escapeHtml,
  formatPaise,
  isValidEmail,
  sendEmail,
} from "@/lib/email";

type VerifyPaymentPayload = {
  razorpay_order_id?: unknown;
  razorpay_payment_id?: unknown;
  razorpay_signature?: unknown;
  customerEmail?: unknown;
  templateName?: unknown;
  templateSlug?: unknown;
  amount?: unknown;
  currency?: unknown;
};

function getString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function getAmount(value: unknown) {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string") {
    return Number(value);
  }

  return Number.NaN;
}

function signaturesMatch(generatedSignature: string, signature: string) {
  const generatedBuffer = Buffer.from(generatedSignature, "hex");
  const signatureBuffer = Buffer.from(signature, "hex");

  if (generatedBuffer.length !== signatureBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(generatedBuffer, signatureBuffer);
}

export async function POST(request: Request) {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keySecret) {
    return NextResponse.json(
      { message: "Razorpay secret is not configured." },
      { status: 500 },
    );
  }

  let payload: VerifyPaymentPayload;

  try {
    payload = (await request.json()) as VerifyPaymentPayload;
  } catch {
    return NextResponse.json(
      { message: "Invalid request payload." },
      { status: 400 },
    );
  }

  const orderId = getString(payload.razorpay_order_id);
  const paymentId = getString(payload.razorpay_payment_id);
  const signature = getString(payload.razorpay_signature);
  const customerEmail = getString(payload.customerEmail);
  const templateName = getString(payload.templateName) || "Quarix Template";
  const templateSlug = getString(payload.templateSlug);
  const amount = getAmount(payload.amount);
  const currency = getString(payload.currency) || "INR";

  if (!orderId || !paymentId || !signature) {
    return NextResponse.json(
      { message: "Missing Razorpay payment verification fields." },
      { status: 400 },
    );
  }

  const generatedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  if (!signaturesMatch(generatedSignature, signature)) {
    return NextResponse.json(
      { message: "Payment signature verification failed." },
      { status: 400 },
    );
  }

  let receiptSent = false;
  let receiptMessage = "Payment verified successfully.";

  if (customerEmail && isValidEmail(customerEmail)) {
    const accessUrl = templateSlug
      ? new URL(`/thank-you/${templateSlug}`, request.url).toString()
      : new URL("/templates", request.url).toString();
    const amountLabel = Number.isFinite(amount)
      ? `${formatPaise(amount)} ${currency}`
      : currency;

    try {
      await sendEmail({
        to: customerEmail,
        subject: `Your Quarix receipt - ${templateName}`,
        html: `
          <div style="margin:0;background:#f6f7f9;padding:32px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;color:#111827;">
            <div style="margin:0 auto;max-width:560px;border-radius:28px;background:#ffffff;padding:32px;box-shadow:0 18px 60px rgba(15,23,42,0.08);">
              <p style="margin:0 0 12px;color:#0284c7;font-size:12px;font-weight:700;letter-spacing:0.24em;text-transform:uppercase;">Payment receipt</p>
              <h1 style="margin:0;font-size:28px;line-height:1.1;letter-spacing:-0.04em;">Thank you for your purchase.</h1>
              <p style="margin:16px 0 0;color:#4b5563;font-size:14px;line-height:1.7;">
                Your payment for <strong>${escapeHtml(templateName)}</strong> has been verified successfully.
              </p>

              <div style="margin:24px 0;border-radius:20px;border:1px solid #e5e7eb;padding:18px;">
                <p style="margin:0 0 10px;color:#6b7280;font-size:13px;">Template</p>
                <p style="margin:0;font-size:18px;font-weight:700;">${escapeHtml(templateName)}</p>
                <div style="margin-top:16px;border-top:1px solid #e5e7eb;padding-top:16px;">
                  <p style="margin:0;color:#6b7280;font-size:13px;">Amount paid</p>
                  <p style="margin:6px 0 0;font-size:22px;font-weight:800;">${escapeHtml(amountLabel)}</p>
                </div>
                <div style="margin-top:16px;border-top:1px solid #e5e7eb;padding-top:16px;">
                  <p style="margin:0;color:#6b7280;font-size:13px;">Payment ID</p>
                  <p style="margin:6px 0 0;font-size:13px;color:#374151;">${escapeHtml(paymentId)}</p>
                </div>
              </div>

              <a href="${accessUrl}" style="display:block;border-radius:16px;background:#111827;padding:14px 18px;text-align:center;color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;">
                Open template download
              </a>

              <p style="margin:20px 0 0;color:#6b7280;font-size:12px;line-height:1.6;">
                If the button does not work, copy and paste this link into your browser:<br />
                <a href="${accessUrl}" style="color:#0284c7;">${accessUrl}</a>
              </p>
            </div>
          </div>
        `,
      });
      receiptSent = true;
      receiptMessage = "Payment verified successfully. Receipt email sent.";
    } catch (error) {
      receiptMessage =
        error instanceof EmailConfigurationError
          ? "Payment verified. Receipt email is not configured."
          : "Payment verified. Receipt email could not be sent.";
    }
  }

  return NextResponse.json({
    success: true,
    receiptSent,
    message: receiptMessage,
  });
}
