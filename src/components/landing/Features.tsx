"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";
import { colors } from "@/lib/constants";

// Premium SVG Icons
const IconCosmic = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 3" />
    </svg>
);

const IconChart = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 3v18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 14l4-4 4 4 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="7" cy="14" r="1.5" fill="currentColor" />
        <circle cx="11" cy="10" r="1.5" fill="currentColor" />
        <circle cx="15" cy="14" r="1.5" fill="currentColor" />
        <circle cx="20" cy="8" r="1.5" fill="currentColor" />
    </svg>
);

const IconWatchlist = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6L12 2z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
);

const IconNasa = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" transform="rotate(120 12 12)" />
    </svg>
);

const IconHistory = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 12h2M19 12h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const IconLive = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

function FeatureCard({ icon: Icon, title, description, index }: { icon: any; title: string; description: string; index: number }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative overflow-hidden"
            onMouseMove={handleMouseMove}
            style={{
                background: `linear-gradient(135deg, ${colors.bgCard} 0%, rgba(20,20,25,1) 100%)`,
                border: `1px solid ${colors.border}`,
                borderRadius: "20px",
                padding: "32px",
                cursor: "default",
            }}
        >
            {/* Spotlight Effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-[20px] opacity-0 transition duration-500 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            400px circle at ${mouseX}px ${mouseY}px,
                            rgba(16, 185, 129, 0.12),
                            transparent 60%
                        )
                    `,
                }}
            />

            {/* Glow Border on Hover */}
            <div className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `linear-gradient(135deg, ${colors.accent}22 0%, transparent 50%)`,
                }}
            />

            {/* Content */}
            <div className="relative z-10">
                {/* Icon Container */}
                <div
                    style={{
                        width: "56px",
                        height: "56px",
                        background: `linear-gradient(135deg, ${colors.accent}20 0%, ${colors.accent}08 100%)`,
                        border: `1px solid ${colors.accent}30`,
                        borderRadius: "16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "24px",
                        color: colors.accent,
                        transition: "all 0.3s ease",
                    }}
                    className="group-hover:scale-110 group-hover:shadow-lg"
                >
                    <Icon />
                </div>

                {/* Title */}
                <h3 style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    color: colors.textPrimary,
                    marginBottom: "12px",
                    letterSpacing: "-0.02em",
                }}>
                    {title}
                </h3>

                {/* Description */}
                <p style={{
                    fontSize: "14px",
                    lineHeight: "1.7",
                    color: colors.textSecondary,
                    margin: 0,
                }}>
                    {description}
                </p>
            </div>
        </motion.div>
    );
}

export default function Features() {
    const { t } = useLanguage();

    const features = [
        { icon: IconCosmic, titleKey: "features.card.1.title", descKey: "features.card.1.desc" },
        { icon: IconChart, titleKey: "features.card.2.title", descKey: "features.card.2.desc" },
        { icon: IconWatchlist, titleKey: "features.card.3.title", descKey: "features.card.3.desc" },
        { icon: IconNasa, titleKey: "features.card.4.title", descKey: "features.card.4.desc" },
        { icon: IconHistory, titleKey: "features.card.5.title", descKey: "features.card.5.desc" },
        { icon: IconLive, titleKey: "features.card.6.title", descKey: "features.card.6.desc" },
    ];

    return (
        <section style={{ padding: "100px 24px", maxWidth: "1200px", margin: "0 auto" }}>
            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{ textAlign: "center", marginBottom: "64px" }}
            >
                <div style={{
                    display: "inline-block",
                    padding: "8px 16px",
                    background: colors.accentDim,
                    borderRadius: "100px",
                    fontSize: "12px",
                    color: colors.accent,
                    fontWeight: 600,
                    marginBottom: "20px",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                }}>
                    {t("features.title.1")}
                </div>
                <h2 style={{
                    fontSize: "clamp(28px, 5vw, 40px)",
                    fontWeight: 800,
                    color: colors.textPrimary,
                    marginBottom: "16px",
                    letterSpacing: "-0.03em",
                }}>
                    {t("features.title.2")}
                </h2>
                <p style={{
                    fontSize: "17px",
                    color: colors.textSecondary,
                    maxWidth: "550px",
                    margin: "0 auto",
                    lineHeight: "1.6",
                }}>
                    {t("features.desc")}
                </p>
            </motion.div>

            {/* Feature Cards Grid */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "24px",
            }}>
                {features.map((feature, index) => (
                    <FeatureCard
                        key={index}
                        icon={feature.icon}
                        title={t(feature.titleKey)}
                        description={t(feature.descKey)}
                        index={index}
                    />
                ))}
            </div>
        </section>
    );
}
