import { ImageResponse } from "next/og";
import { portfolioData } from "@/data/portfolio";

export const alt = `${portfolioData.profile.name} — Academic and professional portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#f7f7f4",
          color: "#10243e",
          padding: "68px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: "2px solid #d8dde2",
            padding: "52px",
            backgroundImage:
              "linear-gradient(to right, transparent 68%, #e8f0f5 68%)",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 20,
              letterSpacing: "0.18em",
              color: "#1c5c86",
              fontWeight: 700,
            }}
          >
            {portfolioData.profile.eyebrow}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 82,
                letterSpacing: "-0.06em",
                fontWeight: 700,
              }}
            >
              {portfolioData.profile.name}
            </div>
            <div
              style={{
                display: "flex",
                maxWidth: 760,
                marginTop: 18,
                fontSize: 27,
                lineHeight: 1.4,
                color: "#526274",
              }}
            >
              Technology × Business × Data · Master&apos;s focus in Germany
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 19,
              color: "#a67b42",
              fontWeight: 700,
            }}
          >
            ACADEMIC &amp; PROFESSIONAL PORTFOLIO
          </div>
        </div>
      </div>
    ),
    size,
  );
}
