# Deploy Cryptologic ke Turso + Vercel

## Langkah 1: Setup Turso Database

### 1.1 Buat Akun Turso
Buka https://turso.tech dan daftar (gratis)

### 1.2 Install Turso CLI
```bash
# Windows (PowerShell)
irm get.turso.tech/windows | iex

# Atau download dari https://github.com/tursodatabase/turso-cli/releases
```

### 1.3 Login Turso
```bash
turso auth login
```

### 1.4 Buat Database
```bash
turso db create cryptologic
```

### 1.5 Dapatkan URL dan Token
```bash
# Lihat URL database
turso db show cryptologic --url

# Buat auth token
turso db tokens create cryptologic
```

Simpan kedua nilai ini untuk Vercel!

---

## Langkah 2: Deploy ke Vercel

### 2.1 Push ke GitHub
```bash
cd d:\LOCAL DOC\CRYPTOLOGIC\cryptologic-app
git init
git add .
git commit -m "Initial commit - Cryptologic"
git remote add origin https://github.com/USERNAME/cryptologic.git
git push -u origin main
```

### 2.2 Connect di Vercel
1. Buka https://vercel.com
2. Klik "Add New Project"
3. Import dari GitHub repo
4. Di Settings > Environment Variables, tambahkan:

| Key | Value |
|-----|-------|
| `TURSO_DATABASE_URL` | libsql://cryptologic-USERNAME.turso.io |
| `TURSO_AUTH_TOKEN` | eyJhbG... (token dari step 1.5) |
| `JWT_SECRET` | random-string-minimal-32-karakter |

5. Klik Deploy!

---

## Langkah 3: Setup Database Tables

Setelah deploy, jalankan migrasi database:

```bash
# Install turso CLI jika belum
turso db shell cryptologic

# Jalankan SQL ini:
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  password_plain TEXT,
  name TEXT,
  tier TEXT DEFAULT 'lite',
  subscription_end TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS watchlist (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT REFERENCES users(id),
  coin_id TEXT NOT NULL,
  added_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS activity_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT,
  action TEXT NOT NULL,
  details TEXT,
  ip_address TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS payments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT REFERENCES users(id),
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'IDR',
  status TEXT DEFAULT 'pending',
  payment_method TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## Done! 🎉

Website akan live di: `https://cryptologic-xxx.vercel.app`

### Kredensial Admin:
- Email: `arra@admin.id`  
- Password: `Aoyamapm7@`
