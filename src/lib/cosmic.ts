/**
 * Cosmic Score using REAL astrological calculations
 * Powered by astronomy-engine (NASA JPL ephemeris)
 */

import { CosmicScore } from "@/types";
import { getCoinCosmicScore, calculateAstrology, AstrologyData } from "./astrology";

// Event type mapping from astrology data to event keys
function getEventKey(data: AstrologyData): string {
    if (data.mercuryRetrograde) return "mercury_retrograde";
    if (data.moonPhaseName === "Full Moon") return "full_moon";
    if (data.moonPhaseName === "New Moon") return "new_moon";
    // Jupiter and Saturn conjunction check (within 10 degrees)
    const jupSatDiff = Math.abs(data.planets.jupiter.longitude - data.planets.saturn.longitude);
    if (jupSatDiff < 10 || jupSatDiff > 350) return "jupiter_saturn_conjunction";
    return "new_moon"; // Default
}

/**
 * Generate cosmic score for a coin based on REAL astrological calculations
 */
export function generateCosmicScore(coinId: string): CosmicScore {
    const data = getCoinCosmicScore(coinId);
    const eventKey = getEventKey(data);

    // Determine volatility alert (Mercury retrograde or score extremes)
    const volatilityAlert = data.mercuryRetrograde || data.cosmicScore < 35 || data.cosmicScore > 85;

    return {
        coinId,
        score: data.cosmicScore,
        trend: data.trend,
        event: eventKey,
        volatilityAlert,
    };
}

/**
 * Get current global astrological data
 */
export function getGlobalAstrology(): AstrologyData {
    return calculateAstrology();
}

// Get trend color
export function getTrendColor(trend: string): string {
    switch (trend) {
        case "Bullish": return "#10b981";
        case "Bearish": return "#ef4444";
        default: return "#f59e0b";
    }
}

// Get score color based on value
export function getScoreColor(score: number): string {
    if (score >= 70) return "#10b981";
    if (score >= 40) return "#f59e0b";
    return "#ef4444";
}

// Event icons
export const eventIcons: Record<string, string> = {
    jupiter_saturn_conjunction: "🌟",
    mercury_retrograde: "🌪️",
    full_moon: "🌕",
    new_moon: "🌑",
    waxing_crescent: "🌒",
    first_quarter: "🌓",
    waxing_gibbous: "🌔",
    waning_gibbous: "🌖",
    last_quarter: "🌗",
    waning_crescent: "🌘",
};

// Event names (multi-language)
export const eventNames: Record<string, { id: string; en: string; cn: string }> = {
    jupiter_saturn_conjunction: { id: "Konjungsi Jupiter-Saturnus", en: "Jupiter-Saturn Conjunction", cn: "木星-土星合相" },
    mercury_retrograde: { id: "Merkurius Retrograde", en: "Mercury Retrograde", cn: "水星逆行" },
    full_moon: { id: "Bulan Purnama", en: "Full Moon", cn: "满月" },
    new_moon: { id: "Bulan Baru", en: "New Moon", cn: "新月" },
    waxing_crescent: { id: "Bulan Sabit Awal", en: "Waxing Crescent", cn: "蛾眉月" },
    first_quarter: { id: "Kuartal Pertama", en: "First Quarter", cn: "上弦月" },
    waxing_gibbous: { id: "Bulan Cembung Bertambah", en: "Waxing Gibbous", cn: "盈凸月" },
    waning_gibbous: { id: "Bulan Cembung Berkurang", en: "Waning Gibbous", cn: "亏凸月" },
    last_quarter: { id: "Kuartal Terakhir", en: "Last Quarter", cn: "下弦月" },
    waning_crescent: { id: "Bulan Sabit Akhir", en: "Waning Crescent", cn: "残月" },
};
