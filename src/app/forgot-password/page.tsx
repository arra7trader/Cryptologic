"use client";

import { useState } from "react";
import { ArrowLeft, Mail, Shield, Loader2, CheckCircle } from "lucide-react";
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
    red: "#ef4444",
};

export default function ForgotPasswordPage() {
    const { t } = useLanguage();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate sending reset email (in real app, this would call an API)
        await new Promise(resolve => setTimeout(resolve, 1500));

        setSent(true);
        setLoading(false);
    };

    return (
        <div style={{ minHeight: "100vh", background: colors.bg, fontFamily: "'Inter', -apple-system, sans-serif", display: "flex", flexDirection: "column" }}>
            {/* Navbar Minimal */}
            <nav style={{ padding: "24px", display: "flex", justifyContent: "center", alignItems: "center", gap: "20px" }}>
                <Link href="/" style={{ textDecoration: "none" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div
                            style={{
                                width: "8px",
                                height: "8px",
                                background: colors.accent,
                                borderRadius: "50%",
                                boxShadow: `0 0 12px ${colors.accent}`,
                            }}
                        />
                        <span style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "0.1em", color: colors.textPrimary }}>
                            CRYPTOLOGIC
                        </span>
                    </div>
                </Link>
                <LanguageSwitcher />
            </nav>

            {/* Content */}
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
                <div
                    style={{
                        width: "100%",
                        maxWidth: "400px",
                        background: colors.bgCard,
                        border: `1px solid ${colors.border}`,
                        borderRadius: "16px",
                        padding: "32px",
                    }}
                >
                    {/* Back to Login */}
                    <Link href="/login" style={{ textDecoration: "none" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", color: colors.textSecondary, fontSize: "13px", marginBottom: "24px" }}>
                            <ArrowLeft size={14} />
                            {t("forgot.back_login")}
                        </div>
                    </Link>

                    {!sent ? (
                        <>
                            <div style={{ textAlign: "center", marginBottom: "32px" }}>
                                <div
                                    style={{
                                        width: "48px",
                                        height: "48px",
                                        background: "rgba(139,92,246,0.15)",
                                        borderRadius: "12px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        margin: "0 auto 16px",
                                    }}
                                >
                                    <Shield size={24} style={{ color: colors.purple }} />
                                </div>
                                <h1 style={{ fontSize: "24px", fontWeight: 600, color: colors.textPrimary, marginBottom: "8px" }}>{t("forgot.title")}</h1>
                                <p style={{ color: colors.textSecondary, fontSize: "14px" }}>
                                    {t("forgot.subtitle")}
                                </p>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div style={{ marginBottom: "24px" }}>
                                    <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: colors.textSecondary, marginBottom: "8px" }}>
                                        <Mail size={12} />
                                        {t("forgot.email_label")}
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        placeholder={t("forgot.email_placeholder")}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        style={{
                                            width: "100%",
                                            padding: "12px",
                                            background: colors.bg,
                                            border: `1px solid ${colors.border}`,
                                            borderRadius: "8px",
                                            color: colors.textPrimary,
                                            fontSize: "14px",
                                            outline: "none",
                                        }}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    style={{
                                        width: "100%",
                                        padding: "12px",
                                        background: colors.purple,
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: "8px",
                                        fontSize: "14px",
                                        fontWeight: 600,
                                        cursor: loading ? "not-allowed" : "pointer",
                                        opacity: loading ? 0.7 : 1,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: "8px",
                                    }}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
                                            {t("forgot.btn_sending")}
                                        </>
                                    ) : (
                                        t("forgot.btn_send")
                                    )}
                                </button>
                            </form>
                        </>
                    ) : (
                        <div style={{ textAlign: "center" }}>
                            <div
                                style={{
                                    width: "64px",
                                    height: "64px",
                                    background: "rgba(16,185,129,0.15)",
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    margin: "0 auto 24px",
                                }}
                            >
                                <CheckCircle size={32} style={{ color: colors.accent }} />
                            </div>
                            <h2 style={{ fontSize: "20px", fontWeight: 600, color: colors.textPrimary, marginBottom: "12px" }}>{t("forgot.sent_title")}</h2>
                            <p style={{ color: colors.textSecondary, fontSize: "14px", marginBottom: "24px", lineHeight: 1.6 }}>
                                {t("forgot.sent_desc")}
                            </p>
                            <p style={{ color: colors.textDim, fontSize: "12px" }}>
                                {t("forgot.spam_check")}{" "}
                                <button
                                    onClick={() => setSent(false)}
                                    style={{ background: "none", border: "none", color: colors.purple, cursor: "pointer", fontSize: "12px" }}
                                >
                                    {t("forgot.try_again")}
                                </button>
                            </p>
                        </div>
                    )}

                    <div style={{ marginTop: "24px", textAlign: "center", fontSize: "13px", color: colors.textSecondary }}>
                        {t("forgot.remember")}{" "}
                        <Link href="/login" style={{ color: colors.textPrimary, textDecoration: "none", fontWeight: 500 }}>
                            {t("forgot.login_now")}
                        </Link>
                    </div>
                </div>
            </div>

            <style jsx global>{`
              @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
            `}</style>
        </div>
    );
}
