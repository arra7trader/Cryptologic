"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { Language } from "@/lib/i18n";

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();

    const colors = {
        bg: "#0a0a0b",
        border: "rgba(255,255,255,0.08)",
        text: "#9898a0",
        active: "#f5f5f7",
        activeBg: "rgba(255,255,255,0.05)",
    };

    const languages: { code: Language; label: string; flag: string }[] = [
        { code: "id", label: "ID", flag: "🇮🇩" },
        { code: "en", label: "EN", flag: "🇺🇸" },
        { code: "cn", label: "CN", flag: "🇨🇳" },
    ];

    return (
        <div style={{ display: "flex", gap: "4px", background: colors.bg, padding: "4px", borderRadius: "8px", border: `1px solid ${colors.border}` }}>
            {languages.map((lang) => (
                <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    style={{
                        padding: "6px 10px",
                        background: language === lang.code ? colors.activeBg : "transparent",
                        border: "none",
                        borderRadius: "6px",
                        color: language === lang.code ? colors.active : colors.text,
                        fontSize: "12px",
                        fontWeight: 600,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        transition: "all 0.2s",
                    }}
                >
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                </button>
            ))}
        </div>
    );
}
