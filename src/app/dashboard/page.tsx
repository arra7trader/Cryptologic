"use client";

import { useState, useEffect } from "react";
import {
  Search,
  TrendingUp,
  TrendingDown,
  Minus,
  Star,
  Lock,
  Globe,
  Sparkles,
  AlertTriangle,
  Calendar,
  Crown,
  Plus,
  X,
  LogOut,
  User as UserIcon,
} from "lucide-react";
import { Coin, User } from "@/types";
import { formatCurrency, formatPercentage } from "@/lib/coingecko";
import { generateCosmicScore, getScoreColor, getTrendColor, eventIcons, eventNames } from "@/lib/cosmic";
import { useLanguage } from "@/lib/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Link from "next/link";

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
  amber: "#f59e0b",
};

// ============================================
// STATIC DATA
// ============================================

const EVENTS_TODAY = [
  { type: "new_moon", impact: "Medium" },
  { type: "jupiter_saturn_conjunction", impact: "High" },
];

// Top 5 coins available for Lite (free) users
const TOP_5_COINS = ["bitcoin", "ethereum", "binancecoin", "solana", "ripple"];

// ============================================
// TRANSLATIONS
// ============================================

// Local translations removed in favor of global i18n


// ============================================
// COMPONENTS
// ============================================

function CoinCard({ coin, isPro, onAddWatchlist }: {
  coin: Coin;
  isPro: boolean;
  onAddWatchlist?: (coinId: string) => void;
}) {
  const { t } = useLanguage();
  const cosmicScore = generateCosmicScore(coin.id);
  const isLocked = !isPro && !TOP_5_COINS.includes(coin.id);
  const TrendIcon = cosmicScore.trend === "Bullish" ? TrendingUp : cosmicScore.trend === "Bearish" ? TrendingDown : Minus;

  return (
    <div
      style={{
        background: colors.bgCard,
        border: `1px solid ${colors.border}`,
        borderRadius: "14px",
        padding: "20px",
        position: "relative",
        overflow: "hidden",
        filter: isLocked ? "blur(4px)" : "none",
        opacity: isLocked ? 0.4 : 1,
        transition: "all 0.2s",
        cursor: isLocked ? "not-allowed" : "pointer",
      }}
    >
      {/* Lock Overlay */}
      {isLocked && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <Lock size={24} style={{ color: colors.purple, marginBottom: "8px" }} />
            <div style={{ fontSize: "12px", color: colors.textSecondary }}>{t("dashboard.pro_only")}</div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img
            src={coin.image}
            alt={coin.name}
            style={{ width: "36px", height: "36px", borderRadius: "50%" }}
          />
          <div>
            <div style={{ fontSize: "15px", fontWeight: 600, color: colors.textPrimary }}>{coin.name}</div>
            <div style={{ fontSize: "12px", color: colors.textDim, textTransform: "uppercase" }}>{coin.symbol}</div>
          </div>
        </div>
        {!isLocked && onAddWatchlist && (
          <button
            onClick={(e) => { e.stopPropagation(); onAddWatchlist(coin.id); }}
            style={{
              background: "transparent",
              border: `1px solid ${colors.border}`,
              borderRadius: "6px",
              padding: "6px",
              cursor: "pointer",
              color: colors.textDim,
            }}
          >
            <Plus size={14} />
          </button>
        )}
      </div>

      {/* Price */}
      <div style={{ marginBottom: "16px" }}>
        <div style={{ fontSize: "20px", fontWeight: 600, color: colors.textPrimary }}>
          {formatCurrency(coin.current_price)}
        </div>
        <div
          style={{
            fontSize: "13px",
            fontWeight: 500,
            color: coin.price_change_percentage_24h >= 0 ? colors.accent : colors.red,
          }}
        >
          {formatPercentage(coin.price_change_percentage_24h)}
        </div>
      </div>

      {/* Cosmic Score */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px",
          background: colors.bg,
          borderRadius: "10px",
          border: `1px solid ${colors.border}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: `conic-gradient(${getScoreColor(cosmicScore.score)} ${cosmicScore.score}%, ${colors.bgHover} 0)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: colors.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "11px",
                fontWeight: 700,
                color: getScoreColor(cosmicScore.score),
              }}
            >
              {cosmicScore.score}
            </div>
          </div>
          <div>
            <div style={{ fontSize: "11px", color: colors.textDim, textTransform: "uppercase" }}>Score</div>
            <div
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: getTrendColor(cosmicScore.trend),
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <TrendIcon size={12} />
              {cosmicScore.trend}
            </div>
          </div>
        </div>
        <div style={{ fontSize: "20px" }}>{eventIcons[cosmicScore.event]}</div>
      </div>

      {/* Volatility Alert */}
      {cosmicScore.volatilityAlert && (
        <div
          style={{
            marginTop: "12px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "11px",
            color: colors.amber,
            padding: "8px",
            background: "rgba(245,158,11,0.1)",
            borderRadius: "6px",
          }}
        >
          <AlertTriangle size={12} />
          <span>High Volatility Alert</span>
        </div>
      )}
    </div>
  );
}

