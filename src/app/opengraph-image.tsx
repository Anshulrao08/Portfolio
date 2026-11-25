import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#101010",
          color: "#F4F2ED",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          border: "1px solid #292929",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: "0.08em",
            }}
          >
            <span
              style={{
                border: "2px solid #F4F2ED",
                padding: "8px 14px",
              }}
            >
              AY
            </span>
            <span style={{ color: "#A3A3A3", fontSize: 18 }}>
              BAGHPAT, UTTAR PRADESH, INDIA
            </span>
          </div>
          <div style={{ color: "#C6F432", fontSize: 18, letterSpacing: "0.1em" }}>
            PORTFOLIO
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 78, fontWeight: 700, letterSpacing: "-0.03em" }}>
            Anshul Yadav
          </div>
          <div style={{ fontSize: 30, color: "#C6F432", fontWeight: 600 }}>
            I Develop. I Innovate. I Lead.
          </div>
          <div style={{ fontSize: 22, color: "#A3A3A3" }}>
            MCA Student · Aspiring Web Developer · President, FOSS Club · Founder, TechSpace
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #292929",
            paddingTop: 24,
            fontSize: 18,
            color: "#A3A3A3",
          }}
        >
          <span>S.A.R.A. · Pursuit · Jaarvis</span>
          <span>Building Technology. Connecting People. Creating Impact.</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
