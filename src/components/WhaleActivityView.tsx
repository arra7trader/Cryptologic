"use client";

import { colors } from "@/lib/constants";
import { ArrowLeftRight, TrendingUp, Wallet, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { useState, useEffect } from "react";

export default function WhaleActivityView({ coinName, coinId, platforms }: { coinName?: string, coinId?: string, platforms?: Record<string, string> }) {
    const [transactions, setTransactions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWhales = async () => {
            setLoading(true);
            try {
                // Prioritize Ethereum contract address if available (for ERC20 support)
                const ethAddress = platforms?.ethereum || "";

                const res = await fetch(`/api/intelligence/whales?coin=${coinId || "bitcoin"}&address=${ethAddress}`);
                const data = await res.json();
                if (data.transactions) {
                    setTransactions(data.transactions);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        fetchWhales();
    }, [coinName]);

    if (loading) return <div style={{ color: colors.textDim, fontSize: "13px", padding: "20px" }}>Tracking large movements...</div>;

    return (
        <div style={{ marginTop: "16px" }}>
            {/* Header */}
            <div style={{ fontSize: "13px", fontWeight: 600, color: colors.textPrimary, marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                <Wallet size={16} />
                Real-Time Whale Transactions
            </div>

            {/* List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {transactions.length === 0 ? (
                    <div style={{ color: colors.textDim, fontSize: "13px", fontStyle: "italic" }}>No recent whale movements detected.</div>
                ) : (
                    transactions.map((tx, i) => (
                        <div key={i} style={{
                            padding: "12px",
                            background: colors.bg,
                            borderRadius: "8px",
                            border: `1px solid ${colors.border}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}>
                            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                <div style={{
                                    width: "32px", height: "32px", borderRadius: "50%",
                                    background: colors.bgHover,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    color: colors.textDim
                                }}>
                                    {tx.symbol === "BTC" ? "₿" : "Ξ"}
                                </div>
                                <div style={{ fontSize: "13px", color: colors.textPrimary }}>
                                    <div style={{ fontWeight: 600 }}>{tx.value} {tx.symbol}</div>
                                    <div style={{ fontSize: "11px", color: colors.textDim }}>{tx.time}</div>
                                </div>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                <a href={tx.symbol === "ETH" ? `https://etherscan.io/tx/${tx.hash}` : `https://www.blockchain.com/btc/tx/${tx.hash}`} target="_blank" rel="noopener noreferrer" style={{ color: colors.purple, fontSize: "11px", textDecoration: "none" }}>
                                    View
                                </a>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <p style={{ marginTop: "16px", fontSize: "11px", color: colors.textDim, textAlign: "center" }}>
                Showing transactions &gt; $100k value
            </p>
        </div>
    );
}
