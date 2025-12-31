import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { db } from "@/lib/db";

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
        // Update user tier to PRO
        await db.execute({
            sql: "UPDATE users SET tier = 'pro' WHERE id = ?",
            args: [payload.userId as string],
        });

        return NextResponse.json({ success: true, tier: "pro" });
    } catch (error) {
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}
