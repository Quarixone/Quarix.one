import { NextResponse } from "next/server";
import Razorpay from "razorpay";

type CreateOrderPayload = {
  amount?: unknown;
  currency?: unknown;
  receipt?: unknown;
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

function getRazorpayClient() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return null;
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });
}

function isAuthFailure(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "statusCode" in error &&
    (error as { statusCode?: unknown }).statusCode === 401
  );
}

export async function POST(request: Request) {
  const razorpay = getRazorpayClient();

  if (!razorpay) {
    return NextResponse.json(
      { message: "Razorpay credentials are not configured." },
      { status: 500 },
    );
  }

  let payload: CreateOrderPayload;

  try {
    payload = (await request.json()) as CreateOrderPayload;
  } catch {
    return NextResponse.json(
      { message: "Invalid request payload." },
      { status: 400 },
    );
  }

  const amount = getAmount(payload.amount);
  const currency = getString(payload.currency) || "INR";
  const receipt = getString(payload.receipt) || `receipt_${Date.now()}`;

  if (!Number.isInteger(amount) || amount < 100) {
    return NextResponse.json(
      { message: "Amount must be at least 100 paise." },
      { status: 400 },
    );
  }

  try {
    const order = await razorpay.orders.create({
      amount,
      currency,
      receipt,
    });

    return NextResponse.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    if (isAuthFailure(error)) {
      return NextResponse.json(
        { message: "Razorpay authentication failed." },
        { status: 401 },
      );
    }

    return NextResponse.json(
      { message: "Unable to create Razorpay order." },
      { status: 500 },
    );
  }
}
