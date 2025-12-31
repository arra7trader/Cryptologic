"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Sparkles,
  TrendingUp,
  Shield,
  Bell,
  Star,
  ChevronRight,
  Check,
  Globe,
  Zap,
  BarChart3,
  Moon,
  Sun,
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
};

// ============================================
// COMPONENTS
// ============================================

function FeatureCard({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <div
      style={{
        background: colors.bgCard,
        border: `1px solid ${colors.border}`,
        borderRadius: "16px",
        padding: "28px",
        transition: "all 0.2s",
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          background: colors.accentDim,
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <Icon size={24} style={{ color: colors.accent }} />
      </div>
      <h3 style={{ fontSize: "18px", fontWeight: 600, color: colors.textPrimary, marginBottom: "8px" }}>{title}</h3>
      <p style={{ fontSize: "14px", color: colors.textSecondary, lineHeight: 1.6 }}>{description}</p>
    </div>
  );
}

function PricingCard({ title, price, features, popular, cta }: { title: string; price: string; features: string[]; popular?: boolean; cta: string }) {
  return (
    <div
      style={{
        background: popular ? `linear-gradient(135deg, ${colors.purpleDim}, ${colors.bgCard})` : colors.bgCard,
        border: `1px solid ${popular ? "rgba(139,92,246,0.3)" : colors.border}`,
        borderRadius: "20px",
        padding: "32px",
        position: "relative",
        flex: 1,
        maxWidth: "360px",
      }}
    >
      {popular && (
        <div
          style={{
            position: "absolute",
            top: "-12px",
            left: "50%",
            transform: "translateX(-50%)",
            background: colors.purple,
            color: "white",
            fontSize: "11px",
            fontWeight: 600,
            padding: "4px 16px",
            borderRadius: "100px",
          }}
        >
          MOST POPULAR
        </div>
      )}
      <h3 style={{ fontSize: "20px", fontWeight: 600, color: colors.textPrimary, marginBottom: "8px" }}>{title}</h3>
      <div style={{ marginBottom: "24px" }}>
        <span style={{ fontSize: "40px", fontWeight: 700, color: colors.textPrimary }}>{price}</span>
        {price !== "Free" && <span style={{ fontSize: "14px", color: colors.textSecondary }}>/bulan</span>}
      </div>
      <ul style={{ listStyle: "none", padding: 0, marginBottom: "28px" }}>
        {features.map((feature, i) => (
          <li key={i} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px", fontSize: "14px", color: colors.textSecondary }}>
            <Check size={16} style={{ color: colors.accent }} />
            {feature}
          </li>
        ))}
      </ul>
      <Link href="/register">
        <button
          style={{
            width: "100%",
            padding: "14px",
            background: popular ? colors.purple : "transparent",
            border: popular ? "none" : `1px solid ${colors.border}`,
            borderRadius: "10px",
            color: colors.textPrimary,
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {cta}
        </button>
      </Link>
    </div>
  );
}

function TestimonialCard({ name, role, content, avatar }: { name: string; role: string; content: string; avatar: string }) {
  return (
    <div
      style={{
        background: colors.bgCard,
        border: `1px solid ${colors.border}`,
        borderRadius: "16px",
        padding: "24px",
        minWidth: "300px",
        maxWidth: "360px",
      }}
    >
      <p style={{ fontSize: "14px", color: colors.textSecondary, lineHeight: 1.7, marginBottom: "20px" }}>"{content}"</p>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            width: "40px",
            height: "40px",
            background: colors.accentDim,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
          }}
        >
          {avatar}
        </div>
        <div>
          <div style={{ fontSize: "14px", fontWeight: 600, color: colors.textPrimary }}>{name}</div>
          <div style={{ fontSize: "12px", color: colors.textDim }}>{role}</div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// MAIN PAGE
// ============================================

export default function LandingPage() {
  const [cosmicScore, setCosmicScore] = useState(78);

  // Animate cosmic score
  useEffect(() => {
    const interval = setInterval(() => {
      setCosmicScore((prev) => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const newScore = prev + change;
        return Math.max(30, Math.min(95, newScore));
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: colors.bg, fontFamily: "'Inter', -apple-system, sans-serif" }}>
      {/* NAVBAR */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "rgba(10,10,11,0.8)",
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
            height: "64px",
          }}
        >
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
            <span style={{ fontSize: "15px", fontWeight: 600, letterSpacing: "0.1em", color: colors.textPrimary }}>
              CRYPTOLOGIC
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Link href="/login">
              <button
                style={{
                  padding: "8px 16px",
                  background: "transparent",
                  border: "none",
                  color: colors.textSecondary,
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Login
              </button>
            </Link>
            <Link href="/register">
              <button
                style={{
                  padding: "8px 20px",
                  background: colors.textPrimary,
                  border: "none",
                  borderRadius: "8px",
                  color: colors.bg,
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section
        style={{
          paddingTop: "160px",
          paddingBottom: "120px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "600px",
            background: `radial-gradient(circle, ${colors.accentDim} 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", maxWidth: "800px", margin: "0 auto", padding: "0 24px" }}>
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              background: colors.bgCard,
              border: `1px solid ${colors.border}`,
              borderRadius: "100px",
              marginBottom: "24px",
              fontSize: "13px",
              color: colors.textSecondary,
            }}
          >
            <Sparkles size={14} style={{ color: colors.accent }} />
            Financial Astrology meets Data Science
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: "clamp(36px, 6vw, 64px)",
              fontWeight: 700,
              lineHeight: 1.1,
              color: colors.textPrimary,
              marginBottom: "24px",
            }}
          >
            Trade Smarter with{" "}
            <span style={{ color: colors.accent }}>Cosmic Intelligence</span>
          </h1>

          <p
            style={{
              fontSize: "18px",
              color: colors.textSecondary,
              lineHeight: 1.7,
              marginBottom: "40px",
              maxWidth: "600px",
              margin: "0 auto 40px",
            }}
          >
            Combine financial astrology with statistical analysis to predict market movements.
            Get unique insights that traditional traders miss.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/register">
              <button
                style={{
                  padding: "14px 32px",
                  background: colors.accent,
                  border: "none",
                  borderRadius: "10px",
                  color: "#000",
                  fontSize: "15px",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                Start Free Trial
                <ChevronRight size={18} />
              </button>
            </Link>
            <Link href="/dashboard">
              <button
                style={{
                  padding: "14px 32px",
                  background: "transparent",
                  border: `1px solid ${colors.border}`,
                  borderRadius: "10px",
                  color: colors.textPrimary,
                  fontSize: "15px",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                View Demo
              </button>
            </Link>
          </div>
        </div>

        {/* Live Cosmic Score Preview */}
        <div
          style={{
            marginTop: "80px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: colors.bgCard,
              border: `1px solid ${colors.border}`,
              borderRadius: "20px",
              padding: "32px 48px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "12px", color: colors.textDim, textTransform: "uppercase", marginBottom: "12px" }}>
              Live Cosmic Score
            </div>
            <div
              style={{
                fontSize: "72px",
                fontWeight: 700,
                color: colors.accent,
                lineHeight: 1,
              }}
            >
              {cosmicScore}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", justifyContent: "center", marginTop: "12px" }}>
              <TrendingUp size={16} style={{ color: colors.accent }} />
              <span style={{ fontSize: "14px", color: colors.accent, fontWeight: 500 }}>Bullish</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section style={{ padding: "80px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h2 style={{ fontSize: "32px", fontWeight: 700, color: colors.textPrimary, marginBottom: "16px" }}>
            Why Cryptologic?
          </h2>
          <p style={{ fontSize: "16px", color: colors.textSecondary, maxWidth: "500px", margin: "0 auto" }}>
            Unique tools that give you an edge in the crypto market
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
          <FeatureCard
            icon={Moon}
            title="Cosmic Score Algorithm"
            description="Proprietary algorithm combining planetary positions with historical price data to predict market movements."
          />
          <FeatureCard
            icon={BarChart3}
            title="15,000+ Cryptocurrencies"
            description="Search and analyze any cryptocurrency in the market. Real-time data from CoinGecko API."
          />
          <FeatureCard
            icon={Star}
            title="Personal Watchlist"
            description="Save your favorite coins and track their cosmic scores. Get notified when opportunities arise."
          />
          <FeatureCard
            icon={Bell}
            title="Telegram Alerts"
            description="Receive instant notifications for significant score changes and astrological events."
          />
          <FeatureCard
            icon={Shield}
            title="Historical Proof"
            description="See how cosmic events correlated with past price movements. Data-backed insights."
          />
          <FeatureCard
            icon={Zap}
            title="Real-Time Updates"
            description="Live price updates and cosmic score calculations. Never miss a trading opportunity."
          />
        </div>
      </section>

      {/* PRICING SECTION */}
      <section style={{ padding: "80px 24px", background: colors.bgCard }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 style={{ fontSize: "32px", fontWeight: 700, color: colors.textPrimary, marginBottom: "16px" }}>
              Simple Pricing
            </h2>
            <p style={{ fontSize: "16px", color: colors.textSecondary }}>Start free, upgrade when you're ready</p>
          </div>

          <div style={{ display: "flex", gap: "24px", justifyContent: "center", flexWrap: "wrap" }}>
            <PricingCard
              title="Lite"
              price="Free"
              features={["Bitcoin Cosmic Score", "Basic Event Calendar", "Community Access"]}
              cta="Start Free"
            />
            <PricingCard
              title="Pro"
              price="99K"
              features={[
                "All 15,000+ Coins",
                "Personal Watchlist (20)",
                "Telegram Alerts",
                "Historical Data",
                "Priority Support",
              ]}
              popular
              cta="Upgrade to Pro"
            />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "80px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h2 style={{ fontSize: "32px", fontWeight: 700, color: colors.textPrimary, marginBottom: "16px" }}>
            Trusted by Traders
          </h2>
        </div>

        <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
          <TestimonialCard
            name="Andi Pratama"
            role="Crypto Trader"
            content="Awalnya skeptis, tapi setelah coba sebulan, ternyata cosmic score sering benar. Timing entry jadi lebih bagus."
            avatar="🧑‍💼"
          />
          <TestimonialCard
            name="Dewi Lestari"
            role="DeFi Investor"
            content="Fitur watchlist sangat membantu. Bisa track altcoin favorit dan dapat alert sebelum pump."
            avatar="👩‍💻"
          />
          <TestimonialCard
            name="Budi Santoso"
            role="Swing Trader"
            content="Kombinasi astrology + data ini unik banget. Belum ada platform lain yang offer seperti ini."
            avatar="👨‍🔬"
          />
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        style={{
          padding: "100px 24px",
          textAlign: "center",
          background: `linear-gradient(180deg, ${colors.bg} 0%, ${colors.bgCard} 100%)`,
        }}
      >
        <h2 style={{ fontSize: "36px", fontWeight: 700, color: colors.textPrimary, marginBottom: "16px" }}>
          Ready to Trade with Cosmic Insight?
        </h2>
        <p style={{ fontSize: "16px", color: colors.textSecondary, marginBottom: "32px" }}>
          Join thousands of traders using celestial intelligence
        </p>
        <Link href="/register">
          <button
            style={{
              padding: "16px 40px",
              background: colors.accent,
              border: "none",
              borderRadius: "12px",
              color: "#000",
              fontSize: "16px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Get Started Free
          </button>
        </Link>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          padding: "40px 24px",
          borderTop: `1px solid ${colors.border}`,
          textAlign: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "16px" }}>
          <div
            style={{
              width: "6px",
              height: "6px",
              background: colors.accent,
              borderRadius: "50%",
            }}
          />
          <span style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.1em", color: colors.textSecondary }}>
            CRYPTOLOGIC
          </span>
        </div>
        <p style={{ fontSize: "12px", color: colors.textDim }}>
          © 2024 Cryptologic. Financial Astrology & Statistics.
        </p>
        <p style={{ fontSize: "11px", color: colors.textDim, marginTop: "8px" }}>
          Disclaimer: This is not financial advice. Trade at your own risk.
        </p>
      </footer>
    </div>
  );
}
