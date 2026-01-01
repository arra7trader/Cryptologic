"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { motion } from "framer-motion";

// Icons
const IconSparkles = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        <path d="M5 3v4" />
        <path d="M19 17v4" />
        <path d="M3 5h4" />
        <path d="M17 19h4" />
    </svg>
);

const IconChevronRight = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m9 18 6-6-6-6" />
    </svg>
);

const IconTrendingUp = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
    </svg>
);

import { colors } from "@/lib/constants";

// Animated Moon Phase Component
function AnimatedMoonPhase() {
    const [phase, setPhase] = useState(0);
    const [phaseName, setPhaseName] = useState("");

    useEffect(() => {
        // Calculate real moon phase based on current date
        const calculateMoonPhase = () => {
            const now = new Date();
            // Known new moon date (Jan 6, 2000)
            const known = new Date(2000, 0, 6, 18, 14, 0);
            const lunarCycle = 29.53058770576; // days
            const diff = (now.getTime() - known.getTime()) / (1000 * 60 * 60 * 24);
            const currentPhase = (diff % lunarCycle) / lunarCycle;
            setPhase(currentPhase);

            // Determine phase name
            if (currentPhase < 0.03) setPhaseName("🌑 New Moon");
            else if (currentPhase < 0.25) setPhaseName("🌒 Waxing Crescent");
            else if (currentPhase < 0.28) setPhaseName("🌓 First Quarter");
            else if (currentPhase < 0.47) setPhaseName("🌔 Waxing Gibbous");
            else if (currentPhase < 0.53) setPhaseName("🌕 Full Moon");
            else if (currentPhase < 0.72) setPhaseName("🌖 Waning Gibbous");
            else if (currentPhase < 0.78) setPhaseName("🌗 Last Quarter");
            else if (currentPhase < 0.97) setPhaseName("🌘 Waning Crescent");
            else setPhaseName("🌑 New Moon");
        };

        calculateMoonPhase();
        const interval = setInterval(calculateMoonPhase, 60000); // Update every minute
        return () => clearInterval(interval);
    }, []);

    // Calculate illumination percentage for visual
    const illumination = phase < 0.5 ? phase * 2 : (1 - phase) * 2;

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <div
                style={{
                    position: "relative",
                    width: "60px",
                    height: "60px",
                    animation: "moonGlow 4s ease-in-out infinite",
                }}
            >
                {/* Moon SVG */}
                <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
                    <defs>
                        <radialGradient id="moonGradient" cx="30%" cy="30%">
                            <stop offset="0%" stopColor="#fffacd" />
                            <stop offset="100%" stopColor="#f0e68c" />
                        </radialGradient>
                        <filter id="moonGlow">
                            <feGaussianBlur stdDeviation="2" result="glow" />
                            <feMerge>
                                <feMergeNode in="glow" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                    {/* Base moon */}
                    <circle cx="50" cy="50" r="45" fill="url(#moonGradient)" filter="url(#moonGlow)" />
                    {/* Shadow overlay based on phase */}
                    <ellipse
                        cx={phase < 0.5 ? 50 + (1 - illumination) * 45 : 50 - (1 - illumination) * 45}
                        cy="50"
                        rx={45 * Math.abs(1 - illumination * 2)}
                        ry="45"
                        fill="#0a0a0b"
                        opacity={phase < 0.5 ? (phase < 0.25 ? 1 : 0.8) : (phase > 0.75 ? 1 : 0.8)}
                    />
                    {/* Crater details */}
                    <circle cx="35" cy="35" r="6" fill="#e6dc9a" opacity="0.5" />
                    <circle cx="60" cy="55" r="8" fill="#e6dc9a" opacity="0.4" />
                    <circle cx="45" cy="65" r="5" fill="#e6dc9a" opacity="0.3" />
                </svg>
                {/* Animated glow ring */}
                <div
                    style={{
                        position: "absolute",
                        inset: "-10px",
                        borderRadius: "50%",
                        border: "2px solid rgba(245, 245, 247, 0.1)",
                        animation: "pulseRing 3s ease-in-out infinite",
                    }}
                />
            </div>
            <div style={{ fontSize: "11px", color: "#9898a0", fontWeight: 500 }}>
                {phaseName}
            </div>
            <style jsx global>{`
        @keyframes moonGlow {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(255, 250, 205, 0.4)); }
          50% { filter: drop-shadow(0 0 20px rgba(255, 250, 205, 0.8)); }
        }
        @keyframes pulseRing {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.15); opacity: 0.1; }
        }
      `}</style>
        </div>
    );
}

