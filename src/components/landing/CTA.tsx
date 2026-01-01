"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { colors } from "@/lib/constants";
import { motion } from "framer-motion";

export default function CTA() {
    const { t } = useLanguage();
    return (
        <section
            style={{
                padding: "100px 24px",
                textAlign: "center",
                background: `linear-gradient(180deg, ${colors.bg} 0%, ${colors.bgCard} 100%)`,
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <h2 style={{ fontSize: "36px", fontWeight: 700, color: colors.textPrimary, marginBottom: "16px" }}>
                    {t("cta.title")}
                </h2>
                <p style={{ fontSize: "16px", color: colors.textSecondary, marginBottom: "32px" }}>
                    {t("cta.subtitle")}
                </p>
                <Link href="/register">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            padding: "16px 40px",
                            background: colors.accent,
                            border: "none",
                            borderRadius: "12px",
                            color: "#000",
                            fontSize: "16px",
                            fontWeight: 600,
                            cursor: "pointer",
                        }}
                    >
                        {t("cta.btn")}
                    </motion.button>
                </Link>
            </motion.div>
        </section>
    );
}
