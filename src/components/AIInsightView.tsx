"use client";

import { colors } from "@/lib/constants";
import { Brain, TrendingUp, TrendingDown, Minus, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";

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

interface NewsArticle {
    id: string;
    title: string;
    url: string;
    body: string;
    source: string;
    published_on: number;
}

export default function AIInsightView({ coinName, priceChange24h, high24h, low24h }: { coinName: string, priceChange24h: number, high24h: number, low24h: number }) {
    const [loading, setLoading] = useState(true);
    const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
    const [articles, setArticles] = useState<NewsArticle[]>([]);

    useEffect(() => {
        const fetchIntelligence = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/intelligence/news?coin=${coinName}`);
                const data = await res.json();

                if (data.Data) {
                    setArticles(data.Data.slice(0, 3));

                    // Simple Local Sentiment Analysis based on headlines
                    let sentimentScore = 0;
                    const bullishKeywords = ["soar", "surge", "gain", "high", "bull", "rally", "adoption", "launch", "record", "ETF", "approve"];
                    const bearishKeywords = ["drop", "crash", "bear", "low", "ban", "hack", "scam", "plunge", "down", "fail", "lawsuit"];

                    data.Data.slice(0, 10).forEach((article: any) => {
                        const title = article.title.toLowerCase();
                        bullishKeywords.forEach(k => { if (title.includes(k)) sentimentScore++; });
                        bearishKeywords.forEach(k => { if (title.includes(k)) sentimentScore--; });
                    });

                    // Factor in price action
                    if (priceChange24h > 5) sentimentScore += 2;
                    if (priceChange24h < -5) sentimentScore -= 2;

                    const sentiment = sentimentScore > 0 ? "Bullish" : sentimentScore < 0 ? "Bearish" : "Neutral";
                    const confidence = Math.min(Math.abs(sentimentScore) * 10 + 50, 95);

                    setAnalysis({
                        sentiment,
                        confidence,
                        summary: `Recent news indicates a ${sentiment.toLowerCase()} trend. Key drivers include recent headlines from ${data.Data[0].source_info.name} and market movements.`,
                        keyLevels: {
                            support: low24h,
                            resistance: high24h
                        },
                        signals: [
                            `News Sentiment: ${sentiment}`,
                            priceChange24h > 0 ? "Price Momentum: Positive" : "Price Momentum: Negative"
                        ]
                    });
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        fetchIntelligence();
    }, [coinName, priceChange24h, high24h, low24h]);

    if (loading) return <div style={{ color: colors.textDim, fontSize: "13px", padding: "20px" }}>Analyzing market data...</div>;
    if (!analysis) return <div style={{ color: colors.textDim, fontSize: "13px", padding: "20px" }}>Analysis unavailable.</div>;

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
                        background: analysis.sentiment === "Bullish" ? colors.accentDim : analysis.sentiment === "Bearish" ? "rgba(239, 68, 68, 0.15)" : colors.bgCard,
                        color: analysis.sentiment === "Bullish" ? colors.accent : analysis.sentiment === "Bearish" ? colors.red : colors.textDim,
                        fontSize: "12px",
                        fontWeight: 600
                    }}>
                        {analysis.sentiment} ({analysis.confidence}%)
                    </div>
                </div>
                <p style={{ fontSize: "14px", color: colors.textSecondary, lineHeight: "1.6" }}>
                    {analysis.summary}
                </p>
                {articles.length > 0 && (
                    <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: `1px solid ${colors.border}` }}>
                        <div style={{ fontSize: "11px", fontWeight: 600, color: colors.textDim, marginBottom: "8px", textTransform: "uppercase" }}>Sources</div>
                        {articles.map(article => (
                            <a key={article.id} href={article.url} target="_blank" rel="noopener noreferrer" style={{ display: "block", fontSize: "13px", color: colors.purple, marginBottom: "4px", textDecoration: "none" }}>
                                • {article.title}
                            </a>
                        ))}
                    </div>
                )}
            </div>

            {/* Key Signals Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div style={{
                    padding: "16px",
                    background: colors.bg,
                    borderRadius: "12px",
                    border: `1px solid ${colors.border}`
                }}>
                    <div style={{ fontSize: "12px", color: colors.textDim, marginBottom: "8px" }}>Detected Signals</div>
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
                    <div style={{ fontSize: "12px", color: colors.textDim, marginBottom: "8px" }}>Key Levels (24h)</div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                        <span style={{ fontSize: "13px", color: colors.textSecondary }}>Resistance</span>
                        <span style={{ fontSize: "13px", fontWeight: 600, color: colors.red }}>${analysis.keyLevels.resistance.toLocaleString()}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontSize: "13px", color: colors.textSecondary }}>Support</span>
                        <span style={{ fontSize: "13px", fontWeight: 600, color: colors.accent }}>${analysis.keyLevels.support.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
