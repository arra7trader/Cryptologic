"use client";

import { useState, useEffect } from "react";
import { X, TrendingUp, TrendingDown, Minus, Loader2 } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { formatCurrency, formatPercentage } from "@/lib/coingecko";

const colors = {
    bg: "#0a0a0b",
    bgCard: "#131316",
    bgHover: "#1a1a1f",
    border: "rgba(255,255,255,0.08)",
    textPrimary: "#f5f5f7",
    textSecondary: "#9898a0",
    textDim: "#5c5c66",
    accent: "#10b981",
    purple: "#8b5cf6",
    red: "#ef4444",
    amber: "#f59e0b",
};

interface CoinDetail {
    id: string;
    symbol: string;
    name: string;
    image: string;
    market_data: {
        current_price: number;
        price_change_24h: number;
        price_change_7d: number;
        price_change_30d: number;
        market_cap: number;
        total_volume: number;
        high_24h: number;
        low_24h: number;
    };
    sparkline_7d: number[];
}

interface AstrologyInfo {
    breakdown: {
        factors: Array<{ name: string; value: number; description: string }>;
        total: number;
        trend: string;
    };
    interpretation: string;
    astroData: {
        moonPhaseName: string;
        mercuryRetrograde: boolean;
        keyEvent: string;
    };
}

interface CoinDetailModalProps {
    coinId: string;
    onClose: () => void;
}

// Simple sparkline chart component
function SparklineChart({ data, color }: { data: number[]; color: string }) {
    if (!data || data.length === 0) return null;

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const width = 100;
    const height = 50;

    const points = data.map((value, index) => {
        const x = (index / (data.length - 1)) * width;
        const y = height - ((value - min) / range) * height;
        return `${x},${y}`;
    }).join(" ");

    return (
        <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
            <polyline
                fill="none"
                stroke={color}
                strokeWidth="1.5"
                points={points}
            />
        </svg>
    );
}

