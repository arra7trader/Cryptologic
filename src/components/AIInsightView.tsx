"use client";

import { colors } from "@/lib/constants";
import { Brain, TrendingUp, TrendingDown, Minus, AlertTriangle } from "lucide-react";
import { formatPercentage } from "@/lib/coingecko";

// Types
interface AIAnalysis {
    sentiment: "Bullish" | "Bearish" | "Neutral";
    confidence: number;
    summary: string;
    keyLevels: {
        support: number;
        resistance: number;
    };
    signals: string[];
}

// Mock generator based on price change
const generateAnalysis = (coinName: string, priceChange24h: number): AIAnalysis => {
    const isBullish = priceChange24h > 0;
    const intensity = Math.min(Math.abs(priceChange24h) * 10, 95); // simple mock logic

    let summary = "";
    if (isBullish) {
        summary = `${coinName} is showing strong momentum driven by high buying pressure on major exchanges. Technical indicators suggest a breakout from recent consolidation zones.`;
    } else {
        summary = `${coinName} is facing resistance and profit-taking after recent moves. Sell pressure is observed from mid-sized wallets, suggesting a short-term correction.`;
    }

    return {
        sentiment: isBullish ? "Bullish" : "Bearish",
        confidence: Math.floor(intensity),
        summary,
        keyLevels: {
            support: 45000,
            resistance: 48000
        },
        signals: [
            isBullish ? "RSI Divergence (Bullish)" : "MACD Crossover (Bearish)",
            "Whale Accumulation detected",
            "Exchange Outflow increasing"
        ]
    };
};

export default function AIInsightView({ coinName, priceChange24h }: { coinName: string, priceChange24h: number }) {
    const analysis = generateAnalysis(coinName, priceChange24h);

    return (
        <div style={{ marginTop: "16px" }}>
            {/* Header Sentiment */}
            <div style={{
                background: colors.bgHover,
                padding: "20px",
                borderRadius: "12px",
                marginBottom: "20px",
                border: `1px solid ${colors.border}`
            }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <Brain size={20} style={{ color: colors.accent }} />
                        <span style={{ fontSize: "14px", fontWeight: 600, color: colors.textPrimary }}>AI Market Analyst</span>
                    </div>
                    <div style={{
                        padding: "4px 12px",
                        borderRadius: "100px",
                        background: analysis.sentiment === "Bullish" ? colors.accentDim : "rgba(239, 68, 68, 0.15)",
                        color: analysis.sentiment === "Bullish" ? colors.accent : colors.red,
                        fontSize: "12px",
                        fontWeight: 600
                    }}>
                        {analysis.sentiment} ({analysis.confidence}%)
                    </div>
                </div>
                <p style={{ fontSize: "14px", color: colors.textSecondary, lineHeight: "1.6" }}>
                    {analysis.summary}
                </p>
            </div>

            {/* Key Signals Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
                <div style={{
                    padding: "16px",
                    background: colors.bg,
                    borderRadius: "12px",
                    border: `1px solid ${colors.border}`
                }}>
                    <div style={{ fontSize: "12px", color: colors.textDim, marginBottom: "8px" }}>Technical Signals</div>
                    {analysis.signals.map((signal, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px", fontSize: "13px", color: colors.textPrimary }}>
                            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: colors.accent }}></div>
                            {signal}
                        </div>
                    ))}
                </div>

                <div style={{
                    padding: "16px",
                    background: colors.bg,
                    borderRadius: "12px",
                    border: `1px solid ${colors.border}`
                }}>
                    <div style={{ fontSize: "12px", color: colors.textDim, marginBottom: "8px" }}>Projections</div>
                    <div style={{ fontSize: "13px", color: colors.textPrimary, display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                        <span>Support</span>
                        <span style={{ color: colors.textSecondary }}>$45,200</span>
                    </div>
                    <div style={{ fontSize: "13px", color: colors.textPrimary, display: "flex", justifyContent: "space-between" }}>
                        <span>Resistance</span>
                        <span style={{ color: colors.textSecondary }}>$48,500</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
