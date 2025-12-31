import { NextResponse } from "next/server";

const COINGECKO_API = "https://api.coingecko.com/api/v3";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Fetch coin details with market data and sparkline
        const response = await fetch(
            `${COINGECKO_API}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`,
            {
                headers: {
                    "Accept": "application/json",
                },
                next: { revalidate: 300 }, // Cache for 5 minutes
            }
        );

        if (!response.ok) {
            if (response.status === 404) {
                return NextResponse.json({ error: "Coin not found" }, { status: 404 });
            }
            throw new Error(`CoinGecko API error: ${response.status}`);
        }

        const data = await response.json();

        // Extract relevant data
        const coinDetail = {
            id: data.id,
            symbol: data.symbol,
            name: data.name,
            image: data.image?.large || data.image?.small,
            description: data.description?.en?.split('.')[0] || "", // First sentence only
            market_data: {
                current_price: data.market_data?.current_price?.usd || 0,
                price_change_24h: data.market_data?.price_change_percentage_24h || 0,
                price_change_7d: data.market_data?.price_change_percentage_7d || 0,
                price_change_30d: data.market_data?.price_change_percentage_30d || 0,
                market_cap: data.market_data?.market_cap?.usd || 0,
                total_volume: data.market_data?.total_volume?.usd || 0,
                high_24h: data.market_data?.high_24h?.usd || 0,
                low_24h: data.market_data?.low_24h?.usd || 0,
                ath: data.market_data?.ath?.usd || 0,
                ath_change_percentage: data.market_data?.ath_change_percentage?.usd || 0,
                circulating_supply: data.market_data?.circulating_supply || 0,
                max_supply: data.market_data?.max_supply || null,
            },
            sparkline_7d: data.market_data?.sparkline_7d?.price || [],
            genesis_date: data.genesis_date,
            market_cap_rank: data.market_cap_rank,
        };

        return NextResponse.json({ coin: coinDetail });
    } catch (error) {
        console.error("Coin detail error:", error);
        return NextResponse.json(
            { error: "Failed to fetch coin details" },
            { status: 500 }
        );
    }
}
