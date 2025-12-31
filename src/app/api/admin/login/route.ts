import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Admin credentials (CONFIDENTIAL)
const ADMIN_EMAIL = "arra@admin.id";
const ADMIN_PASSWORD = "Aoyamapm7@";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // Set admin session cookie
        const response = NextResponse.json({ success: true });
        response.cookies.set("admin_token", "cryptologic_admin_session_2024", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 8, // 8 hours
        });

        // Log admin login
        await db.execute({
            sql: "INSERT INTO activity_logs (action, details) VALUES (?, ?)",
            args: ["ADMIN_LOGIN", `Admin logged in at ${new Date().toISOString()}`],
        });

        return response;
    } catch (error) {
        return NextResponse.json({ error: "Login failed" }, { status: 500 });
    }
}
