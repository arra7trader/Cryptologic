import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const coin = searchParams.get("coin"); // 'bitcoin' or 'ethereum' etc

    if (!coin) {
        return NextResponse.json({ error: "Coin ID required" }, { status: 400 });
    }

    const etherscanKey = process.env.ETHERSCAN_API_KEY;

    try {
        let transactions = [];

        if (coin.toLowerCase() === "ethereum") {
            // Fetch latest blocks to find large txs (simulating whale watch by scanning recent block)
            // Or use a specific "whale" address list if we had one. 
            // For simplified "Real" data, we can check the latest block for > 10 ETH transfers.

            const blockRes = await fetch(`https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=latest&boolean=true&apikey=${etherscanKey}`);
            const blockData = await blockRes.json();

            if (blockData.result && blockData.result.transactions) {
                const largeTxs = blockData.result.transactions
                    .filter((tx: any) => {
                        const valueEth = parseInt(tx.value, 16) / 1e18;
                        return valueEth > 5; // Filter for > 5 ETH for testing, higher for real "whales"
                    })
                    .slice(0, 5)
                    .map((tx: any) => ({
                        hash: tx.hash,
                        from: tx.from,
                        to: tx.to,
                        value: (parseInt(tx.value, 16) / 1e18).toFixed(2),
                        symbol: "ETH",
                        time: "Just now" // Block is latest
                    }));

                transactions = largeTxs;
            }
        } else if (coin.toLowerCase() === "bitcoin") {
            // Use Blockchain.info for BTC (No API key needed for basic)
            const btcRes = await fetch("https://blockchain.info/unconfirmed-transactions?format=json");
            const btcData = await btcRes.json();

            if (btcData.txs) {
                transactions = btcData.txs
                    .sort((a: any, b: any) => {
                        // Sort by output value
                        const valA = a.out.reduce((acc: number, out: any) => acc + out.value, 0);
                        const valB = b.out.reduce((acc: number, out: any) => acc + out.value, 0);
                        return valB - valA;
                    })
                    .slice(0, 5)
                    .map((tx: any) => {
                        const totalVal = tx.out.reduce((acc: number, out: any) => acc + out.value, 0) / 100000000;
                        return {
                            hash: tx.hash,
                            from: "Multiple Inputs", // Simplified
                            to: "Multiple Outputs",
                            value: totalVal.toFixed(2),
                            symbol: "BTC",
                            time: "Pending"
                        };
                    });
            }
        }

        return NextResponse.json({ transactions });

    } catch (error) {
        console.error("Whale API Error:", error);
        return NextResponse.json({ error: "Failed to fetch whale data" }, { status: 500 });
    }
}
