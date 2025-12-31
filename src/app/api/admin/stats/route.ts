import { NextResponse } from "next/server";
import { db } from "@/lib/db";

function isAdmin(req: Request): boolean {
    const cookie = req.headers.get("cookie");
    return cookie?.includes("admin_token=cryptologic_admin_session_2024") || false;
}

// GET /api/admin/stats - Get dashboard statistics
export async function GET(req: Request) {
    if (!isAdmin(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        // Total users
        const usersResult = await db.execute("SELECT COUNT(*) as count FROM users");
        const totalUsers = usersResult.rows[0]?.count || 0;

        // Pro users
        const proResult = await db.execute("SELECT COUNT(*) as count FROM users WHERE tier = 'pro'");
        const proUsers = proResult.rows[0]?.count || 0;

        // Lite users
        const liteUsers = (totalUsers as number) - (proUsers as number);

        // Today's registrations
        const todayResult = await db.execute(
            "SELECT COUNT(*) as count FROM users WHERE DATE(created_at) = DATE('now')"
        );
        const todayRegistrations = todayResult.rows[0]?.count || 0;

        // Total revenue (mock calculation: pro users * 99000)
        const totalRevenue = (proUsers as number) * 99000;

        // Recent activity logs
        const logsResult = await db.execute(
            "SELECT * FROM activity_logs ORDER BY created_at DESC LIMIT 10"
        );

        return NextResponse.json({
            stats: {
                totalUsers,
                proUsers,
                liteUsers,
                todayRegistrations,
                totalRevenue,
                conversionRate: totalUsers ? Math.round(((proUsers as number) / (totalUsers as number)) * 100) : 0,
            },
            logs: logsResult.rows,
        });
    } catch (error) {
        console.error("Stats error:", error);
        return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
    }
}
