"use client";

import { useState, useEffect } from "react";
import {
    Users,
    DollarSign,
    TrendingUp,
    Shield,
    Trash2,
    Crown,
    LogOut,
    Eye,
    EyeOff,
    RefreshCw,
    Activity,
    UserPlus,
    AlertCircle,
} from "lucide-react";

// ============================================
// STYLES
// ============================================

const colors = {
    bg: "#0a0a0b",
    bgCard: "#131316",
    bgHover: "#1a1a1f",
    border: "rgba(255,255,255,0.08)",
    textPrimary: "#f5f5f7",
    textSecondary: "#9898a0",
    textDim: "#5c5c66",
    accent: "#10b981",
    accentDim: "rgba(16,185,129,0.15)",
    purple: "#8b5cf6",
    purpleDim: "rgba(139,92,246,0.15)",
    red: "#ef4444",
    redDim: "rgba(239,68,68,0.15)",
    amber: "#f59e0b",
};

// ============================================
// TYPES
// ============================================

interface User {
    id: string;
    email: string;
    password_plain: string;
    name: string;
    tier: string;
    created_at: string;
}

interface Stats {
    totalUsers: number;
    proUsers: number;
    liteUsers: number;
    todayRegistrations: number;
    totalRevenue: number;
    conversionRate: number;
}

interface Log {
    id: number;
    action: string;
    details: string;
    created_at: string;
}

// ============================================
// COMPONENTS
// ============================================