function EventBadge({ type, impact }: { type: string; impact: string }) {
  const { language } = useLanguage();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "12px 16px",
        background: colors.bgCard,
        border: `1px solid ${colors.border}`,
        borderRadius: "10px",
      }}
    >
      <span style={{ fontSize: "24px" }}>{eventIcons[type]}</span>
      <div>
        <div style={{ fontSize: "13px", fontWeight: 500, color: colors.textPrimary }}>
          {eventNames[type]?.[language] || type}
        </div>
        <div
          style={{
            fontSize: "11px",
            color: impact === "High" ? colors.red : impact === "Medium" ? colors.amber : colors.accent,
          }}
        >
          {impact} Impact
        </div>
      </div>
    </div>
  );
}


export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [coinsLoading, setCoinsLoading] = useState(true);
  const [isPro, setIsPro] = useState(false);
  const { t, language, setLanguage } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [coins, setCoins] = useState<Coin[]>([]);
  const [searchResults, setSearchResults] = useState<Coin[]>([]);
  const [searching, setSearching] = useState(false);
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Load data on mount
  useEffect(() => {
    checkAuth();
    fetchCoins();
  }, []);

  // Load watchlist when user changes
  useEffect(() => {
    if (user) {
      fetchWatchlist();
    }
  }, [user]);

  // Debounced search
  useEffect(() => {
    if (!searchQuery || searchQuery.length < 2 || !isPro) {
      setSearchResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await fetch(`/api/coins/search?q=${encodeURIComponent(searchQuery)}`);
        const data = await res.json();
        if (data.coins) {
          setSearchResults(data.coins);
        }
      } catch (e) {
        console.error("Search failed:", e);
      } finally {
        setSearching(false);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchQuery, isPro]);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      if (data.user) {
        setUser(data.user);
        setIsPro(data.user.tier === "pro");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchCoins = async () => {
    try {
      const res = await fetch("/api/coins?limit=20");
      const data = await res.json();
      if (data.coins && data.coins.length > 0) {
        setCoins(data.coins);
      }
    } catch (error) {
      console.error("Failed to fetch coins:", error);
    } finally {
      setCoinsLoading(false);
    }
  };

  const fetchWatchlist = async () => {
    try {
      const res = await fetch("/api/watchlist");
      const data = await res.json();
      if (data.watchlist) {
        setWatchlist(data.watchlist);
      }
    } catch (error) {
      console.error("Failed to fetch watchlist:", error);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setIsPro(false);
    setWatchlist([]);
    window.location.reload();
  };

  const handleUpgrade = async () => {
    if (!user) {
      window.location.href = "/login";
      return;
    }
    const res = await fetch("/api/auth/upgrade", { method: "POST" });
    if (res.ok) {
      await checkAuth();
      setShowUpgradeModal(false);
    }
  };

  const togglePro = (value: boolean) => {
    if (value && (!user || user.tier !== "pro")) {
      setShowUpgradeModal(true);
      return;
    }
    setIsPro(value);
  };

  // const text = t[lang]; // Removed local text reference

  // Use search results if searching, otherwise filter default coins
  const displayCoins = searchQuery && searchResults.length > 0
    ? searchResults
    : searchQuery
      ? coins.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      )
      : coins;

  const watchlistCoins = coins.filter((c) => watchlist.includes(c.id));

  const handleAddWatchlist = async (coinId: string) => {
    if (!user || user.tier !== "pro") {
      setShowUpgradeModal(true);
      return;
    }
    if (!watchlist.includes(coinId)) {
      setWatchlist([...watchlist, coinId]);
      await fetch("/api/watchlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coinId }),
      });
    }
  };

  const handleRemoveWatchlist = async (coinId: string) => {
    setWatchlist(watchlist.filter((id) => id !== coinId));
    await fetch("/api/watchlist", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ coinId }),
    });
  };

  if (loading) return null;

  return (
    <div style={{ minHeight: "100vh", background: colors.bg, fontFamily: "'Inter', -apple-system, sans-serif" }}>
      {/* NAVBAR */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(10,10,11,0.9)",
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 24px",
            height: "56px",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  background: colors.accent,
                  borderRadius: "50%",
                  boxShadow: `0 0 12px ${colors.accent}`,
                }}
              />
              <span style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "0.1em", color: colors.textPrimary }}>
                CRYPTOLOGIC
              </span>
              {isPro && (
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 600,
                    padding: "2px 8px",
                    background: colors.purpleDim,
                    color: colors.purple,
                    borderRadius: "4px",
                  }}
                >
                  PRO
                </span>
              )}
            </div>
          </Link>

          {/* Controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <LanguageSwitcher />

            {/* Auth Buttons */}
            {user ? (
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: colors.textPrimary }}>
                  <UserIcon size={16} />
                  <span>{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  style={{
                    padding: "6px",
                    background: "transparent",
                    border: "none",
                    color: colors.textDim,
                    cursor: "pointer",
                  }}
                  title="Logout"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", gap: "8px" }}>
                <Link href="/login">
                  <button
                    style={{
                      padding: "6px 12px",
                      fontSize: "12px",
                      background: "transparent",
                      color: colors.textPrimary,
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Sign In
                  </button>
                </Link>
                <Link href="/register">
                  <button
                    style={{
                      padding: "6px 12px",
                      fontSize: "12px",
                      background: colors.bgCard,
                      color: colors.textPrimary,
                      border: `1px solid ${colors.border}`,
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Register
                  </button>
                </Link>
              </div>
            )}

            {/* Tier Badge (Read-only) */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 12px",
                background: isPro ? colors.purpleDim : colors.bgCard,
                border: `1px solid ${isPro ? colors.purple : colors.border}`,
                borderRadius: "8px",
              }}
            >
              {isPro ? <Crown size={14} style={{ color: colors.purple }} /> : <Lock size={14} style={{ color: colors.textDim }} />}
              <span style={{ fontSize: "12px", fontWeight: 600, color: isPro ? colors.purple : colors.textDim }}>
                {isPro ? "PRO" : "LITE"}
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px" }}>
        {/* Search Bar */}
        <div style={{ marginBottom: "32px" }}>
          <div
            onClick={() => !isPro && setShowUpgradeModal(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              background: colors.bgCard,
              border: `1px solid ${!isPro ? colors.amber : colors.border}`,
              borderRadius: "12px",
              maxWidth: "500px",
              cursor: !isPro ? "pointer" : "default",
              opacity: !isPro ? 0.7 : 1,
            }}
          >
            {!isPro ? <Lock size={18} style={{ color: colors.amber }} /> : <Search size={18} style={{ color: colors.textDim }} />}
            <input
              type="text"
              placeholder={!isPro ? t("dashboard.search_locked") : t("dashboard.search")}
              value={searchQuery}
              onChange={(e) => isPro && setSearchQuery(e.target.value)}
              disabled={!isPro}
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                fontSize: "14px",
                color: colors.textPrimary,
                cursor: !isPro ? "pointer" : "text",
              }}
            />
            {!isPro && (
              <span style={{ fontSize: "11px", color: colors.amber, display: "flex", alignItems: "center", gap: "4px", whiteSpace: "nowrap" }}>
                <Crown size={12} />
                PRO
              </span>
            )}
          </div>
        </div>

        {/* Today's Events */}
        <div style={{ marginBottom: "40px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "16px",
              fontSize: "11px",
              fontWeight: 600,
              color: colors.textDim,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            <Calendar size={14} />
            {t("dashboard.events")}
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {EVENTS_TODAY.map((event, i) => (
              <EventBadge key={i} type={event.type} impact={event.impact} />
            ))}
          </div>
        </div>

        {/* Watchlist (Pro only) */}
        {isPro && (
          <div style={{ marginBottom: "40px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: colors.textDim,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                <Star size={14} />
                {t("dashboard.watchlist")}
              </div>
            </div>

            {watchlistCoins.length > 0 ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
                {watchlistCoins.map((coin) => (
                  <div key={coin.id} style={{ position: "relative" }}>
                    <CoinCard coin={coin} isPro={isPro} />
                    <button
                      onClick={() => handleRemoveWatchlist(coin.id)}
                      style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        background: colors.bgHover,
                        border: "none",
                        borderRadius: "6px",
                        padding: "6px",
                        cursor: "pointer",
                        color: colors.textDim,
                        zIndex: 5,
                      }}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div
                style={{
                  padding: "40px",
                  textAlign: "center",
                  background: colors.bgCard,
                  borderRadius: "12px",
                  border: `1px dashed ${colors.border}`,
                }}
              >
                <Star size={32} style={{ color: colors.textDim, marginBottom: "12px" }} />
                <div style={{ color: colors.textSecondary, marginBottom: "4px" }}>{t("dashboard.empty_watchlist")}</div>
                <div style={{ color: colors.textDim, fontSize: "13px" }}>{t("dashboard.add_coins")}</div>
              </div>
            )}
          </div>
        )}

        {/* Featured Coins */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "11px",
                fontWeight: 600,
                color: colors.textDim,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              <Sparkles size={14} />
              {t("dashboard.featured")}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
            {displayCoins.map((coin) => (
              <CoinCard
                key={coin.id}
                coin={coin}
                isPro={isPro}
                onAddWatchlist={handleAddWatchlist}
              />
            ))}
          </div>
        </div>

        {/* Free Tier CTA */}
        {!isPro && (
          <div
            style={{
              marginTop: "48px",
              padding: "32px",
              background: `linear-gradient(135deg, ${colors.purpleDim}, ${colors.bgCard})`,
              border: `1px solid rgba(139,92,246,0.3)`,
              borderRadius: "16px",
              textAlign: "center",
            }}
          >
            <Crown size={32} style={{ color: colors.purple, marginBottom: "16px" }} />
            <h3 style={{ fontSize: "20px", fontWeight: 600, color: colors.textPrimary, marginBottom: "8px" }}>
              {t("dashboard.upgrade_cta")}
            </h3>
            <p style={{ color: colors.textSecondary, marginBottom: "20px", maxWidth: "400px", margin: "0 auto 20px" }}>
              {t("dashboard.upgrade_desc")}
            </p>
            <button
              onClick={() => setIsPro(true)}
              style={{
                padding: "12px 32px",
                background: colors.purple,
                border: "none",
                borderRadius: "10px",
                color: "white",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {t("dashboard.upgrade_btn")}
            </button>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer
        style={{
          textAlign: "center",
          padding: "40px 24px",
          borderTop: `1px solid ${colors.border}`,
          color: colors.textDim,
          fontSize: "12px",
          marginTop: "40px",
        }}
      >
        <p>Financial Astrology & Statistics</p>
        <p style={{ marginTop: "8px", opacity: 0.5 }}>© 2024 Cryptologic</p>
      </footer>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowUpgradeModal(false)}
        >
          <div
            style={{
              background: colors.bgCard,
              border: `1px solid ${colors.border}`,
              borderRadius: "16px",
              padding: "32px",
              maxWidth: "400px",
              textAlign: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Lock size={40} style={{ color: colors.purple, marginBottom: "16px" }} />
            <h3 style={{ fontSize: "18px", fontWeight: 600, color: colors.textPrimary, marginBottom: "8px" }}>
              {t("dashboard.modal_title")}
            </h3>
            <p style={{ color: colors.textSecondary, marginBottom: "24px" }}>
              {t("dashboard.modal_desc")}
            </p>
            <Link href="/checkout">
              <button
                style={{
                  padding: "12px 32px",
                  background: colors.purple,
                  border: "none",
                  borderRadius: "10px",
                  color: "white",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                  marginRight: "12px",
                }}
              >
                {t("dashboard.modal_upgrade_btn")}
              </button>
            </Link>
            <button
              onClick={() => setShowUpgradeModal(false)}
              style={{
                padding: "12px 24px",
                background: "transparent",
                border: `1px solid ${colors.border}`,
                borderRadius: "10px",
                color: colors.textSecondary,
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              {t("dashboard.modal_later_btn")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
