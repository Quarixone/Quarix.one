"use client";

import Script from "next/script";
import { CreditCard, ShieldCheck } from "lucide-react";
import { useCallback, useRef, useState } from "react";

type CheckoutStatus = "idle" | "loading" | "success" | "error";

type RazorpayStandardCheckoutProps = {
  templateSlug: string;
  templateName: string;
  amount: number;
  currency: string;
  receipt: string;
};

type CreateOrderResponse = {
  order_id?: string;
  amount?: number;
  currency?: string;
  message?: string;
};

type VerifyPaymentResponse = {
  success?: boolean;
  receiptSent?: boolean;
  message?: string;
};

type RazorpaySuccessResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

type RazorpayFailedResponse = {
  error?: {
    description?: string;
    reason?: string;
  };
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpaySuccessResponse) => void;
  prefill?: {
    email?: string;
  };
  modal: {
    ondismiss: () => void;
  };
  theme: {
    color: string;
  };
};

type RazorpayInstance = {
  open: () => void;
  on: (
    event: "payment.failed",
    callback: (response: RazorpayFailedResponse) => void,
  ) => void;
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

function formatPaise(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: amount % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount / 100);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function RazorpayStandardCheckout({
  templateSlug,
  templateName,
  amount,
  currency,
  receipt,
}: RazorpayStandardCheckoutProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<CheckoutStatus>("idle");
  const [message, setMessage] = useState("");
  const shouldOpenWhenReadyRef = useRef(false);
  const displayPrice = `${formatPaise(amount)} ${currency}`;

  const verifyPayment = useCallback(async (response: RazorpaySuccessResponse) => {
    const verifyResponse = await fetch("/api/verify-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...response,
        customerEmail: email.trim(),
        templateName,
        templateSlug,
        amount,
        currency,
      }),
    });

    const result = (await verifyResponse.json()) as VerifyPaymentResponse;

    if (!verifyResponse.ok || !result.success) {
      setStatus("error");
      setMessage(result.message ?? "Payment verification failed.");
      return;
    }

    setStatus("success");
    setMessage("Payment verified successfully. Opening your template access page...");

    window.setTimeout(() => {
      window.location.assign(`/thank-you/${templateSlug}`);
    }, 650);
  }, [amount, currency, email, templateName, templateSlug]);

  const openCheckout = useCallback(async () => {
    const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const customerEmail = email.trim();

    if (!isValidEmail(customerEmail)) {
      setStatus("error");
      setMessage("Please enter a valid email address for your receipt.");
      return;
    }

    if (!key) {
      setStatus("error");
      setMessage("Razorpay public key is not configured.");
      return;
    }

    if (!window.Razorpay) {
      shouldOpenWhenReadyRef.current = true;
      setStatus("loading");
      setMessage("Loading secure checkout...");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const orderResponse = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          currency,
          receipt,
        }),
      });

      const order = (await orderResponse.json()) as CreateOrderResponse;

      if (!orderResponse.ok || !order.order_id || !order.amount || !order.currency) {
        setStatus("error");
        setMessage(order.message ?? "Unable to create payment order.");
        return;
      }

      const razorpay = new window.Razorpay({
        key,
        amount: order.amount,
        currency: order.currency,
        name: "Quarix",
        description: templateName,
        order_id: order.order_id,
        prefill: {
          email: customerEmail,
        },
        handler: (paymentResponse) => {
          void verifyPayment(paymentResponse);
        },
        modal: {
          ondismiss: () => {
            setStatus("idle");
            setMessage("Payment cancelled. You can try again anytime.");
          },
        },
        theme: {
          color: "#111111",
        },
      });

      razorpay.on("payment.failed", (failureResponse) => {
        setStatus("error");
        setMessage(
          failureResponse.error?.description ??
            failureResponse.error?.reason ??
            "Payment failed. Please try again.",
        );
      });

      razorpay.open();
    } catch {
      setStatus("error");
      setMessage("Something went wrong while starting checkout.");
    }
  }, [amount, currency, email, receipt, templateName, verifyPayment]);

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (shouldOpenWhenReadyRef.current) {
            shouldOpenWhenReadyRef.current = false;
            void openCheckout();
          }
        }}
        onError={() => {
          setStatus("error");
          setMessage("Unable to load Razorpay checkout.");
        }}
      />

      <div className="w-full max-w-md">
        <h2 className="text-lg font-semibold tracking-[-0.03em]">
          Contact information
        </h2>
        <label className="mt-5 block space-y-2">
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="h-12 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 dark:border-white/10 dark:bg-black/40 dark:text-white dark:focus:border-white"
          />
        </label>

        <h3 className="mt-8 text-lg font-semibold tracking-[-0.03em]">
          Payment method
        </h3>
        <div className="mt-4 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.04]">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-zinc-100 dark:bg-white/10">
              <CreditCard className="size-4 text-zinc-700 dark:text-zinc-200" />
            </span>
            <div>
              <p className="text-sm font-semibold text-zinc-950 dark:text-white">
                Razorpay Standard Checkout
              </p>
              <p className="text-xs text-zinc-500">
                UPI, cards, wallets, netbanking, EMI and pay later.
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-start gap-2 rounded-xl bg-zinc-50 p-3 text-xs leading-5 text-zinc-500 dark:bg-white/5 dark:text-zinc-400">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-emerald-500" />
            Your order is created on the server and verified after payment.
          </div>

        </div>

        <button
          type="button"
          onClick={openCheckout}
          disabled={status === "loading"}
          className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-xl bg-black px-5 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
        >
          {status === "loading" ? "Opening checkout..." : `Pay ${displayPrice}`}
        </button>

        {message ? (
          <p
            className={`mt-4 text-center text-sm ${
              status === "success" ? "text-emerald-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        ) : null}

        <div className="mt-5 flex justify-center gap-4 text-xs text-zinc-400">
          <span>Powered by Razorpay</span>
          <span>Terms</span>
          <span>Privacy</span>
        </div>
      </div>
    </>
  );
}
