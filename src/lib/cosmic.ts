/**
 * Cosmic Score - Client-safe version
 * Uses deterministic algorithm instead of astronomy-engine (which requires Node.js)
 * Real astrology calculations are done server-side via /api/astrology/[id]
 */

import { CosmicScore } from "@/types";

// Generate a deterministic hash from coin ID and date
function hashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash = hash & hash;
    }
    return Math.abs(hash);
}

/**
 * Generate cosmic score for a coin - client-safe version
 * Uses date-based deterministic algorithm for consistent display
 * Actual astrology data is fetched separately via API when needed
 */
export function generateCosmicScore(coinId: string): CosmicScore {
    // Create deterministic score based on coin ID and current date
    const dateStr = new Date().toDateString();
    const seed = hashCode(coinId + dateStr);

    // Generate score between 30-90
    const score = 30 + (seed % 61);

    // Determine trend
    let trend: "Bullish" | "Bearish" | "Neutral";
    if (score >= 60) trend = "Bullish";
    else if (score <= 40) trend = "Bearish";
    else trend = "Neutral";

    // Determine event based on seed
    const events = ["jupiter_saturn_conjunction", "mercury_retrograde", "full_moon", "new_moon"];
    const event = events[seed % 4];

    // Volatility alert for extreme scores or retrograde
    const volatilityAlert = event === "mercury_retrograde" || score < 35 || score > 85;

    return {
        coinId,
        score,
        trend,
        event,
        volatilityAlert,
    };
}

/**
 * Get current global astrological event (client-safe placeholder)
 * Real data should be fetched from /api/astrology/[id]
 */
export function getGlobalAstrology(): { keyEvent: string; moonPhaseName: string } {
    const dateStr = new Date().toDateString();
    const seed = hashCode(dateStr);
    const events = ["New Moon", "Waxing Crescent", "First Quarter", "Full Moon"];
    return {
        moonPhaseName: events[seed % 4],
        keyEvent: events[seed % 4],
    };
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
