"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Founder photo. public/founder.jpg is a square headshot crop of
 * public/founder.jpeg, so it needs no object-position nudging.
 * Falls back to the drawn placeholder if the file ever goes missing.
 */
export function FounderAvatar({ size = 32 }: { size?: number }) {
  const [missing, setMissing] = useState(false);

  return (
    <div
      style={{ width: size, height: size }}
      className="relative shrink-0 overflow-hidden rounded-full bg-gradient-to-b from-[#cfe0f0] to-[#9db4cc]"
    >
      {missing ? (
        <svg width={size} height={size} viewBox="0 0 44 44" fill="none" aria-hidden="true">
          <circle cx="22" cy="17" r="7.6" fill="rgba(255,255,255,0.78)" />
          <path
            d="M5.5 46c0-9.4 7.4-15.4 16.5-15.4S38.5 36.6 38.5 46Z"
            fill="rgba(255,255,255,0.78)"
          />
        </svg>
      ) : (
        <Image
          src="/founder.jpg"
          alt="Gokulakrishnan"
          fill
          sizes="64px"
          onError={() => setMissing(true)}
          className="object-cover"
        />
      )}
    </div>
  );
}
