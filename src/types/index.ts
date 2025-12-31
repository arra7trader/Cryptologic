// Types for Cryptologic
export interface Coin {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    price_change_percentage_24h: number;
    market_cap: number;
    market_cap_rank: number;
}

export interface CosmicScore {
    coinId: string;
    score: number;
    trend: "Bullish" | "Bearish" | "Neutral";
    event: string;
    volatilityAlert: boolean;
}

export interface User {
    id: string;
    email: string;
    name: string;
    tier: "lite" | "pro" | "enterprise";
    subscriptionEnd?: string;
}

export interface WatchlistItem {
    coinId: string;
    addedAt: string;
}

export interface AstroEvent {
    id: string;
    date: string;
    type: string;
    titleId: string;
    titleEn: string;
    impactLevel: "High" | "Medium" | "Low";
}
