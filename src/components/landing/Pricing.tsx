"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { colors } from "@/lib/constants";
import { motion } from "framer-motion";

const IconCheck = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6 9 17l-5-5" />
    </svg>
);

function PricingCard({ title, price, priceNote, features, popular, cta }: { title: string; price: string; priceNote?: string; features: string[]; popular?: boolean; cta: string }) {
    const { t } = useLanguage();
    return (
        <motion.div
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{
                background: popular ? `linear-gradient(135deg, ${colors.purpleDim}, ${colors.bgCard})` : colors.bgCard,
                border: `1px solid ${popular ? "rgba(139,92,246,0.3)" : colors.border}`,
                borderRadius: "20px",
                padding: "32px",
                position: "relative",
                flex: 1,
                maxWidth: "360px",
            }}
        >
            {popular && (
                <div
                    style={{
                        position: "absolute",
                        top: "-12px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: colors.purple,
                        color: "white",
                        fontSize: "11px",
                        fontWeight: 600,
                        padding: "4px 16px",
                        borderRadius: "100px",
                    }}
                >
                    BEST VALUE
                </div>
            )}
            <h3 style={{ fontSize: "20px", fontWeight: 600, color: colors.textPrimary, marginBottom: "8px" }}>{title}</h3>
            <div style={{ marginBottom: "8px" }}>
                <span style={{ fontSize: "40px", fontWeight: 700, color: colors.textPrimary }}>{price}</span>
                {price !== "Free" && <span style={{ fontSize: "14px", color: colors.textSecondary }}>{t("pricing.month")}</span>}
            </div>
            {priceNote && (
                <div style={{ fontSize: "12px", color: colors.accent, marginBottom: "16px" }}>{priceNote}</div>
            )}
            <ul style={{ listStyle: "none", padding: 0, marginBottom: "28px" }}>
                {features.map((feature, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px", fontSize: "14px", color: colors.textSecondary }}>
                        <span style={{ color: colors.accent }}><IconCheck /></span>
                        {feature}
                    </li>
                ))}
            </ul>
            <Link href="/register">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        width: "100%",
                        padding: "14px",
                        background: popular ? colors.purple : "transparent",
                        border: popular ? "none" : `1px solid ${colors.border}`,
                        borderRadius: "10px",
                        color: colors.textPrimary,
                        fontSize: "14px",
                        fontWeight: 600,
                        cursor: "pointer",
                    }}
                >
                    {cta}
                </motion.button>
            </Link>
        </motion.div>
    );
}

export default function Pricing() {
    const { t } = useLanguage();

    return (
        <section style={{ padding: "80px 24px", background: colors.bgCard }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ maxWidth: "1000px", margin: "0 auto" }}
            >
                <div style={{ textAlign: "center", marginBottom: "60px" }}>
                    <h2 style={{ fontSize: "32px", fontWeight: 700, color: colors.textPrimary, marginBottom: "16px" }}>
                        {t("pricing.title")}
                    </h2>
                    <p style={{ fontSize: "16px", color: colors.textSecondary }}>
                        {t("pricing.subtitle")}
                    </p>
                    <div style={{ marginTop: "16px", display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 16px", background: colors.bg, borderRadius: "100px", border: `1px solid ${colors.border}` }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" fill="#26A17B" />
                            <path d="M12.5 6.5h-1v3h-3v1h3v5.5h1v-5.5h3v-1h-3v-3z" fill="white" />
                        </svg>
                        <span style={{ fontSize: "12px", color: colors.textSecondary }}>{t("pricing.pay_usdt")}</span>
                    </div>
                </div>

                <div style={{ display: "flex", gap: "24px", justifyContent: "center", flexWrap: "wrap" }}>
                    <PricingCard
                        title={t("pricing.lite.title")}
                        price={t("pricing.lite.price")}
                        features={[t("pricing.feat.1"), t("pricing.feat.2"), t("pricing.feat.3")]}
                        cta={t("pricing.lite.cta")}
                    />
                    <PricingCard
                        title={t("pricing.pro.title")}
                        price={t("pricing.pro.price")}
                        priceNote={t("pricing.pro.note")}
                        features={[
                            t("pricing.feat.4"),
                            t("pricing.feat.5"),
                            t("pricing.feat.6"),
                            t("pricing.feat.7"),
                            t("pricing.feat.8"),
                            t("pricing.feat.9"),
                            t("pricing.feat.10"),
                        ]}
                        popular
                        cta={t("pricing.pro.cta")}
                    />
                </div>
            </motion.div>
        </section>
    );
}
