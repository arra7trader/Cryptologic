import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const coin = searchParams.get("coin"); // e.g. 'bitcoin', 'shiba-inu'
    const address = searchParams.get("address"); // Contract address (e.g. for ERC20)

    if (!coin) {
        return NextResponse.json({ error: "Coin ID required" }, { status: 400 });
    }

    const etherscanKey = process.env.ETHERSCAN_API_KEY;

    try {
        let transactions = [];

        // 1. Ethereum & ERC-20 Tokens
        if (coin.toLowerCase() === "ethereum" || (address && address.length > 30)) {
            // Etherscan API
            const action = address ? "tokentx" : "txlist";
            const contractParam = address ? `&contractaddress=${address}` : `&address=0x00000000219ab540356cBB839Cbe05303d7705Fa`; // Use deposit contract if just generic ETH watch? Or just scan blocks. 
            // Better: For ETH itself, use scan blocks. For tokens, use tokentx.

            if (address) {
                // ERC-20 Token Transfers
                const res = await fetch(`https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${address}&page=1&offset=10&sort=desc&apikey=${etherscanKey}`);
                const data = await res.json();

                if (data.status === "1" && data.result) {
                    transactions = data.result
                        .filter((tx: any) => {
                            // Filter mostly small noise transactions? For now show all top 10 recent
                            return true;
                        })
                        .slice(0, 5)
                        .map((tx: any) => ({
                            hash: tx.hash,
                            from: tx.from,
                            to: tx.to,
                            value: (parseInt(tx.value) / Math.pow(10, parseInt(tx.tokenDecimal))).toFixed(2),
                            symbol: tx.tokenSymbol || "TOKEN",
                            time: new Date(parseInt(tx.timeStamp) * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        }));
                }
            } else if (coin.toLowerCase() === "ethereum") {
                // Native ETH Whale Watch (Block Scan)
                const blockRes = await fetch(`https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=latest&boolean=true&apikey=${etherscanKey}`);
                const blockData = await blockRes.json();

                if (blockData.result && blockData.result.transactions) {
                    transactions = blockData.result.transactions
                        .filter((tx: any) => (parseInt(tx.value, 16) / 1e18) > 5) // > 5 ETH
                        .slice(0, 5)
                        .map((tx: any) => ({
                            hash: tx.hash,
                            from: tx.from,
                            to: tx.to,
                            value: (parseInt(tx.value, 16) / 1e18).toFixed(2),
                            symbol: "ETH",
                            time: "Just now"
                        }));
                }
            }
        }
        // 2. Bitcoin
        else if (coin.toLowerCase() === "bitcoin") {
            const btcRes = await fetch("https://blockchain.info/unconfirmed-transactions?format=json");
            const btcData = await btcRes.json();

            if (btcData.txs) {
                transactions = btcData.txs
                    .sort((a: any, b: any) => {
                        const valA = a.out.reduce((acc: number, out: any) => acc + out.value, 0);
                        const valB = b.out.reduce((acc: number, out: any) => acc + out.value, 0);
                        return valB - valA;
                    })
                    .slice(0, 5)
                    .map((tx: any) => {
                        const totalVal = tx.out.reduce((acc: number, out: any) => acc + out.value, 0) / 100000000;
                        return {
                            hash: tx.hash,
                            from: "Multiple Inputs",
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
