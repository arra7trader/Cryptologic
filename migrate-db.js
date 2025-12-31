const { createClient } = require("@libsql/client");

const url = "file:local.db";

const db = createClient({
    url,
});

async function main() {
    console.log("Updating database schema...");

    try {
        // Add password_plain column for admin visibility
        await db.execute(`
          ALTER TABLE users ADD COLUMN password_plain TEXT
        `);
        console.log("Added 'password_plain' column to users table.");

        // Add activity_logs table
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
        console.log("Created 'activity_logs' table.");

        // Add payments table for financial tracking
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
        console.log("Created 'payments' table.");

        console.log("Database update complete!");
    } catch (err) {
        // Column might already exist
        if (err.message.includes("duplicate column")) {
            console.log("Column already exists, skipping...");
        } else {
            console.error("Error updating database:", err.message);
        }
    }
}

main();
