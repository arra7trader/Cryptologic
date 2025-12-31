import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { comparePassword, signToken } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        const { email, password, rememberMe } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        // Find user
        const result = await db.execute({
            sql: "SELECT * FROM users WHERE email = ?",
            args: [email],
        });

        if (result.rows.length === 0) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        const user = result.rows[0];
        const isValid = await comparePassword(password, user.password_hash as string);

        if (!isValid) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Create token
        const token = await signToken({
            userId: user.id as string,
            email: user.email as string,
            tier: user.tier as string
        });

        const response = NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                tier: user.tier
            }
        });

        // Set cookie - 30 days if remember me, otherwise 1 hour
        const maxAge = rememberMe
            ? 60 * 60 * 24 * 30  // 30 days
            : 60 * 60;           // 1 hour

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge,
        });

        return response;

    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
