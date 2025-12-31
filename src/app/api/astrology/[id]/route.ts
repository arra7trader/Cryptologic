import { NextResponse } from "next/server";
import { getScoreBreakdown, getInterpretation, calculateAstrology, AstrologyData } from "@/lib/astrology";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const url = new URL(req.url);
        const lang = url.searchParams.get("lang") || "en";

        // Calculate astrology data server-side
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
    } catch (error) {
        console.error("Astrology error:", error);
        return NextResponse.json(
            { error: "Failed to calculate astrology data" },
            { status: 500 }
        );
    }
}
