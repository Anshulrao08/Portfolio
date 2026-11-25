import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#101010",
          color: "#F4F2ED",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "3px solid #292929",
          fontFamily: "sans-serif",
          fontWeight: 700,
          fontSize: 28,
          letterSpacing: "-0.04em",
        }}
      >
        <span>A</span>
        <span style={{ color: "#C6F432" }}>Y</span>
      </div>
    ),
    { ...size }
  );
}
