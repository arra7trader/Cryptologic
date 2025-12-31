import { createClient } from "@libsql/client";

const url = process.env.TURSO_DATABASE_URL || "file:local.db";
const authToken = process.env.TURSO_AUTH_TOKEN;

export const db = createClient({
    url,
    authToken,
});

export interface UserRow {
    id: string;
    email: string;
    password_hash: string;
    name: string;
    tier: string;
    subscription_end: string | null;
    created_at: string;
}

export interface WatchlistRow {
    id: number;
    user_id: string;
    coin_id: string;
    added_at: string;
}
