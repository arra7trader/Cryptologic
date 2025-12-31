import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { db } from "@/lib/db";

// GET /api/watchlist - Get user's watchlist
export async function GET(req: Request) {
    const token = req.headers.get("cookie")?.split("; ").find(c => c.startsWith("token="))?.split("=")[1];

    if (!token) {
        return NextResponse.json({ watchlist: [] });
    }

    const payload = await verifyToken(token);
    if (!payload) {
        return NextResponse.json({ watchlist: [] });
    }

    try {
        const result = await db.execute({
            sql: "SELECT coin_id FROM watchlist WHERE user_id = ? ORDER BY added_at DESC",
            args: [payload.userId as string],
        });

        const watchlist = result.rows.map(row => row.coin_id as string);
        return NextResponse.json({ watchlist });
    } catch (error) {
        console.error("Get watchlist error:", error);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}

// POST /api/watchlist - Add coin to watchlist
export async function POST(req: Request) {
    const token = req.headers.get("cookie")?.split("; ").find(c => c.startsWith("token="))?.split("=")[1];

    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { coinId } = await req.json();

        if (!coinId) {
            return NextResponse.json({ error: "coinId required" }, { status: 400 });
        }

        // Check if already in watchlist
        const existing = await db.execute({
            sql: "SELECT id FROM watchlist WHERE user_id = ? AND coin_id = ?",
            args: [payload.userId as string, coinId],
        });

        if (existing.rows.length > 0) {
            return NextResponse.json({ success: true, message: "Already in watchlist" });
        }

        // Check limit (max 20)
        const count = await db.execute({
            sql: "SELECT COUNT(*) as count FROM watchlist WHERE user_id = ?",
            args: [payload.userId as string],
        });

        if ((count.rows[0].count as number) >= 20) {
            return NextResponse.json({ error: "Watchlist limit reached (max 20)" }, { status: 400 });
        }

        await db.execute({
            sql: "INSERT INTO watchlist (user_id, coin_id) VALUES (?, ?)",
            args: [payload.userId as string, coinId],
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Add to watchlist error:", error);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}

// DELETE /api/watchlist - Remove coin from watchlist
export async function DELETE(req: Request) {
    const token = req.headers.get("cookie")?.split("; ").find(c => c.startsWith("token="))?.split("=")[1];

    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { coinId } = await req.json();

        if (!coinId) {
            return NextResponse.json({ error: "coinId required" }, { status: 400 });
        }

        await db.execute({
            sql: "DELETE FROM watchlist WHERE user_id = ? AND coin_id = ?",
            args: [payload.userId as string, coinId],
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Remove from watchlist error:", error);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}
