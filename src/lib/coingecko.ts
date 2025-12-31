// CoinGecko API utilities
import { Coin } from "@/types";

const COINGECKO_BASE = "https://api.coingecko.com/api/v3";

// Fetch top coins by market cap
export async function fetchTopCoins(limit: number = 50): Promise<Coin[]> {
    try {
        const response = await fetch(
            `${COINGECKO_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`,
            { next: { revalidate: 300 } } // Cache for 5 minutes
        );

        if (!response.ok) {
            throw new Error("Failed to fetch coins");
        }

        return response.json();
    } catch (error) {
        console.error("CoinGecko API error:", error);
        return [];
    }
}

// Search coins
export async function searchCoins(query: string): Promise<Coin[]> {
    if (!query || query.length < 2) return [];

    try {
        // First search for coin IDs
        const searchResponse = await fetch(
            `${COINGECKO_BASE}/search?query=${encodeURIComponent(query)}`
        );

        if (!searchResponse.ok) {
            throw new Error("Search failed");
        }

        const searchData = await searchResponse.json();
        const coinIds = searchData.coins.slice(0, 10).map((c: { id: string }) => c.id);

        if (coinIds.length === 0) return [];

        // Then fetch market data for those coins
        const marketsResponse = await fetch(
            `${COINGECKO_BASE}/coins/markets?vs_currency=usd&ids=${coinIds.join(",")}&order=market_cap_desc&sparkline=false`
        );

        if (!marketsResponse.ok) {
            throw new Error("Failed to fetch market data");
        }

        return marketsResponse.json();
    } catch (error) {
        console.error("Search error:", error);
        return [];
    }
}

// Fetch single coin details
export async function fetchCoinDetails(coinId: string): Promise<Coin | null> {
    try {
        const response = await fetch(
            `${COINGECKO_BASE}/coins/markets?vs_currency=usd&ids=${coinId}&sparkline=false`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch coin");
        }

        const coins = await response.json();
        return coins[0] || null;
    } catch (error) {
        console.error("Fetch coin error:", error);
        return null;
    }
}

// Format currency
export function formatCurrency(value: number | null | undefined): string {
    if (value === null || value === undefined) return "$0.00";
    if (value >= 1000000000) {
        return `$${(value / 1000000000).toFixed(2)}B`;
    }
    if (value >= 1000000) {
        return `$${(value / 1000000).toFixed(2)}M`;
    }
    if (value >= 1000) {
        return `$${(value / 1000).toFixed(2)}K`;
    }
    if (value >= 1) {
        return `$${value.toFixed(2)}`;
    }
    return `$${value.toFixed(6)}`;
}

// Format percentage
export function formatPercentage(value: number | null | undefined): string {
    if (value === null || value === undefined) return "0.00%";
    const sign = value >= 0 ? "+" : "";
    return `${sign}${value.toFixed(2)}%`;
}
