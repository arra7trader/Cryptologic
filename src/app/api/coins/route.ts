import { NextResponse } from "next/server";

const COINGECKO_BASE = "https://api.coingecko.com/api/v3";

// Cache for rate limiting
let lastFetch: { time: number; data: any } | null = null;
const CACHE_DURATION = 60000; // 1 minute cache

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const ids = searchParams.get("ids"); // comma-separated coin IDs
    const limit = parseInt(searchParams.get("limit") || "20");

    try {
        // Check cache for top coins request
        if (!ids && lastFetch && Date.now() - lastFetch.time < CACHE_DURATION) {
            return NextResponse.json({ coins: lastFetch.data });
        }

        let url: string;
        if (ids) {
            // Fetch specific coins
            url = `${COINGECKO_BASE}/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&sparkline=false`;
        } else {
            // Fetch top coins
            url = `${COINGECKO_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`;
        }

        const response = await fetch(url, {
            headers: {
                "Accept": "application/json",
            },
        });

        if (!response.ok) {
            // Rate limited or error - return cached data if available
            if (lastFetch) {
                return NextResponse.json({ coins: lastFetch.data, cached: true });
            }
            throw new Error(`CoinGecko API error: ${response.status}`);
        }

        const coins = await response.json();

        // Cache for top coins
        if (!ids) {
            lastFetch = { time: Date.now(), data: coins };
        }

        return NextResponse.json({ coins });
    } catch (error) {
        console.error("CoinGecko fetch error:", error);

        // Return cached data on error
        if (lastFetch) {
            return NextResponse.json({ coins: lastFetch.data, cached: true, error: "Using cached data" });
        }

        return NextResponse.json({ error: "Failed to fetch coins", coins: [] }, { status: 500 });
    }
}