export default function Hero() {
    const { t } = useLanguage();
    const [cosmicScore, setCosmicScore] = useState(78);

    // Animate cosmic score
    useEffect(() => {
        const interval = setInterval(() => {
            setCosmicScore((prev) => {
                const change = Math.random() > 0.5 ? 1 : -1;
                const newScore = prev + change;
                return Math.max(30, Math.min(95, newScore));
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section
            style={{
                paddingTop: "160px",
                paddingBottom: "120px",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Background glow */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "600px",
                    height: "600px",
                    background: `radial-gradient(circle, ${colors.accentDim} 0%, transparent 70%)`,
                    pointerEvents: "none",
                }}
            />

            <div style={{ position: "relative", maxWidth: "800px", margin: "0 auto", padding: "0 24px" }}>
                {/* Nansen Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "6px 16px",
                        background: colors.bgCard,
                        border: `1px solid ${colors.border}`,
                        borderRadius: "100px",
                        marginBottom: "24px",
                        fontSize: "13px",
                        color: colors.textSecondary,
                    }}
                >
                    <span style={{ color: colors.gold }}><IconSparkles /></span>
                    <span>{t("hero.badge")}</span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    style={{
                        fontSize: "clamp(36px, 6vw, 64px)",
                        fontWeight: 700,
                        lineHeight: 1.1,
                        color: colors.textPrimary,
                        marginBottom: "24px",
                    }}
                >
                    {t("hero.headline.1")}{" "}
                    <span style={{ color: colors.accent }}>{t("hero.headline.2")}</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    style={{
                        fontSize: "18px",
                        color: colors.textSecondary,
                        lineHeight: 1.7,
                        marginBottom: "40px",
                        maxWidth: "600px",
                        margin: "0 auto 40px",
                    }}
                >
                    {t("hero.desc")}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}
                >
                    <Link href="/register">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                padding: "14px 32px",
                                background: colors.accent,
                                border: "none",
                                borderRadius: "10px",
                                color: "#000",
                                fontSize: "15px",
                                fontWeight: 600,
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                            }}
                        >
                            {t("hero.cta.start")}
                            <IconChevronRight />
                        </motion.button>
                    </Link>
                    <Link href="/dashboard">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                padding: "14px 32px",
                                background: "transparent",
                                border: `1px solid ${colors.border}`,
                                borderRadius: "10px",
                                color: colors.textPrimary,
                                fontSize: "15px",
                                fontWeight: 500,
                                cursor: "pointer",
                            }}
                        >
                            {t("hero.cta.demo")}
                        </motion.button>
                    </Link>
                </motion.div>
            </div>

            {/* Live Cosmic Score Preview */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                style={{
                    marginTop: "80px",
                    display: "flex",
                    justifyContent: "center",
                    gap: "24px",
                    flexWrap: "wrap",
                }}
            >
                {/* Moon Phase Card */}
                <motion.div
                    whileHover={{ y: -5 }}
                    style={{
                        background: colors.bgCard,
                        border: `1px solid ${colors.border}`,
                        borderRadius: "20px",
                        padding: "32px 40px",
                        textAlign: "center",
                        minWidth: "180px",
                    }}
                >
                    <div style={{ fontSize: "12px", color: colors.textDim, textTransform: "uppercase", marginBottom: "16px" }}>
                        Current Moon Phase
                    </div>
                    <AnimatedMoonPhase />
                </motion.div>

                {/* Cosmic Score Card */}
                <motion.div
                    whileHover={{ y: -5 }}
                    style={{
                        background: colors.bgCard,
                        border: `1px solid ${colors.border}`,
                        borderRadius: "20px",
                        padding: "32px 48px",
                        textAlign: "center",
                    }}
                >
                    <div style={{ fontSize: "12px", color: colors.textDim, textTransform: "uppercase", marginBottom: "12px" }}>
                        {t("hero.cosmic_score")}
                    </div>
                    <div
                        style={{
                            fontSize: "72px",
                            fontWeight: 700,
                            color: colors.accent,
                            lineHeight: 1,
                        }}
                    >
                        {cosmicScore}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", justifyContent: "center", marginTop: "12px", color: colors.accent }}>
                        <IconTrendingUp />
                        <span style={{ fontSize: "14px", fontWeight: 500 }}>{t("hero.signal")}</span>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
