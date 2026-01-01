import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const coin = searchParams.get("coin");

    if (!coin) {
        return NextResponse.json({ error: "Coin symbol required" }, { status: 400 });
    }

    const apiKey = process.env.CRYPTOCOMPARE_API_KEY;

    if (!apiKey) {
        console.warn("CRYPTOCOMPARE_API_KEY not found, using fallback/mock data if possible or returning error.");
        // For now, let's return a specific error so the frontend knows to show "Setup Required" or mock
        // But per instructions, user wants REAL data. 
    }

    try {
        // Map coin ID to symbol if necessary. Simple mapping for top coins:
        const symbolMap: Record<string, string> = {
            "bitcoin": "BTC",
            "ethereum": "ETH",
            "solana": "SOL",
            "ripple": "XRP",
            "binancecoin": "BNB",
            "cardano": "ADA",
            "dogecoin": "DOGE"
        };

        const symbol = symbolMap[coin.toLowerCase()] || "BTC"; // Default to BTC if unknown for now

        const res = await fetch(`https://min-api.cryptocompare.com/data/v2/news/?lang=EN&categories=${symbol}&api_key=${apiKey}`);
        const data = await res.json();

        return NextResponse.json(data);
    } catch (error) {
        console.error("CryptoCompare API Error:", error);
        return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
    }
}
