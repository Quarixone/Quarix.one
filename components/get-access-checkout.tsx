"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRef, useState } from "react";

import { RazorpayStandardCheckout } from "@/components/razorpay-standard-checkout";
import { Confetti, type ConfettiRef } from "@/components/ui/confetti";

type Template = {
  slug: string;
  name: string;
  description: string;
  price: string;
  priceLabel: string;
  amount: number;
  previewType: string;
  accent: string;
  downloadUrl: string;
};

type GetAccessCheckoutProps = {
  template: Template;
};

function formatPaise(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: amount % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount / 100);
}

function CheckoutTemplatePreview({
  type,
  accent,
}: {
  type: string;
  accent: string;
}) {
  if (type === "pricing") {
    return (
      <div className="grid h-full gap-2 p-3 sm:grid-cols-3">
        {["Solo", "Pro", "Custom"].map((plan, index) => (
          <div
            key={plan}
            className={`flex min-h-28 flex-col rounded-2xl border p-3 ${
              index === 2
                ? "border-violet-400/60 bg-violet-400/10"
                : "border-white/10 bg-white/[0.03]"
            }`}
          >
            <span className="text-[10px] text-zinc-500">{plan}</span>
            <strong className="mt-1 text-lg font-semibold text-white">
              {index === 2 ? "Custom" : index === 1 ? "$290" : "$99"}
            </strong>
            <span className="mt-4 h-1.5 rounded-full bg-white/15" />
            <span className="mt-2 h-1.5 w-2/3 rounded-full bg-white/10" />
            <span
              className={`mt-auto h-6 rounded-xl ${
                index === 2 ? "bg-violet-400" : "bg-white/10"
              }`}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden p-5">
      <div className="w-full max-w-xs text-center">
        <div className="mx-auto mb-3 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] text-zinc-400">
          Save time
        </div>
        <h3 className="text-2xl font-semibold tracking-[-0.06em] text-white sm:text-4xl">
          Stop writing
          <br />
          boilerplate.{" "}
          <span className="bg-gradient-to-r from-sky-300 to-blue-500 bg-clip-text text-transparent">
            Start building features.
          </span>
        </h3>
        <p className="mx-auto mt-3 max-w-56 text-[11px] leading-5 text-zinc-500">
          Launch polished developer pages faster with ready-made sections.
        </p>
      </div>
      <div
        className={`absolute -bottom-16 left-1/2 size-44 -translate-x-1/2 rounded-full bg-gradient-to-br ${accent} opacity-20 blur-3xl`}
      />
    </div>
  );
}

export function GetAccessCheckout({ template }: GetAccessCheckoutProps) {
  const confettiRef = useRef<ConfettiRef>(null);
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [promoMessage, setPromoMessage] = useState("");

  const discountAmount = isPromoApplied ? Math.round(template.amount * 0.1) : 0;
  const totalAmount = template.amount - discountAmount;
  const subtotalPrice = formatPaise(template.amount);
  const discountPrice = formatPaise(discountAmount);
  const totalPrice = formatPaise(totalAmount);

  function applyPromoCode() {
    if (promoCode.trim().toLowerCase() !== "quarix10") {
      setIsPromoApplied(false);
      setPromoMessage("Invalid promo code.");
      return;
    }

    setIsPromoApplied(true);
    setPromoMessage("Quarix10 applied. 10% discount added.");
    confettiRef.current?.fire({
      particleCount: 140,
      spread: 90,
      startVelocity: 36,
      origin: { x: 0.5, y: 0.38 },
      colors: ["#38bdf8", "#22c55e", "#facc15", "#ffffff"],
    });
  }

  return (
    <div className="relative mx-auto grid min-h-screen max-w-6xl overflow-x-hidden lg:grid-cols-2">
      <Confetti
        ref={confettiRef}
        manualstart
        className="pointer-events-none fixed inset-0 z-50 h-screen w-screen"
      />
      <section className="flex flex-col justify-between px-4 py-6 sm:px-10 sm:py-8 lg:px-14">
        <div>
          <Link
            href="/templates"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-zinc-950 dark:hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Back
          </Link>

          <div className="mt-10 sm:mt-12">
            <p className="text-sm text-zinc-500">Pay Quarix</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-[-0.06em] sm:text-5xl">
              {totalPrice}
              <span className="ml-2 text-base font-medium tracking-normal text-zinc-500">
                {template.priceLabel}
              </span>
            </h1>
          </div>

          <div className="mt-8 border-b border-zinc-200 pb-6 sm:mt-12 dark:border-white/10">
            <div className="overflow-hidden rounded-[1.5rem] border border-zinc-900/10 bg-[#07070a] shadow-xl shadow-black/10">
              <div className="relative min-h-48 sm:min-h-52">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
                <CheckoutTemplatePreview
                  type={template.previewType}
                  accent={template.accent}
                />
              </div>
            </div>

            <div className="mt-5 flex gap-3 sm:gap-4">
              <span className="relative grid size-12 shrink-0 place-items-center rounded-2xl bg-zinc-100 dark:bg-white/10">
                <Image
                  src="/quarix-logo-transparent.png"
                  alt="Quarix logo"
                  width={28}
                  height={28}
                  className="object-contain"
                  style={{ width: "auto", height: "auto" }}
                  loading="eager"
                />
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="text-sm font-semibold">{template.name}</h2>
                <p className="mt-1 max-w-sm text-xs leading-5 text-zinc-500">
                  {template.description}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-5 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-zinc-500">Subtotal</span>
              <span className="font-medium">{subtotalPrice}</span>
            </div>

            {showPromoInput ? (
              <div className="space-y-2">
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Promotion code
                </span>
                <div className="flex flex-col gap-2 min-[420px]:flex-row">
                  <input
                    value={promoCode}
                    onChange={(event) => {
                      setPromoCode(event.target.value);
                      setPromoMessage("");
                      setIsPromoApplied(false);
                    }}
                    placeholder="Enter promo code"
                    className="h-11 min-w-0 flex-1 rounded-xl border border-zinc-200 bg-white px-4 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 dark:border-white/10 dark:bg-black/40 dark:text-white dark:focus:border-white"
                  />
                  <button
                    type="button"
                    onClick={applyPromoCode}
                    className="h-11 rounded-xl bg-zinc-100 px-4 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
                  >
                    Apply
                  </button>
                </div>
                {promoMessage ? (
                  <p
                    className={`text-sm ${
                      isPromoApplied ? "text-emerald-600" : "text-red-500"
                    }`}
                  >
                    {promoMessage}
                  </p>
                ) : null}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowPromoInput(true)}
                className="rounded-lg bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
              >
                Add promotion code
              </button>
            )}

            {isPromoApplied ? (
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Discount</span>
                <span className="font-medium text-emerald-600">
                  -{discountPrice}
                </span>
              </div>
            ) : null}

            <div className="h-px bg-zinc-200 dark:bg-white/10" />
            <div className="flex items-center justify-between font-semibold">
              <span>Total due</span>
              <span>
                {totalPrice} {template.priceLabel}
              </span>
            </div>
          </div>
        </div>

        <p className="mt-12 max-w-md text-xs leading-5 text-zinc-400">
          Secure custom checkout page for Quarix template access.
        </p>
      </section>

      <section className="flex items-center justify-center px-4 py-8 sm:px-10 sm:py-10 lg:px-14">
        <RazorpayStandardCheckout
          templateSlug={template.slug}
          templateName={template.name}
          amount={totalAmount}
          currency="INR"
          receipt={`quarix_${template.slug}`}
        />
      </section>
    </div>
  );
}