export default function CoinDetailModal({ coinId, onClose }: CoinDetailModalProps) {
    const { language } = useLanguage();
    const [loading, setLoading] = useState(true);
    const [coin, setCoin] = useState<CoinDetail | null>(null);
    const [astrology, setAstrology] = useState<AstrologyInfo | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchData();
    }, [coinId]);

    const fetchData = async () => {
        try {
            setLoading(true);

            // Fetch both coin details and astrology data in parallel
            const [coinRes, astroRes] = await Promise.all([
                fetch(`/api/coins/${coinId}`),
                fetch(`/api/astrology/${coinId}?lang=${language}`)
            ]);

            const coinData = await coinRes.json();
            const astroData = await astroRes.json();

            if (coinData.coin) {
                setCoin(coinData.coin);
            } else {
                setError("Failed to load coin details");
            }

            if (astroData.breakdown) {
                setAstrology(astroData);
            }
        } catch (e) {
            setError("Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    const getScoreColor = (score: number) => {
        if (score >= 60) return colors.accent;
        if (score <= 40) return colors.red;
        return colors.amber;
    };

    const getTrendIcon = () => {
        if (!astrology) return <Minus size={16} />;
        if (astrology.breakdown.trend === "Bullish") return <TrendingUp size={16} />;
        if (astrology.breakdown.trend === "Bearish") return <TrendingDown size={16} />;
        return <Minus size={16} />;
    };

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.85)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
                padding: "20px",
            }}
            onClick={onClose}
        >
            <div
                style={{
                    background: colors.bgCard,
                    border: `1px solid ${colors.border}`,
                    borderRadius: "20px",
                    width: "100%",
                    maxWidth: "600px",
                    maxHeight: "90vh",
                    overflow: "auto",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "20px 24px",
                        borderBottom: `1px solid ${colors.border}`,
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        {coin && (
                            <img src={coin.image} alt={coin.name} style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
                        )}
                        <div>
                            <h2 style={{ fontSize: "18px", fontWeight: 600, color: colors.textPrimary }}>
                                {coin?.name || "Loading..."}
                            </h2>
                            <span style={{ fontSize: "12px", color: colors.textDim, textTransform: "uppercase" }}>
                                {coin?.symbol}
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: "transparent",
                            border: "none",
                            color: colors.textDim,
                            cursor: "pointer",
                            padding: "8px",
                        }}
                    >
                        <X size={20} />
                    </button>
                </div>

                {loading ? (
                    <div style={{ padding: "60px", textAlign: "center" }}>
                        <Loader2 size={32} style={{ color: colors.accent, animation: "spin 1s linear infinite" }} />
                    </div>
                ) : error ? (
                    <div style={{ padding: "40px", textAlign: "center", color: colors.red }}>{error}</div>
                ) : coin && (
                    <div style={{ padding: "24px" }}>
                        {/* Price & Chart */}
                        <div style={{ marginBottom: "24px" }}>
                            <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "8px" }}>
                                <span style={{ fontSize: "28px", fontWeight: 700, color: colors.textPrimary }}>
                                    {formatCurrency(coin.market_data.current_price)}
                                </span>
                                <span style={{
                                    fontSize: "14px",
                                    color: coin.market_data.price_change_24h >= 0 ? colors.accent : colors.red,
                                }}>
                                    {formatPercentage(coin.market_data.price_change_24h)}
                                </span>
                            </div>
                            <div style={{ padding: "12px 0" }}>
                                <SparklineChart
                                    data={coin.sparkline_7d}
                                    color={coin.market_data.price_change_7d >= 0 ? colors.accent : colors.red}
                                />
                            </div>
                            <div style={{ fontSize: "11px", color: colors.textDim, textAlign: "center" }}>
                                7-Day Price Chart
                            </div>
                        </div>

                        {/* Cosmic Score */}
                        {astrology && (
                            <div style={{
                                background: colors.bg,
                                border: `1px solid ${colors.border}`,
                                borderRadius: "12px",
                                padding: "20px",
                                marginBottom: "16px",
                            }}>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                                    <span style={{ fontSize: "12px", fontWeight: 600, color: colors.textDim, textTransform: "uppercase" }}>
                                        Cosmic Score™
                                    </span>
                                    <div style={{ display: "flex", alignItems: "center", gap: "6px", color: getScoreColor(astrology.breakdown.total) }}>
                                        {getTrendIcon()}
                                        <span style={{ fontSize: "13px", fontWeight: 600 }}>{astrology.breakdown.trend}</span>
                                    </div>
                                </div>

                                {/* Score Bar */}
                                <div style={{ marginBottom: "20px" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                                        <span style={{ fontSize: "24px", fontWeight: 700, color: getScoreColor(astrology.breakdown.total) }}>
                                            {astrology.breakdown.total}
                                        </span>
                                        <span style={{ fontSize: "14px", color: colors.textDim }}>/100</span>
                                    </div>
                                    <div style={{ height: "6px", background: colors.bgHover, borderRadius: "3px", overflow: "hidden" }}>
                                        <div
                                            style={{
                                                width: `${astrology.breakdown.total}%`,
                                                height: "100%",
                                                background: getScoreColor(astrology.breakdown.total),
                                                borderRadius: "3px",
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Factor Breakdown */}
                                <div style={{ fontSize: "12px" }}>
                                    <div style={{ color: colors.textDim, marginBottom: "8px", fontWeight: 600 }}>Score Breakdown:</div>
                                    {astrology.breakdown.factors.map((factor, i) => (
                                        <div key={i} style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            padding: "6px 0",
                                            borderBottom: i < astrology.breakdown.factors.length - 1 ? `1px solid ${colors.border}` : "none",
                                        }}>
                                            <span style={{ color: colors.textSecondary }}>
                                                {factor.name}: <span style={{ color: colors.textDim }}>{factor.description}</span>
                                            </span>
                                            <span style={{
                                                color: factor.value > 0 ? colors.accent : factor.value < 0 ? colors.red : colors.textDim,
                                                fontWeight: 600,
                                            }}>
                                                {factor.value > 0 ? `+${factor.value}` : factor.value}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Technical Analysis */}
                        <div style={{
                            background: colors.bg,
                            border: `1px solid ${colors.border}`,
                            borderRadius: "12px",
                            padding: "20px",
                            marginBottom: "16px",
                        }}>
                            <div style={{ fontSize: "12px", fontWeight: 600, color: colors.textDim, textTransform: "uppercase", marginBottom: "12px" }}>
                                Technical Analysis
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", fontSize: "13px" }}>
                                <div>
                                    <span style={{ color: colors.textDim }}>24h Change</span>
                                    <div style={{ color: coin.market_data.price_change_24h >= 0 ? colors.accent : colors.red, fontWeight: 600 }}>
                                        {formatPercentage(coin.market_data.price_change_24h)}
                                    </div>
                                </div>
                                <div>
                                    <span style={{ color: colors.textDim }}>7d Change</span>
                                    <div style={{ color: coin.market_data.price_change_7d >= 0 ? colors.accent : colors.red, fontWeight: 600 }}>
                                        {formatPercentage(coin.market_data.price_change_7d)}
                                    </div>
                                </div>
                                <div>
                                    <span style={{ color: colors.textDim }}>Market Cap</span>
                                    <div style={{ color: colors.textPrimary, fontWeight: 600 }}>
                                        {formatCurrency(coin.market_data.market_cap)}
                                    </div>
                                </div>
                                <div>
                                    <span style={{ color: colors.textDim }}>Volume 24h</span>
                                    <div style={{ color: colors.textPrimary, fontWeight: 600 }}>
                                        {formatCurrency(coin.market_data.total_volume)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Astrological Interpretation */}
                        {astrology && (
                            <div style={{
                                background: colors.bg,
                                border: `1px solid ${colors.border}`,
                                borderRadius: "12px",
                                padding: "20px",
                            }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                                    <span style={{ fontSize: "16px" }}>🔮</span>
                                    <span style={{ fontSize: "12px", fontWeight: 600, color: colors.textDim, textTransform: "uppercase" }}>
                                        Astrological Interpretation
                                    </span>
                                </div>
                                <p style={{ fontSize: "13px", color: colors.textSecondary, lineHeight: 1.7 }}>
                                    {astrology.interpretation}
                                </p>
                                <div style={{ marginTop: "16px", padding: "10px 12px", background: colors.bgHover, borderRadius: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
                                    <span style={{ fontSize: "16px" }}>
                                        {astrology.astroData.moonPhaseName === "New Moon" ? "🌑" :
                                            astrology.astroData.moonPhaseName === "Full Moon" ? "🌕" :
                                                astrology.astroData.mercuryRetrograde ? "🌪️" : "🌙"}
                                    </span>
                                    <span style={{ fontSize: "12px", color: colors.textSecondary }}>
                                        Today: {astrology.astroData.keyEvent}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
