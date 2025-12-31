import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashPassword, signToken } from "@/lib/auth";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
    try {
        const { email, password, name } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        // Check existing user
        const existing = await db.execute({
            sql: "SELECT * FROM users WHERE email = ?",
            args: [email],
        });

        if (existing.rows.length > 0) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }

        const hashedPassword = await hashPassword(password);
        const userId = randomUUID();

        // Create user (save plain password for admin visibility)
        await db.execute({
            sql: "INSERT INTO users (id, email, password_hash, password_plain, name, tier) VALUES (?, ?, ?, ?, ?, ?)",
            args: [userId, email, hashedPassword, password, name || email.split("@")[0], "lite"],
        });

        // Create token
        const token = await signToken({ userId, email, tier: "lite" });

        const response = NextResponse.json({ success: true, user: { id: userId, email, tier: "lite" } });

        // Set cookie
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 1 week
        });

        return response;

    } catch (error) {
        console.error("Register error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
