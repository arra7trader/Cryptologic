"use client";

import { colors } from "@/lib/constants";

export default function Footer() {
    return (
        <footer
            style={{
                padding: "40px 24px",
                borderTop: `1px solid ${colors.border}`,
                textAlign: "center",
            }}
        >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "16px" }}>
                <div
                    style={{
                        width: "6px",
                        height: "6px",
                        background: colors.accent,
                        borderRadius: "50%",
                    }}
                />
                <span style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.1em", color: colors.textSecondary }}>
                    CRYPTOLOGIC
                </span>
            </div>
            <p style={{ fontSize: "12px", color: colors.textDim }}>
                © 2024 Cryptologic. Nansen-Level Analytics at Startup-Friendly Prices.
            </p>
            <p style={{ fontSize: "11px", color: colors.textDim, marginTop: "8px" }}>
                Disclaimer: This is not financial advice. Trade at your own risk.
            </p>
        </footer>
    );
}
