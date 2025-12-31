"use client";

import { useState } from "react";
import Link from "next/link";

const colors = {
    bg: "#0a0a0b",
    bgCard: "#131316",
    bgHover: "#1a1a1f",
    border: "rgba(255,255,255,0.08)",
    textPrimary: "#f5f5f7",
    textSecondary: "#9898a0",
    textDim: "#5c5c66",
    accent: "#10b981",
    purple: "#8b5cf6",
    usdt: "#26A17B",
};

// USDT Wallet Addresses - UPDATE THESE WITH YOUR ACTUAL ADDRESSES
const WALLET_ADDRESSES = {
    TRC20: "TYourTRC20WalletAddressHere",  // TRON Network
    ERC20: "0xYourERC20WalletAddressHere", // Ethereum Network
};

export default function CheckoutPage() {
    const [network, setNetwork] = useState<"TRC20" | "ERC20">("TRC20");
    const [copied, setCopied] = useState(false);

    const copyAddress = () => {
        navigator.clipboard.writeText(WALLET_ADDRESSES[network]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div style={{ minHeight: "100vh", background: colors.bg, fontFamily: "'Inter', -apple-system, sans-serif" }}>
            {/* Navbar */}
            <nav style={{ padding: "24px", display: "flex", justifyContent: "center", borderBottom: `1px solid ${colors.border}` }}>
                <Link href="/" style={{ textDecoration: "none" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ width: "8px", height: "8px", background: colors.accent, borderRadius: "50%", boxShadow: `0 0 12px ${colors.accent}` }} />
                        <span style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "0.1em", color: colors.textPrimary }}>CRYPTOLOGIC</span>
                    </div>
                </Link>
            </nav>

            {/* Content */}
            <div style={{ maxWidth: "600px", margin: "0 auto", padding: "60px 24px" }}>
                <div style={{ textAlign: "center", marginBottom: "40px" }}>
                    <h1 style={{ fontSize: "32px", fontWeight: 700, color: colors.textPrimary, marginBottom: "12px" }}>
                        Upgrade to Pro
                    </h1>
                    <p style={{ color: colors.textSecondary }}>Pay with USDT for instant activation</p>
                </div>

                {/* Price Card */}
                <div style={{ background: colors.bgCard, border: `1px solid ${colors.border}`, borderRadius: "16px", padding: "32px", marginBottom: "24px" }}>
                    <div style={{ textAlign: "center", marginBottom: "24px" }}>
                        <div style={{ fontSize: "48px", fontWeight: 800, color: colors.textPrimary }}>$14</div>
                        <div style={{ color: colors.textSecondary }}>per month</div>
                    </div>

                    {/* Network Selection */}
                    <div style={{ marginBottom: "24px" }}>
                        <label style={{ display: "block", fontSize: "12px", color: colors.textSecondary, marginBottom: "8px" }}>
                            Select Network
                        </label>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                            <button
                                onClick={() => setNetwork("TRC20")}
                                style={{
                                    padding: "12px",
                                    background: network === "TRC20" ? colors.usdt : colors.bg,
                                    border: `1px solid ${network === "TRC20" ? colors.usdt : colors.border}`,
                                    borderRadius: "8px",
                                    color: colors.textPrimary,
                                    fontWeight: 600,
                                    cursor: "pointer",
                                }}
                            >
                                TRC20 (TRON)
                                <div style={{ fontSize: "11px", fontWeight: 400, color: network === "TRC20" ? "#fff" : colors.textDim, marginTop: "4px" }}>
                                    Lower fees (~$1)
                                </div>
                            </button>
                            <button
                                onClick={() => setNetwork("ERC20")}
                                style={{
                                    padding: "12px",
                                    background: network === "ERC20" ? colors.usdt : colors.bg,
                                    border: `1px solid ${network === "ERC20" ? colors.usdt : colors.border}`,
                                    borderRadius: "8px",
                                    color: colors.textPrimary,
                                    fontWeight: 600,
                                    cursor: "pointer",
                                }}
                            >
                                ERC20 (ETH)
                                <div style={{ fontSize: "11px", fontWeight: 400, color: network === "ERC20" ? "#fff" : colors.textDim, marginTop: "4px" }}>
                                    Higher fees (~$5-20)
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Wallet Address */}
                    <div style={{ marginBottom: "24px" }}>
                        <label style={{ display: "block", fontSize: "12px", color: colors.textSecondary, marginBottom: "8px" }}>
                            Send exactly $14 USDT to:
                        </label>
                        <div style={{ display: "flex", gap: "8px" }}>
                            <input
                                type="text"
                                readOnly
                                value={WALLET_ADDRESSES[network]}
                                style={{
                                    flex: 1,
                                    padding: "12px",
                                    background: colors.bg,
                                    border: `1px solid ${colors.border}`,
                                    borderRadius: "8px",
                                    color: colors.textPrimary,
                                    fontSize: "12px",
                                    fontFamily: "monospace",
                                }}
                            />
                            <button
                                onClick={copyAddress}
                                style={{
                                    padding: "12px 20px",
                                    background: copied ? colors.accent : colors.usdt,
                                    border: "none",
                                    borderRadius: "8px",
                                    color: "#fff",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                }}
                            >
                                {copied ? "Copied!" : "Copy"}
                            </button>
                        </div>
                    </div>

                    {/* Amount */}
                    <div style={{ background: colors.bg, borderRadius: "12px", padding: "16px", marginBottom: "24px", textAlign: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="10" fill={colors.usdt} />
                                <path d="M12.5 6.5h-1v3h-3v1h3v5.5h1v-5.5h3v-1h-3v-3z" fill="white" />
                            </svg>
                            <span style={{ fontSize: "24px", fontWeight: 700, color: colors.textPrimary }}>14.00 USDT</span>
                        </div>
                    </div>

                    {/* Instructions */}
                    <div style={{ fontSize: "13px", color: colors.textSecondary, lineHeight: 1.7 }}>
                        <p style={{ marginBottom: "12px" }}>
                            <strong style={{ color: colors.textPrimary }}>Instructions:</strong>
                        </p>
                        <ol style={{ paddingLeft: "20px", margin: 0 }}>
                            <li>Copy the wallet address above</li>
                            <li>Send exactly <strong style={{ color: colors.usdt }}>14 USDT</strong> using {network} network</li>
                            <li>After payment, send screenshot to our Telegram</li>
                            <li>Your account will be upgraded within 1-12 hours</li>
                        </ol>
                    </div>
                </div>

                {/* Contact */}
                <div style={{ background: colors.bgCard, border: `1px solid ${colors.border}`, borderRadius: "16px", padding: "24px", textAlign: "center" }}>
                    <p style={{ color: colors.textSecondary, fontSize: "14px", marginBottom: "16px" }}>
                        After payment, confirm via Telegram:
                    </p>
                    <a
                        href="https://t.me/cryptologic_support"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "12px 24px",
                            background: "#0088cc",
                            borderRadius: "8px",
                            color: "#fff",
                            textDecoration: "none",
                            fontWeight: 600,
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                        </svg>
                        @cryptologic_support
                    </a>
                </div>

                {/* Warning */}
                <div style={{ marginTop: "24px", padding: "16px", background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: "12px" }}>
                    <p style={{ fontSize: "12px", color: "#f59e0b", margin: 0 }}>
                        ⚠️ <strong>Important:</strong> Make sure to use the correct network ({network}). Sending to wrong network will result in loss of funds.
                    </p>
                </div>

                {/* Back Link */}
                <div style={{ textAlign: "center", marginTop: "32px" }}>
                    <Link href="/" style={{ color: colors.textSecondary, fontSize: "14px", textDecoration: "none" }}>
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
