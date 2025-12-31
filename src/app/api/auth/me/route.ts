import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(req: Request) {
    const token = req.headers.get("cookie")?.split("; ").find(c => c.startsWith("token="))?.split("=")[1];

    if (!token) {
        return NextResponse.json({ user: null });
    }

    const payload = await verifyToken(token);

    if (!payload) {
        return NextResponse.json({ user: null });
    }

    // Optional: Fetch fresh user data from DB to get latest tier
    const result = await db.execute({
        sql: "SELECT id, email, name, tier FROM users WHERE id = ?",
        args: [payload.userId as string],
    });

    if (result.rows.length === 0) {
        return NextResponse.json({ user: null });
    }

    return NextResponse.json({ user: result.rows[0] });
}
