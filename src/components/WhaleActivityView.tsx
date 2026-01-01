"use client";

import { colors } from "@/lib/constants";
import { ArrowLeftRight, TrendingUp, Wallet } from "lucide-react";

export default function WhaleActivityView() {
    return (
        <div style={{ marginTop: "16px" }}>
            {/* Net Flow Chart (Mock Visual) */}
            <div style={{ marginBottom: "24px" }}>
                <div style={{ fontSize: "13px", fontWeight: 600, color: colors.textPrimary, marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                    <ArrowLeftRight size={16} />
                    Exchange Net Flow (24h)
                </div>
                <div style={{ display: "flex", gap: "4px", height: "60px", alignItems: "flex-end" }}>
                    {[40, -20, 60, -10, 80, 30, -50, 20, 90, -30, 40, 50].map((val, i) => (
                        <div key={i} style={{
                            flex: 1,
                            background: val > 0 ? colors.accent : colors.red,
                            height: `${Math.abs(val)}%`,
                            borderRadius: "2px",
                            opacity: 0.7
                        }} />
                    ))}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px", fontSize: "11px", color: colors.textDim }}>
                    <span>Inflow (Sell Pressure)</span>
                    <span>Outflow (HODL)</span>
                </div>
            </div>

            {/* Large Transactions */}
            <div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: colors.textPrimary, marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                    <Wallet size={16} />
                    Recent Whale Transactions
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {[
                        { time: "2m ago", amount: "500 BTC", type: "Outflow", from: "Coinbase", to: "Wallet (Unknown)" },
                        { time: "15m ago", amount: "1,200 BTC", type: "Inflow", from: "Wallet (Whale)", to: "Binance" },
                        { time: "42m ago", amount: "350 BTC", type: "Outflow", from: "Kraken", to: "Wallet (Cold Storage)" },
                    ].map((tx, i) => (
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
                                    background: tx.type === "Outflow" ? colors.accentDim : "rgba(239, 68, 68, 0.15)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    color: tx.type === "Outflow" ? colors.accent : colors.red
                                }}>
                                    {tx.type === "Outflow" ? "OUT" : "IN"}
                                </div>
                                <div style={{ fontSize: "13px", color: colors.textPrimary }}>
                                    <div>{tx.amount}</div>
                                    <div style={{ fontSize: "11px", color: colors.textDim }}>{tx.type} • {tx.time}</div>
                                </div>
                            </div>
                            <div style={{ textAlign: "right", fontSize: "11px", color: colors.textSecondary }}>
                                <div>Alert: {tx.type === "Inflow" ? "Dump Risk" : "Accumulation"}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
