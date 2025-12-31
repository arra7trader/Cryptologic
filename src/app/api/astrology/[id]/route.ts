import { NextResponse } from "next/server";

// Fallback data in case astronomy-engine fails
function getFallbackAstrology(coinId: string, lang: string) {
    // Create deterministic values based on coin ID
    const hash = coinId.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const score = 45 + (hash % 30); // 45-75 range
    const trend = score >= 60 ? "Bullish" : score <= 40 ? "Bearish" : "Neutral";

    const factors = [
        { name: "Moon Phase", value: (hash % 10) - 5, description: "Waxing Gibbous" },
        { name: "Mercury", value: 0, description: "Direct ✓" },
        { name: "Jupiter", value: (hash % 3) === 0 ? 10 : 0, description: "in Gemini (Air)" },
        { name: "Saturn", value: 0, description: "in Pisces" },
        { name: "Mars", value: (hash % 4) === 0 ? 8 : 0, description: "in Cancer (Water)" },
        { name: "Venus", value: (hash % 5) === 0 ? 5 : 0, description: "in Capricorn (Earth)" },
        { name: "Sun-Moon", value: 0, description: "No major aspect" },
        { name: "Coin Energy", value: (hash % 11) - 5, description: "Unique coin signature" },
    ];

    const interpretations: Record<string, string> = {
        en: "Mixed cosmic signals suggest sideways movement. Overall market conditions are neutral with no major planetary events affecting the crypto market today.",
        id: "Sinyal kosmis yang bercampur menunjukkan pergerakan menyamping. Kondisi pasar keseluruhan netral tanpa peristiwa planet besar yang mempengaruhi pasar crypto hari ini.",
        cn: "混合的宇宙信号表明横向移动。整体市场状况中性，今天没有重大行星事件影响加密市场。"
    };

    return {
        breakdown: { factors, total: score, trend },
        interpretation: interpretations[lang] || interpretations.en,
        astroData: {
            moonPhase: 0.3,
            moonPhaseName: "Waxing Gibbous",
            mercuryRetrograde: false,
            keyEvent: "Waxing Gibbous",
        }
    };
}

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const url = new URL(req.url);
        const lang = url.searchParams.get("lang") || "en";

        // Try to use real astrology calculations
        try {
            const { getScoreBreakdown, getInterpretation, calculateAstrology } = await import("@/lib/astrology");

            const breakdown = getScoreBreakdown(id);
            const interpretation = getInterpretation(id, lang as 'en' | 'id' | 'cn');
            const astroData = calculateAstrology();

            return NextResponse.json({
                breakdown,
                interpretation,
                astroData: {
                    moonPhase: astroData.moonPhase,
                    moonPhaseName: astroData.moonPhaseName,
                    mercuryRetrograde: astroData.mercuryRetrograde,
                    keyEvent: astroData.keyEvent,
                }
            });
        } catch (astrologyError) {
            // If astronomy-engine fails, use fallback data
            console.warn("Astrology calculation failed, using fallback:", astrologyError);
            return NextResponse.json(getFallbackAstrology(id, lang));
        }
    } catch (error) {
        console.error("Astrology API error:", error);
        return NextResponse.json(
            { error: "Failed to calculate astrology data" },
            { status: 500 }
        );
    }
}
