"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Globe, ArrowRight, Loader2, AlertCircle } from "lucide-react";
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

export default function RegisterPage() {
    const { t } = useLanguage();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Registration failed");
            }

            router.push("/");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
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
                    <div style={{ textAlign: "center", marginBottom: "32px" }}>
                        <h1 style={{ fontSize: "24px", fontWeight: 600, color: colors.textPrimary, marginBottom: "8px" }}>{t("auth.register.title")}</h1>
                        <p style={{ color: colors.textSecondary, fontSize: "14px" }}>{t("auth.register.subtitle")}</p>
                    </div>

                    {error && (
                        <div
                            style={{
                                background: "rgba(239,68,68,0.1)",
                                border: `1px solid rgba(239,68,68,0.2)`,
                                borderRadius: "8px",
                                padding: "12px",
                                marginBottom: "20px",
                                color: colors.red,
                                fontSize: "13px",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                            }}
                        >
                            <AlertCircle size={14} />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: "16px" }}>
                            <div style={{ marginBottom: "16px" }}>
                                <label style={{ display: "block", fontSize: "12px", color: colors.textSecondary, marginBottom: "8px" }}>{t("auth.name")}</label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    style={{
                                        width: "100%",
                                        padding: "10px 12px",
                                        background: colors.bg,
                                        border: `1px solid ${colors.border}`,
                                        borderRadius: "8px",
                                        color: colors.textPrimary,
                                        fontSize: "14px",
                                        outline: "none",
                                    }}
                                />
                            </div>
                            <div style={{ marginBottom: "16px" }}>
                                <label style={{ display: "block", fontSize: "12px", color: colors.textSecondary, marginBottom: "8px" }}>{t("auth.email")}</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={{
                                        width: "100%",
                                        padding: "10px 12px",
                                        background: colors.bg,
                                        border: `1px solid ${colors.border}`,
                                        borderRadius: "8px",
                                        color: colors.textPrimary,
                                        fontSize: "14px",
                                        outline: "none",
                                    }}
                                />
                            </div>
                            <div style={{ marginBottom: "24px" }}>
                                <label style={{ display: "block", fontSize: "12px", color: colors.textSecondary, marginBottom: "8px" }}>{t("auth.password")}</label>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={{
                                        width: "100%",
                                        padding: "10px 12px",
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
                                    background: colors.textPrimary,
                                    color: colors.bg,
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
                                        {t("auth.creating")}
                                    </>
                                ) : (
                                    <>
                                        {t("auth.create")}
                                        <ArrowRight size={16} />
                                    </>
                                )}
                            </button>
                    </form>

                    <div style={{ marginTop: "24px", textAlign: "center", fontSize: "13px", color: colors.textSecondary }}>
                        {t("auth.have_account")}{" "}
                        <Link href="/login" style={{ color: colors.textPrimary, textDecoration: "none", fontWeight: 500 }}>
                            {t("auth.signin")}
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
