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

                    {/* Confirmation Template */}
                    <div style={{ background: colors.bg, borderRadius: "12px", padding: "16px", marginBottom: "24px", border: `1px solid ${colors.border}` }}>
                        <div style={{ fontSize: "13px", fontWeight: 600, color: colors.textPrimary, marginBottom: "12px" }}>
                            {t("checkout.template_title")}
                        </div>
                        <pre style={{
                            margin: 0,
                            padding: "12px",
                            background: colors.bgHover,
                            borderRadius: "8px",
                            fontSize: "12px",
                            color: colors.textSecondary,
                            whiteSpace: "pre-wrap",
                            fontFamily: "inherit",
                            lineHeight: 1.6
                        }}>
                            {t("checkout.template_body")}
                        </pre>
                    </div>

                    <a
                        href="https://t.me/cryptologicarra7"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                            width: "100%",
                            padding: "16px",
                            background: "#0088cc",
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
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                        </svg>
                        {t("checkout.confirm_btn")} @cryptologicarra7
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
