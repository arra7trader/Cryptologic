import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Middleware to check admin
function isAdmin(req: Request): boolean {
    const cookie = req.headers.get("cookie");
    return cookie?.includes("admin_token=cryptologic_admin_session_2024") || false;
}

// GET /api/admin/users - Get all users with full credentials
export async function GET(req: Request) {
    if (!isAdmin(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const result = await db.execute(
            "SELECT id, email, password_plain, name, tier, created_at FROM users ORDER BY created_at DESC"
        );

        return NextResponse.json({ users: result.rows });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}

// DELETE /api/admin/users - Delete a user
export async function DELETE(req: Request) {
    if (!isAdmin(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { userId } = await req.json();

        await db.execute({
            sql: "DELETE FROM watchlist WHERE user_id = ?",
            args: [userId],
        });

        await db.execute({
            sql: "DELETE FROM users WHERE id = ?",
            args: [userId],
        });

        // Log action
        await db.execute({
            sql: "INSERT INTO activity_logs (action, details) VALUES (?, ?)",
            args: ["USER_DELETED", `Admin deleted user ${userId}`],
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
    }
}

// PATCH /api/admin/users - Update user tier
export async function PATCH(req: Request) {
    if (!isAdmin(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { userId, tier } = await req.json();

        await db.execute({
            sql: "UPDATE users SET tier = ? WHERE id = ?",
            args: [tier, userId],
        });

        // Log action
        await db.execute({
            sql: "INSERT INTO activity_logs (action, details) VALUES (?, ?)",
            args: ["TIER_CHANGED", `Admin changed user ${userId} tier to ${tier}`],
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
    }
}
