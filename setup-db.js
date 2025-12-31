const { createClient } = require("@libsql/client");
const fs = require("fs");

const url = "file:local.db";

const db = createClient({
    url,
});

async function main() {
    console.log("Initializing database...");

    try {
        // Users Table
        await db.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        name TEXT,
        tier TEXT DEFAULT 'lite',
        subscription_end TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
        console.log("Created 'users' table.");

        // Watchlist Table
        await db.execute(`
      CREATE TABLE IF NOT EXISTS watchlist (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT REFERENCES users(id),
        coin_id TEXT NOT NULL,
        added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, coin_id)
      )
    `);
        console.log("Created 'watchlist' table.");

        console.log("Database setup complete!");
    } catch (err) {
        console.error("Error setting up database:", err);
    }
}

main();
