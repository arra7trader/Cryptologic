"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { Language } from "@/lib/i18n";

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const colors = {
        bg: "#0a0a0b",
        border: "rgba(255,255,255,0.08)",
        text: "#9898a0",
        active: "#f5f5f7",
        activeBg: "rgba(255,255,255,0.05)",
        hover: "rgba(255,255,255,0.08)"
    };

    const languages: { code: Language; label: string; flag: string }[] = [
        { code: "id", label: "Bahasa", flag: "🇮🇩" },
        { code: "en", label: "English", flag: "🇺🇸" },
        { code: "cn", label: "中文", flag: "🇨🇳" },
    ];

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const currentLang = languages.find(l => l.code === language) || languages[0];

    return (
        <div ref={dropdownRef} style={{ position: "relative" }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 12px",
                    background: "transparent",
                    border: `1px solid ${colors.border}`,
                    borderRadius: "8px",
                    color: colors.active,
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: 500,
                    transition: "all 0.2s"
                }}
            >
                <span>{currentLang.flag}</span>
                <span style={{ textTransform: "uppercase" }}>{currentLang.code}</span>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ marginLeft: "4px", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {isOpen && (
                <div style={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    marginTop: "8px",
                    background: colors.bg,
                    border: `1px solid ${colors.border}`,
                    borderRadius: "12px",
                    padding: "6px",
                    minWidth: "140px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
                    zIndex: 100,
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px"
                }}>
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => {
                                setLanguage(lang.code);
                                setIsOpen(false);
                            }}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                padding: "10px 12px",
                                background: language === lang.code ? colors.activeBg : "transparent",
                                border: "none",
                                borderRadius: "8px",
                                color: language === lang.code ? colors.active : colors.text,
                                fontSize: "14px",
                                fontWeight: 500,
                                cursor: "pointer",
                                width: "100%",
                                textAlign: "left",
                                transition: "all 0.2s"
                            }}
                            onMouseEnter={(e) => {
                                if (language !== lang.code) e.currentTarget.style.background = colors.hover;
                            }}
                            onMouseLeave={(e) => {
                                if (language !== lang.code) e.currentTarget.style.background = "transparent";
                            }}
                        >
                            <span style={{ fontSize: "16px" }}>{lang.flag}</span>
                            <span>{lang.label}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