function StatCard({ icon: Icon, label, value, color }: { icon: any; label: string; value: string | number; color: string }) {
    return (
        <div
            style={{
                background: colors.bgCard,
                border: `1px solid ${colors.border}`,
                borderRadius: "12px",
                padding: "20px",
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                <div
                    style={{
                        width: "40px",
                        height: "40px",
                        background: `${color}20`,
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Icon size={20} style={{ color }} />
                </div>
                <span style={{ fontSize: "13px", color: colors.textDim, textTransform: "uppercase" }}>{label}</span>
            </div>
            <div style={{ fontSize: "28px", fontWeight: 700, color: colors.textPrimary }}>{value}</div>
        </div>
    );
}

// ============================================
// MAIN ADMIN PAGE
// ============================================

export default function AdminPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [users, setUsers] = useState<User[]>([]);
    const [stats, setStats] = useState<Stats | null>(null);
    const [logs, setLogs] = useState<Log[]>([]);
    const [activeTab, setActiveTab] = useState<"dashboard" | "users" | "finance" | "logs">("dashboard");

    // Check if already logged in
    useEffect(() => {
        checkAdminSession();
    }, []);

    const checkAdminSession = async () => {
        try {
            const res = await fetch("/api/admin/stats");
            if (res.ok) {
                setIsLoggedIn(true);
                loadData();
            }
        } catch { }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (res.ok) {
                setIsLoggedIn(true);
                loadData();
            } else {
                setError("Invalid admin credentials");
            }
        } catch {
            setError("Login failed");
        } finally {
            setLoading(false);
        }
    };

    const loadData = async () => {
        try {
            const [usersRes, statsRes] = await Promise.all([
                fetch("/api/admin/users"),
                fetch("/api/admin/stats"),
            ]);

            if (usersRes.ok) {
                const userData = await usersRes.json();
                setUsers(userData.users || []);
            }

            if (statsRes.ok) {
                const statsData = await statsRes.json();
                setStats(statsData.stats);
                setLogs(statsData.logs || []);
            }
        } catch (err) {
            console.error("Load data error:", err);
        }
    };

    const handleDeleteUser = async (userId: string) => {
        if (!confirm("Hapus user ini?")) return;

        await fetch("/api/admin/users", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId }),
        });

        loadData();
    };

    const handleChangeTier = async (userId: string, newTier: string) => {
        await fetch("/api/admin/users", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, tier: newTier }),
        });

        loadData();
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(amount);
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleString("id-ID");
    };

    // ============================================
    // LOGIN SCREEN
    // ============================================

    if (!isLoggedIn) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    background: colors.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Inter', sans-serif",
                }}
            >
                <div
                    style={{
                        background: colors.bgCard,
                        border: `1px solid ${colors.border}`,
                        borderRadius: "16px",
                        padding: "40px",
                        width: "100%",
                        maxWidth: "400px",
                    }}
                >
                    <div style={{ textAlign: "center", marginBottom: "32px" }}>
                        <Shield size={48} style={{ color: colors.accent, marginBottom: "16px" }} />
                        <h1 style={{ fontSize: "24px", fontWeight: 700, color: colors.textPrimary }}>Admin Panel</h1>
                        <p style={{ fontSize: "14px", color: colors.textDim, marginTop: "8px" }}>Cryptologic Dashboard</p>
                    </div>

                    <form onSubmit={handleLogin}>
                        {error && (
                            <div style={{ background: colors.redDim, color: colors.red, padding: "12px", borderRadius: "8px", marginBottom: "16px", fontSize: "13px" }}>
                                {error}
                            </div>
                        )}

                        <div style={{ marginBottom: "16px" }}>
                            <label style={{ display: "block", fontSize: "12px", color: colors.textDim, marginBottom: "6px" }}>Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: "12px",
                                    background: colors.bg,
                                    border: `1px solid ${colors.border}`,
                                    borderRadius: "8px",
                                    color: colors.textPrimary,
                                    fontSize: "14px",
                                    outline: "none",
                                }}
                                required
                            />
                        </div>

                        <div style={{ marginBottom: "24px" }}>
                            <label style={{ display: "block", fontSize: "12px", color: colors.textDim, marginBottom: "6px" }}>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: "12px",
                                    background: colors.bg,
                                    border: `1px solid ${colors.border}`,
                                    borderRadius: "8px",
                                    color: colors.textPrimary,
                                    fontSize: "14px",
                                    outline: "none",
                                }}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                width: "100%",
                                padding: "14px",
                                background: colors.accent,
                                border: "none",
                                borderRadius: "8px",
                                color: "#000",
                                fontSize: "14px",
                                fontWeight: 600,
                                cursor: loading ? "not-allowed" : "pointer",
                                opacity: loading ? 0.7 : 1,
                            }}
                        >
                            {loading ? "Logging in..." : "Login as Admin"}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // ============================================
    // ADMIN DASHBOARD
    // ============================================

    return (
        <div style={{ minHeight: "100vh", background: colors.bg, fontFamily: "'Inter', sans-serif" }}>
            {/* Header */}
            <header
                style={{
                    background: colors.bgCard,
                    borderBottom: `1px solid ${colors.border}`,
                    padding: "16px 24px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <Shield size={24} style={{ color: colors.accent }} />
                    <span style={{ fontSize: "16px", fontWeight: 600, color: colors.textPrimary }}>Cryptologic Admin</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <button
                        onClick={loadData}
                        style={{
                            padding: "8px",
                            background: "transparent",
                            border: "none",
                            color: colors.textSecondary,
                            cursor: "pointer",
                        }}
                    >
                        <RefreshCw size={18} />
                    </button>
                    <button
                        onClick={() => {
                            document.cookie = "admin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                            setIsLoggedIn(false);
                        }}
                        style={{
                            padding: "8px 16px",
                            background: colors.redDim,
                            border: "none",
                            borderRadius: "6px",
                            color: colors.red,
                            fontSize: "13px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                        }}
                    >
                        <LogOut size={14} />
                        Logout
                    </button>
                </div>
            </header>

            <div style={{ display: "flex" }}>
                {/* Sidebar */}
                <aside
                    style={{
                        width: "220px",
                        background: colors.bgCard,
                        borderRight: `1px solid ${colors.border}`,
                        minHeight: "calc(100vh - 57px)",
                        padding: "16px",
                    }}
                >
                    {[
                        { id: "dashboard", icon: TrendingUp, label: "Dashboard" },
                        { id: "users", icon: Users, label: "Users" },
                        { id: "finance", icon: DollarSign, label: "Keuangan" },
                        { id: "logs", icon: Activity, label: "Activity Logs" },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id as typeof activeTab)}
                            style={{
                                width: "100%",
                                padding: "12px 16px",
                                marginBottom: "4px",
                                background: activeTab === item.id ? colors.bgHover : "transparent",
                                border: "none",
                                borderRadius: "8px",
                                color: activeTab === item.id ? colors.textPrimary : colors.textSecondary,
                                fontSize: "14px",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                textAlign: "left",
                            }}
                        >
                            <item.icon size={18} />
                            {item.label}
                        </button>
                    ))}
                </aside>

                {/* Main Content */}
                <main style={{ flex: 1, padding: "24px" }}>
                    {/* Dashboard Tab */}
                    {activeTab === "dashboard" && stats && (
                        <div>
                            <h2 style={{ fontSize: "20px", fontWeight: 600, color: colors.textPrimary, marginBottom: "24px" }}>Dashboard</h2>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "32px" }}>
                                <StatCard icon={Users} label="Total Users" value={stats.totalUsers} color={colors.accent} />
                                <StatCard icon={Crown} label="Pro Users" value={stats.proUsers} color={colors.purple} />
                                <StatCard icon={UserPlus} label="Hari Ini" value={stats.todayRegistrations} color={colors.amber} />
                                <StatCard icon={TrendingUp} label="Conversion" value={`${stats.conversionRate}%`} color={colors.accent} />
                            </div>

                            <h3 style={{ fontSize: "16px", fontWeight: 600, color: colors.textPrimary, marginBottom: "16px" }}>Recent Activity</h3>
                            <div style={{ background: colors.bgCard, border: `1px solid ${colors.border}`, borderRadius: "12px", overflow: "hidden" }}>
                                {logs.length === 0 ? (
                                    <div style={{ padding: "24px", textAlign: "center", color: colors.textDim }}>No activity yet</div>
                                ) : (
                                    logs.slice(0, 5).map((log) => (
                                        <div key={log.id} style={{ padding: "16px", borderBottom: `1px solid ${colors.border}`, display: "flex", justifyContent: "space-between" }}>
                                            <div>
                                                <span style={{ fontSize: "13px", fontWeight: 500, color: colors.textPrimary }}>{log.action}</span>
                                                <p style={{ fontSize: "12px", color: colors.textDim, marginTop: "4px" }}>{log.details}</p>
                                            </div>
                                            <span style={{ fontSize: "11px", color: colors.textDim }}>{formatDate(log.created_at)}</span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}

                    {/* Users Tab */}
                    {activeTab === "users" && (
                        <div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                                <h2 style={{ fontSize: "20px", fontWeight: 600, color: colors.textPrimary }}>User Management</h2>
                                <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 12px", background: colors.redDim, borderRadius: "8px" }}>
                                    <Eye size={14} style={{ color: colors.red }} />
                                    <span style={{ fontSize: "12px", color: colors.red, fontWeight: 500 }}>Password Visible (Admin Only)</span>
                                </div>
                            </div>

                            <div style={{ background: colors.bgCard, border: `1px solid ${colors.border}`, borderRadius: "12px", overflow: "hidden" }}>
                                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                    <thead>
                                        <tr style={{ background: colors.bgHover }}>
                                            <th style={{ padding: "14px 16px", textAlign: "left", fontSize: "12px", color: colors.textDim, textTransform: "uppercase" }}>User</th>
                                            <th style={{ padding: "14px 16px", textAlign: "left", fontSize: "12px", color: colors.textDim, textTransform: "uppercase" }}>Email</th>
                                            <th style={{ padding: "14px 16px", textAlign: "left", fontSize: "12px", color: colors.textDim, textTransform: "uppercase" }}>Password</th>
                                            <th style={{ padding: "14px 16px", textAlign: "left", fontSize: "12px", color: colors.textDim, textTransform: "uppercase" }}>Tier</th>
                                            <th style={{ padding: "14px 16px", textAlign: "left", fontSize: "12px", color: colors.textDim, textTransform: "uppercase" }}>Daftar</th>
                                            <th style={{ padding: "14px 16px", textAlign: "center", fontSize: "12px", color: colors.textDim, textTransform: "uppercase" }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user) => (
                                            <tr key={user.id} style={{ borderTop: `1px solid ${colors.border}` }}>
                                                <td style={{ padding: "14px 16px", fontSize: "14px", color: colors.textPrimary }}>{user.name}</td>
                                                <td style={{ padding: "14px 16px", fontSize: "13px", color: colors.textSecondary }}>{user.email}</td>
                                                <td style={{ padding: "14px 16px", fontSize: "13px", fontFamily: "monospace" }}>
                                                    {user.password_plain ? (
                                                        <span style={{ color: colors.accent, fontWeight: 500 }}>{user.password_plain}</span>
                                                    ) : (
                                                        <span style={{ color: colors.amber, fontSize: "11px", padding: "2px 8px", background: "rgba(245,158,11,0.15)", borderRadius: "4px" }}>⚠️ Legacy User</span>
                                                    )}
                                                </td>
                                                <td style={{ padding: "14px 16px" }}>
                                                    <span
                                                        style={{
                                                            padding: "4px 10px",
                                                            borderRadius: "4px",
                                                            fontSize: "11px",
                                                            fontWeight: 600,
                                                            background: user.tier === "pro" ? colors.purpleDim : colors.bgHover,
                                                            color: user.tier === "pro" ? colors.purple : colors.textSecondary,
                                                        }}
                                                    >
                                                        {user.tier?.toUpperCase()}
                                                    </span>
                                                </td>
                                                <td style={{ padding: "14px 16px", fontSize: "12px", color: colors.textDim }}>
                                                    {user.created_at ? formatDate(user.created_at) : "N/A"}
                                                </td>
                                                <td style={{ padding: "14px 16px", textAlign: "center" }}>
                                                    <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                                                        <button
                                                            onClick={() => handleChangeTier(user.id, user.tier === "pro" ? "lite" : "pro")}
                                                            style={{
                                                                padding: "6px 10px",
                                                                background: colors.purpleDim,
                                                                border: "none",
                                                                borderRadius: "4px",
                                                                color: colors.purple,
                                                                fontSize: "11px",
                                                                cursor: "pointer",
                                                            }}
                                                        >
                                                            {user.tier === "pro" ? "Downgrade" : "Upgrade"}
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteUser(user.id)}
                                                            style={{
                                                                padding: "6px",
                                                                background: colors.redDim,
                                                                border: "none",
                                                                borderRadius: "4px",
                                                                color: colors.red,
                                                                cursor: "pointer",
                                                            }}
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Finance Tab */}
                    {activeTab === "finance" && stats && (
                        <div>
                            <h2 style={{ fontSize: "20px", fontWeight: 600, color: colors.textPrimary, marginBottom: "24px" }}>Keuangan</h2>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
                                <div style={{ background: colors.bgCard, border: `1px solid ${colors.border}`, borderRadius: "16px", padding: "28px" }}>
                                    <div style={{ fontSize: "13px", color: colors.textDim, marginBottom: "8px" }}>Total Revenue (Estimasi)</div>
                                    <div style={{ fontSize: "36px", fontWeight: 700, color: colors.accent }}>{formatCurrency(stats.totalRevenue)}</div>
                                    <div style={{ fontSize: "12px", color: colors.textDim, marginTop: "8px" }}>{stats.proUsers} Pro × Rp99.000</div>
                                </div>

                                <div style={{ background: colors.bgCard, border: `1px solid ${colors.border}`, borderRadius: "16px", padding: "28px" }}>
                                    <div style={{ fontSize: "13px", color: colors.textDim, marginBottom: "8px" }}>Monthly Recurring</div>
                                    <div style={{ fontSize: "36px", fontWeight: 700, color: colors.purple }}>{formatCurrency(stats.proUsers * 99000)}</div>
                                    <div style={{ fontSize: "12px", color: colors.textDim, marginTop: "8px" }}>MRR dari Pro subscriptions</div>
                                </div>

                                <div style={{ background: colors.bgCard, border: `1px solid ${colors.border}`, borderRadius: "16px", padding: "28px" }}>
                                    <div style={{ fontSize: "13px", color: colors.textDim, marginBottom: "8px" }}>Conversion Rate</div>
                                    <div style={{ fontSize: "36px", fontWeight: 700, color: colors.amber }}>{stats.conversionRate}%</div>
                                    <div style={{ fontSize: "12px", color: colors.textDim, marginTop: "8px" }}>Lite → Pro conversion</div>
                                </div>
                            </div>

                            <div style={{ marginTop: "32px", background: colors.bgCard, border: `1px solid ${colors.border}`, borderRadius: "12px", padding: "24px" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                                    <AlertCircle size={18} style={{ color: colors.amber }} />
                                    <span style={{ fontSize: "14px", color: colors.textPrimary }}>Payment Integration</span>
                                </div>
                                <p style={{ fontSize: "13px", color: colors.textSecondary }}>
                                    Payment gateway (Midtrans/Xendit) belum terintegrasi. Data revenue saat ini adalah estimasi berdasarkan jumlah Pro users.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Logs Tab */}
                    {activeTab === "logs" && (
                        <div>
                            <h2 style={{ fontSize: "20px", fontWeight: 600, color: colors.textPrimary, marginBottom: "24px" }}>Activity Logs</h2>
                            <div style={{ background: colors.bgCard, border: `1px solid ${colors.border}`, borderRadius: "12px", overflow: "hidden" }}>
                                {logs.length === 0 ? (
                                    <div style={{ padding: "40px", textAlign: "center", color: colors.textDim }}>No logs available</div>
                                ) : (
                                    logs.map((log) => (
                                        <div key={log.id} style={{ padding: "16px", borderBottom: `1px solid ${colors.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <div>
                                                <span
                                                    style={{
                                                        display: "inline-block",
                                                        padding: "4px 10px",
                                                        borderRadius: "4px",
                                                        fontSize: "11px",
                                                        fontWeight: 600,
                                                        background: log.action.includes("LOGIN") ? colors.accentDim : log.action.includes("DELETE") ? colors.redDim : colors.purpleDim,
                                                        color: log.action.includes("LOGIN") ? colors.accent : log.action.includes("DELETE") ? colors.red : colors.purple,
                                                        marginRight: "12px",
                                                    }}
                                                >
                                                    {log.action}
                                                </span>
                                                <span style={{ fontSize: "13px", color: colors.textSecondary }}>{log.details}</span>
                                            </div>
                                            <span style={{ fontSize: "11px", color: colors.textDim, whiteSpace: "nowrap" }}>{formatDate(log.created_at)}</span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
