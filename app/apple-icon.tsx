import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Apple touch icons must be raster, so the mark is rendered at build time.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A0A0A",
        }}
      >
        <svg width="126" height="126" viewBox="0 0 100 100" fill="#FFFFFF">
          <path d="M50 88 A38 38 0 1 1 88 50 L66 50 A16 16 0 1 0 50 66 Z" />
          <path d="M98 60 A38 38 0 0 1 60 98 L60 76 A16 16 0 0 0 76 60 Z" />
        </svg>
      </div>
    ),
    size,
  );
}
