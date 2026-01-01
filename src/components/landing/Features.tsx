"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";
import { colors } from "@/lib/constants";

// Icons
const IconBrain = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
        <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
        <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
        <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
        <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
        <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
        <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
        <path d="M6 18a4 4 0 0 1-1.967-.516" />
        <path d="M19.967 17.484A4 4 0 0 1 18 18" />
    </svg>
);

const IconBarChart = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" x2="12" y1="20" y2="10" />
        <line x1="18" x2="18" y1="20" y2="4" />
        <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
);

const IconStar = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);

const IconBell = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
);

const IconShield = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
        <path d="m9 12 2 2 4-4" />
    </svg>
);

const IconZap = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </svg>
);

function FeatureCard({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className="group relative border border-white/10 overflow-hidden rounded-xl bg-neutral-900"
            onMouseMove={handleMouseMove}
            style={{
                background: colors.bgCard,
                border: `1px solid ${colors.border}`,
            }}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(16, 185, 129, 0.15),
              transparent 80%
            )
          `,
                }}
            />

            <div className="relative p-8">
                <div
                    style={{
                        width: "48px",
                        height: "48px",
                        background: colors.accentDim,
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "20px",
                        color: colors.accent,
                    }}
                >
                    <Icon />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-neutral-200" style={{ color: colors.textPrimary }}>
                    {title}
                </h3>
                <p className="text-sm leading-relaxed text-neutral-400" style={{ color: colors.textSecondary }}>
                    {description}
                </p>
            </div>
        </div>
    );
}

export default function Features() {
    const { t } = useLanguage();

    return (
        <section style={{ padding: "80px 24px", maxWidth: "1200px", margin: "0 auto" }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{ textAlign: "center", marginBottom: "60px" }}
            >
                <div style={{ fontSize: "13px", color: colors.accent, fontWeight: 600, marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    {t("features.title.1")}
                </div>
                <h2 style={{ fontSize: "32px", fontWeight: 700, color: colors.textPrimary, marginBottom: "16px" }}>
                    {t("features.title.2")}
                </h2>
                <p style={{ fontSize: "16px", color: colors.textSecondary, maxWidth: "500px", margin: "0 auto" }}>
                    {t("features.desc")}
                </p>
            </motion.div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
                <FeatureCard
                    icon={IconBrain}
                    title={t("features.card.1.title")}
                    description={t("features.card.1.desc")}
                />
                <FeatureCard
                    icon={IconBarChart}
                    title={t("features.card.2.title")}
                    description={t("features.card.2.desc")}
                />
                <FeatureCard
                    icon={IconStar}
                    title={t("features.card.3.title")}
                    description={t("features.card.3.desc")}
                />
                <FeatureCard
                    icon={IconBell}
                    title={t("features.card.4.title")}
                    description={t("features.card.4.desc")}
                />
                <FeatureCard
                    icon={IconShield}
                    title={t("features.card.5.title")}
                    description={t("features.card.5.desc")}
                />
                <FeatureCard
                    icon={IconZap}
                    title={t("features.card.6.title")}
                    description={t("features.card.6.desc")}
                />
            </div>
        </section>
    );
}
