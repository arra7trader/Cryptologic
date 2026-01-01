"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { colors } from "@/lib/constants";
import { motion } from "framer-motion";

export default function Stats() {
    const { t } = useLanguage();

    const stats = [
        { value: "15,000+", label: t("stats.cryptos") },
        { value: "300M+", label: t("stats.signals") },
        { value: "$1,999 → $14", label: t("stats.price") },
        { value: "99%", label: t("stats.savings") },
    ];

    return (
        <section style={{ padding: "40px 24px", background: colors.bgCard }}>
            <div
                style={{
                    maxWidth: "900px",
                    margin: "0 auto",
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "24px",
                    textAlign: "center",
                }}
            >
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                    >
                        <div style={{ fontSize: "24px", fontWeight: 700, color: colors.textPrimary, marginBottom: "4px" }}>
                            {stat.value}
                        </div>
                        <div style={{ fontSize: "12px", color: colors.textDim }}>{stat.label}</div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
