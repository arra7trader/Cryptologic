// Cosmic Score mock data - In production this comes from backend calculations
import { CosmicScore } from "@/types";

// Generate cosmic score for a coin based on mock algorithm
export function generateCosmicScore(coinId: string): CosmicScore {
    // Mock scoring based on coin characteristics
    const scores: Record<string, CosmicScore> = {
        bitcoin: { coinId: "bitcoin", score: 78, trend: "Bullish", event: "jupiter_saturn_conjunction", volatilityAlert: false },
        ethereum: { coinId: "ethereum", score: 65, trend: "Bullish", event: "new_moon", volatilityAlert: false },
        solana: { coinId: "solana", score: 82, trend: "Bullish", event: "jupiter_saturn_conjunction", volatilityAlert: false },
        cardano: { coinId: "cardano", score: 45, trend: "Neutral", event: "mercury_retrograde", volatilityAlert: true },
        ripple: { coinId: "ripple", score: 58, trend: "Neutral", event: "full_moon", volatilityAlert: false },
        dogecoin: { coinId: "dogecoin", score: 35, trend: "Bearish", event: "mercury_retrograde", volatilityAlert: true },
        polkadot: { coinId: "polkadot", score: 72, trend: "Bullish", event: "new_moon", volatilityAlert: false },
        avalanche: { coinId: "avalanche-2", score: 68, trend: "Bullish", event: "jupiter_saturn_conjunction", volatilityAlert: false },
    };

    // Return existing or generate random for unknown coins
    if (scores[coinId]) {
        return scores[coinId];
    }

    // Generate deterministic score based on coin name hash
    const hash = coinId.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
    const score = 30 + (hash % 50); // Score between 30-80
    const trends: Array<"Bullish" | "Bearish" | "Neutral"> = ["Bullish", "Bearish", "Neutral"];
    const events = ["jupiter_saturn_conjunction", "mercury_retrograde", "full_moon", "new_moon"];

    return {
        coinId,
        score,
        trend: trends[hash % 3],
        event: events[hash % 4],
        volatilityAlert: hash % 5 === 0,
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
};

// Event names
export const eventNames: Record<string, { id: string; en: string }> = {
    jupiter_saturn_conjunction: { id: "Konjungsi Jupiter-Saturnus", en: "Jupiter-Saturn Conjunction" },
    mercury_retrograde: { id: "Merkurius Retrograde", en: "Mercury Retrograde" },
    full_moon: { id: "Bulan Purnama", en: "Full Moon" },
    new_moon: { id: "Bulan Baru", en: "New Moon" },
};
