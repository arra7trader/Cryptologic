"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

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
    bsc: "#F0B90B",
};

// USDT Wallet Address - BEP20 (BSC)
const WALLET_ADDRESS = "0x84a06ffc26031b782c893252a769bd14b6ca8ad0";

export default function CheckoutPage() {
    const { t } = useLanguage();
    const [copied, setCopied] = useState(false);

    const monthText = t("checkout.month");
    const sendText = t("checkout.send");
    const toAddressText = t("checkout.to_address");
    const copiedText = t("checkout.copied");
    const copyText = t("checkout.copy");

    const copyAddress = () => {
        navigator.clipboard.writeText(WALLET_ADDRESS);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div style={{ minHeight: "100vh", background: colors.bg, fontFamily: "'Inter', -apple-system, sans-serif" }}>
            {/* Navbar */}
            <nav style={{ padding: "24px", display: "flex", justifyContent: "center", alignItems: "center", gap: "20px", borderBottom: `1px solid ${colors.border}` }}>
                <Link href="/" style={{ textDecoration: "none" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ width: "8px", height: "8px", background: colors.accent, borderRadius: "50%", boxShadow: `0 0 12px ${colors.accent}` }} />
                        <span style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "0.1em", color: colors.textPrimary }}>CRYPTOLOGIC</span>
                    </div>
                </Link>
                <LanguageSwitcher />
            </nav>

            {/* Content */}
            <div style={{ maxWidth: "600px", margin: "0 auto", padding: "60px 24px" }}>
                <div style={{ textAlign: "center", marginBottom: "40px" }}>
                    <h1 style={{ fontSize: "32px", fontWeight: 700, color: colors.textPrimary, marginBottom: "12px" }}>
                        {t("checkout.title")}
                    </h1>
                    <p style={{ color: colors.textSecondary }}>{t("checkout.subtitle")}</p>
                </div>

                {/* Price Card */}
                <div style={{ background: colors.bgCard, border: `1px solid ${colors.border}`, borderRadius: "16px", padding: "32px", marginBottom: "24px" }}>
                    <div style={{ textAlign: "center", marginBottom: "24px" }}>
                        <div style={{ fontSize: "48px", fontWeight: 800, color: colors.textPrimary }}>$14</div>
                        <div style={{ color: colors.textSecondary }}>
                            {monthText}
                        </div>
                    </div>

                    {/* Network Badge */}
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "10px 20px", background: `${colors.bsc}15`, border: `1px solid ${colors.bsc}40`, borderRadius: "100px" }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill={colors.bsc}>
                                <path d="M12 2L6 5.5V10L12 6.5L18 10V5.5L12 2ZM6 14.5L12 18L18 14.5V10L12 13.5L6 10V14.5ZM12 22L6 18.5V14L12 17.5L18 14V18.5L12 22Z" />
                            </svg>
                            <span style={{ fontWeight: 600, color: colors.bsc }}>BEP20 (BSC Network)</span>
                        </div>
                    </div>

                    {/* Wallet Address */}
                    <div style={{ marginBottom: "24px" }}>
                        <label style={{ display: "block", fontSize: "12px", color: colors.textSecondary, marginBottom: "8px" }}>
                            <span>{sendText}</span>{" "}
                            <strong style={{ color: colors.usdt }}>14 USDT</strong>{" "}
                            <span>{toAddressText}:</span>
                        </label>
                        <div style={{ display: "flex", gap: "8px" }}>
                            <input
                                type="text"
                                readOnly
                                value={WALLET_ADDRESS}
                                style={{
                                    flex: 1,
                                    padding: "14px",
                                    background: colors.bg,
                                    border: `1px solid ${colors.border}`,
                                    borderRadius: "8px",
                                    color: colors.textPrimary,
                                    fontSize: "11px",
                                    fontFamily: "monospace",
                                }}
                            />
                            <button
                                onClick={copyAddress}
                                style={{
                                    padding: "14px 24px",
                                    background: copied ? colors.accent : colors.bsc,
                                    border: "none",
                                    borderRadius: "8px",
                                    color: copied ? "#000" : "#000",
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                }}
                            >
                                {copied ? copiedText : copyText}
                            </button>
                        </div>
                    </div>

                    {/* Instructions */}
                    <div style={{ background: colors.bgHover, borderRadius: "12px", padding: "16px", marginBottom: "24px" }}>
                        <div style={{ fontSize: "13px", fontWeight: 600, color: colors.textPrimary, marginBottom: "12px" }}>
                            {t("checkout.instructions")}
                        </div>
                        <ol style={{ margin: 0, paddingLeft: "20px", color: colors.textSecondary, fontSize: "13px", lineHeight: 1.6 }}>
                            <li>{t("checkout.step1")}</li>
                            <li>{t("checkout.step2")}</li>
                            <li>{t("checkout.step3")}</li>
                        </ol>
                    </div>

                    <a
                        href="https://t.me/arra7trader"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                            width: "100%",
                            padding: "16px",
                            background: colors.usdt,
                            color: "#fff",
                            border: "none",
                            borderRadius: "12px",
                            fontSize: "15px",
                            fontWeight: 600,
                            cursor: "pointer",
                            textDecoration: "none",
                            transition: "all 0.2s",
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-8.609 3.33c-2.068.8-4.133 1.598-5.724 2.21a405.15 405.15 0 0 1-2.849 1.09c-.42.147-.99.332-1.473.901-.728.968.193 1.798.919 2.286 1.61.516 3.275 1.009 3.816 1.177l.176.055c.289.09.577.161.864.218.47.093.842.203 1.129.637l.42 1.55c.08.303.16.607.245.908.19.673.385 1.36.634 1.956.326.78.868 1.488 1.642 1.733.923.292 1.71-.161 2.296-.688.58-.52 1.15-1.047 1.72-1.579a.747.747 0 0 0 .093-.1c.36-.312.723-.623 1.085-.935.597.545 1.203 1.08 1.83 1.597.356.294.72.576 1.11.815.753.46 1.636.568 2.46.22 1.17-.492 1.69-1.635 1.967-2.73 1.129-4.5 2.295-8.995 3.39-13.493.07-.282.128-.567.168-.853a2.212 2.212 0 0 0-.49-1.844 2.19 2.19 0 0 0-1.397-.534Z" />
                        </svg>
                        {t("checkout.confirm_btn")}
                    </a>
                </div>

                <div style={{ textAlign: "center" }}>
                    <Link href="/" style={{ color: colors.textDim, fontSize: "14px", textDecoration: "none" }}>
                        {t("checkout.back")}
                    </Link>
                </div>
            </div>
        </div>
    );
}
