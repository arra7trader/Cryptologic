import { NextResponse } from "next/server";

const COINGECKO_BASE = "https://api.coingecko.com/api/v3";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (!query || query.length < 2) {
        return NextResponse.json({ coins: [] });
    }

    try {
        // First, search for coins by name/symbol
        const searchResponse = await fetch(
            `${COINGECKO_BASE}/search?query=${encodeURIComponent(query)}`,
            { headers: { "Accept": "application/json" } }
        );

        if (!searchResponse.ok) {
            throw new Error("Search failed");
        }

        const searchData = await searchResponse.json();
        const coinIds = searchData.coins.slice(0, 15).map((c: { id: string }) => c.id);

        if (coinIds.length === 0) {
            return NextResponse.json({ coins: [] });
        }

        // Then fetch market data for those coins
        const marketsResponse = await fetch(
            `${COINGECKO_BASE}/coins/markets?vs_currency=usd&ids=${coinIds.join(",")}&order=market_cap_desc&sparkline=false`,
            { headers: { "Accept": "application/json" } }
        );

        if (!marketsResponse.ok) {
            // Return basic search results even without market data
            return NextResponse.json({
                coins: searchData.coins.slice(0, 15).map((c: any) => ({
                    id: c.id,
                    symbol: c.symbol,
                    name: c.name,
                    image: c.large || c.thumb,
                    current_price: 0,
                    price_change_percentage_24h: 0,
                    market_cap: c.market_cap_rank || 0,
                    market_cap_rank: c.market_cap_rank || 999,
                })),
            });
        }

        const coins = await marketsResponse.json();
        return NextResponse.json({ coins });
    } catch (error) {
        console.error("Search error:", error);
        return NextResponse.json({ error: "Search failed", coins: [] }, { status: 500 });
    }
}
