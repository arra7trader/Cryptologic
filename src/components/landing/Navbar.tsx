"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import { colors } from "@/lib/constants";

export default function Navbar() {
    const { t } = useLanguage();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                background: scrolled ? "rgba(10,10,11,0.8)" : "transparent",
                backdropFilter: scrolled ? "blur(12px)" : "none",
                borderBottom: `1px solid ${scrolled ? colors.border : "transparent"}`,
                transition: "background 0.3s, border 0.3s, backdrop-filter 0.3s",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    maxWidth: "1200px",
                    margin: "0 auto",
                    padding: "0 24px",
                    height: "64px",
                }}
            >
                <Link href="/" style={{ textDecoration: "none" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <motion.div
                            whileHover={{ scale: 1.2, boxShadow: `0 0 20px ${colors.accent}` }}
                            style={{
                                width: "8px",
                                height: "8px",
                                background: colors.accent,
                                borderRadius: "50%",
                                boxShadow: `0 0 12px ${colors.accent}`,
                            }}
                        />
                        <span style={{ fontSize: "15px", fontWeight: 600, letterSpacing: "0.1em", color: colors.textPrimary }}>
                            CRYPTOLOGIC
                        </span>
                    </div>
                </Link>

                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <LanguageSwitcher />
                    <Link href="/login">
                        <motion.button
                            whileHover={{ scale: 1.05, color: colors.textPrimary }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                padding: "8px 16px",
                                background: "transparent",
                                border: "none",
                                color: colors.textSecondary,
                                fontSize: "14px",
                                cursor: "pointer",
                            }}
                        >
                            {t("nav.login")}
                        </motion.button>
                    </Link>
                    <Link href="/register">
                        <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: "#fff" }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                padding: "8px 20px",
                                background: colors.textPrimary,
                                border: "none",
                                borderRadius: "8px",
                                color: colors.bg,
                                fontSize: "14px",
                                fontWeight: 600,
                                cursor: "pointer",
                            }}
                        >
                            {t("nav.getStarted")}
                        </motion.button>
                    </Link>
                </div>
            </div>
        </motion.nav>
    );
}
