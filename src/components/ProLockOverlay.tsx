"use client";

import { colors } from "@/lib/constants";
import { Lock, Crown } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

export default function ProLockOverlay({ featureName }: { featureName: string }) {
    const { t } = useLanguage();

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 20px",
            textAlign: "center",
            background: `linear-gradient(180deg, rgba(19,19,22,0) 0%, ${colors.bgCard} 100%)`,
            border: `1px dashed ${colors.border}`,
            borderRadius: "12px",
            height: "100%",
            minHeight: "300px"
        }}>
            <div style={{
                width: "48px",
                height: "48px",
                background: colors.purpleDim,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px"
            }}>
                <Lock size={24} style={{ color: colors.purple }} />
            </div>

            <h3 style={{ fontSize: "18px", fontWeight: 600, color: colors.textPrimary, marginBottom: "8px" }}>
                {featureName} is locked
            </h3>

            <p style={{ fontSize: "14px", color: colors.textSecondary, maxWidth: "300px", marginBottom: "24px" }}>
                Unlock institutional-grade insights, real-time whale tracking, and AI-powered signals with Pro.
            </p>

            <Link href="/pricing?plan=pro">
                <button style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px 24px",
                    background: colors.purple,
                    border: "none",
                    borderRadius: "8px",
                    color: "white",
                    fontWeight: 600,
                    cursor: "pointer",
                    fontSize: "14px",
                    boxShadow: `0 4px 12px ${colors.purpleDim}`
                }}>
                    <Crown size={16} />
                    Upgrade to Pro
                </button>
            </Link>
        </div>
    );
}
