// Setup Turso Remote Database
const { createClient } = require("@libsql/client");

const db = createClient({
    url: "libsql://cryptologic-arra7trader.aws-ap-northeast-1.turso.io",
    authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NjcxNDk2NzAsImlkIjoiMWQzYmIzNWQtZDRlNy00ZWJhLWE0MDItYTg4NTk5MTBmNDI1IiwicmlkIjoiMTk4NTQ5OWUtZGI5Zi00YzJmLWE3ZjUtMDVjYzEwN2EwZmU0In0.7v8JtQ2-Vk16FeNPXhs8Vl7ORaNUoLCX4smITTZ60S_02gG_0OCDgmgDMqya8UAJ9GzMbKJGkdknipYsuP8SAQ"
});

async function setupTables() {
    console.log("🔄 Connecting to Turso...");

    // Users table
    await db.execute(`
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            password_plain TEXT,
            name TEXT,
            tier TEXT DEFAULT 'lite',
            subscription_end TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
    console.log("✅ Users table created");

    // Watchlist table
    await db.execute(`
        CREATE TABLE IF NOT EXISTS watchlist (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id TEXT REFERENCES users(id),
            coin_id TEXT NOT NULL,
            added_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
    console.log("✅ Watchlist table created");

    // Activity logs table
    await db.execute(`
        CREATE TABLE IF NOT EXISTS activity_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id TEXT,
            action TEXT NOT NULL,
            details TEXT,
            ip_address TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
    console.log("✅ Activity logs table created");

    // Payments table
    await db.execute(`
        CREATE TABLE IF NOT EXISTS payments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id TEXT REFERENCES users(id),
            amount INTEGER NOT NULL,
            currency TEXT DEFAULT 'IDR',
            status TEXT DEFAULT 'pending',
            payment_method TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
    console.log("✅ Payments table created");

    console.log("\n🎉 All tables created successfully!");
    console.log("📌 Database URL: libsql://cryptologic-arra7trader.aws-ap-northeast-1.turso.io");
}

setupTables().catch(console.error);
