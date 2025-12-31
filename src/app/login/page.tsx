"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, AlertCircle, RefreshCw, Shield } from "lucide-react";
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
    red: "#ef4444",
};

// Generate math CAPTCHA
function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operators = ["+", "-", "×"];
    const op = operators[Math.floor(Math.random() * operators.length)];
    let answer: number;

    switch (op) {
        case "+": answer = num1 + num2; break;
        case "-": answer = num1 - num2; break;
        case "×": answer = num1 * num2; break;
        default: answer = num1 + num2;
    }

    return { question: `${num1} ${op} ${num2} = ?`, answer };
}

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    // CAPTCHA state
    const [captcha, setCaptcha] = useState({ question: "", answer: 0 });
    const [captchaInput, setCaptchaInput] = useState("");

    // Generate CAPTCHA on mount
    useEffect(() => {
        setCaptcha(generateCaptcha());
    }, []);

    const refreshCaptcha = () => {
        setCaptcha(generateCaptcha());
        setCaptchaInput("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Validate CAPTCHA
        if (parseInt(captchaInput) !== captcha.answer) {
            setError("Jawaban CAPTCHA salah");
            refreshCaptcha();
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, rememberMe }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Login failed");
            }

            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message);
            refreshCaptcha();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: "100vh", background: colors.bg, fontFamily: "'Inter', -apple-system, sans-serif", display: "flex", flexDirection: "column" }}>
            {/* Navbar Minimal */}
            <nav style={{ padding: "24px", display: "flex", justifyContent: "center" }}>
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
                        <h1 style={{ fontSize: "24px", fontWeight: 600, color: colors.textPrimary, marginBottom: "8px" }}>Welcome Back</h1>
                        <p style={{ color: colors.textSecondary, fontSize: "14px" }}>Enter your credentials to access your account</p>
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
                            <label style={{ display: "block", fontSize: "12px", color: colors.textSecondary, marginBottom: "8px" }}>Email</label>
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
                        <div style={{ marginBottom: "16px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                                <label style={{ fontSize: "12px", color: colors.textSecondary }}>Password</label>
                                <Link href="/forgot-password" style={{ fontSize: "12px", color: colors.purple, textDecoration: "none" }}>Forgot?</Link>
                            </div>
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

                        {/* CAPTCHA */}
                        <div style={{ marginBottom: "16px" }}>
                            <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: colors.textSecondary, marginBottom: "8px" }}>
                                <Shield size={12} />
                                Security Check
                            </label>
                            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                                <div
                                    style={{
                                        flex: 1,
                                        padding: "12px 16px",
                                        background: colors.bgHover,
                                        border: `1px solid ${colors.border}`,
                                        borderRadius: "8px",
                                        color: colors.accent,
                                        fontSize: "16px",
                                        fontWeight: 600,
                                        textAlign: "center",
                                        fontFamily: "monospace",
                                    }}
                                >
                                    {captcha.question}
                                </div>
                                <button
                                    type="button"
                                    onClick={refreshCaptcha}
                                    style={{
                                        padding: "12px",
                                        background: colors.bg,
                                        border: `1px solid ${colors.border}`,
                                        borderRadius: "8px",
                                        color: colors.textSecondary,
                                        cursor: "pointer",
                                    }}
                                >
                                    <RefreshCw size={16} />
                                </button>
                            </div>
                            <input
                                type="number"
                                required
                                placeholder="Jawaban"
                                value={captchaInput}
                                onChange={(e) => setCaptchaInput(e.target.value)}
                                style={{
                                    width: "100%",
                                    marginTop: "8px",
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

                        {/* Remember Me */}
                        <div style={{ marginBottom: "24px" }}>
                            <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    style={{
                                        width: "16px",
                                        height: "16px",
                                        accentColor: colors.accent,
                                        cursor: "pointer",
                                    }}
                                />
                                <span style={{ fontSize: "13px", color: colors.textSecondary }}>Remember me for 30 days</span>
                            </label>
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
                                    Signing In...
                                </>
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight size={16} />
                                </>
                            )}
                        </button>
                    </form>

                    <div style={{ marginTop: "24px", textAlign: "center", fontSize: "13px", color: colors.textSecondary }}>
                        Don't have an account?{" "}
                        <Link href="/register" style={{ color: colors.textPrimary, textDecoration: "none", fontWeight: 500 }}>
                            Create Account
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
