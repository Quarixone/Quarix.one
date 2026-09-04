import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Quarix — design and AI engineering studio";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          background: "#0A0A0A",
          color: "#FAFAFA",
        }}
      >
        <svg width="96" height="96" viewBox="0 0 100 100" fill="#FAFAFA">
          <path d="M50 88 A38 38 0 1 1 88 50 L70 50 A20 20 0 1 0 50 70 Z" />
          <path d="M95 57 A38 38 0 0 1 57 95 L57 77 A20 20 0 0 0 77 57 Z" />
        </svg>
        <div style={{ marginTop: 44, fontSize: 62, letterSpacing: "-0.03em" }}>
          We design and build digital products
        </div>
        <div style={{ marginTop: 20, fontSize: 30, color: "#8E8E88" }}>
          Quarix — design and AI engineering studio
        </div>
      </div>
    ),
    size,
  );
}
