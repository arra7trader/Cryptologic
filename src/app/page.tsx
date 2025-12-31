"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

// ============================================
// SVG ICONS - Premium Custom Icons
// ============================================

const IconSparkles = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);

const IconTrendingUp = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);

const IconShield = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const IconBell = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

const IconStar = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const IconChevronRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const IconCheck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const IconZap = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
  </svg>
);

const IconBarChart = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" x2="12" y1="20" y2="10" />
    <line x1="18" x2="18" y1="20" y2="4" />
    <line x1="6" x2="6" y1="20" y2="16" />
  </svg>
);

const IconBrain = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
    <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
    <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
    <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
    <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
    <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
    <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
    <path d="M6 18a4 4 0 0 1-1.967-.516" />
    <path d="M19.967 17.484A4 4 0 0 1 18 18" />
  </svg>
);

const IconTarget = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

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
  gold: "#f59e0b",
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
          color: colors.accent,
        }}
      >
        <Icon />
      </div>
      <h3 style={{ fontSize: "18px", fontWeight: 600, color: colors.textPrimary, marginBottom: "8px" }}>{title}</h3>
      <p style={{ fontSize: "14px", color: colors.textSecondary, lineHeight: 1.6 }}>{description}</p>
    </div>
  );
}

function PricingCard({ title, price, priceNote, features, popular, cta }: { title: string; price: string; priceNote?: string; features: string[]; popular?: boolean; cta: string }) {
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
          BEST VALUE
        </div>
      )}
      <h3 style={{ fontSize: "20px", fontWeight: 600, color: colors.textPrimary, marginBottom: "8px" }}>{title}</h3>
      <div style={{ marginBottom: "8px" }}>
        <span style={{ fontSize: "40px", fontWeight: 700, color: colors.textPrimary }}>{price}</span>
        {price !== "Free" && <span style={{ fontSize: "14px", color: colors.textSecondary }}>/bulan</span>}
      </div>
      {priceNote && (
        <div style={{ fontSize: "12px", color: colors.accent, marginBottom: "16px" }}>{priceNote}</div>
      )}
      <ul style={{ listStyle: "none", padding: 0, marginBottom: "28px" }}>
        {features.map((feature, i) => (
          <li key={i} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px", fontSize: "14px", color: colors.textSecondary }}>
            <span style={{ color: colors.accent }}><IconCheck /></span>
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
      <div style={{ display: "flex", gap: "2px", marginBottom: "16px" }}>
        {[1, 2, 3, 4, 5].map((s) => (
          <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill={colors.gold} stroke={colors.gold}>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>
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
          {/* Nansen Badge */}
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
            <span style={{ color: colors.gold }}><IconSparkles /></span>
            <span>Powered by <strong style={{ color: colors.textPrimary }}>Nansen-Level</strong> Analytics</span>
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
            Surface the Signal.{" "}
            <span style={{ color: colors.accent }}>Create Winners.</span>
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
            Institutional-grade crypto analytics present by <strong style={{ color: colors.textPrimary }}>Nansen.AI</strong> at a fraction of the price.
            Track Smart Money, discover hidden gems, and make data-driven decisions.
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
                <IconChevronRight />
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
              Live Cosmic Score™
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
            <div style={{ display: "flex", alignItems: "center", gap: "6px", justifyContent: "center", marginTop: "12px", color: colors.accent }}>
              <IconTrendingUp />
              <span style={{ fontSize: "14px", fontWeight: 500 }}>Bullish Signal</span>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section style={{ padding: "40px 24px", background: colors.bgCard }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", textAlign: "center" }}>
          {[
            { value: "15,000+", label: "Cryptocurrencies" },
            { value: "300M+", label: "Smart Money Signals" },
            { value: "$150 → Rp99K", label: "Vs Nansen Pro Price" },
            { value: "93%", label: "Cost Savings" },
          ].map((stat, i) => (
            <div key={i}>
              <div style={{ fontSize: "24px", fontWeight: 700, color: colors.textPrimary, marginBottom: "4px" }}>{stat.value}</div>
              <div style={{ fontSize: "12px", color: colors.textDim }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section style={{ padding: "80px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <div style={{ fontSize: "13px", color: colors.accent, fontWeight: 600, marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Why Choose Cryptologic
          </div>
          <h2 style={{ fontSize: "32px", fontWeight: 700, color: colors.textPrimary, marginBottom: "16px" }}>
            Nansen-Level Intelligence. Startup-Friendly Price.
          </h2>
          <p style={{ fontSize: "16px", color: colors.textSecondary, maxWidth: "500px", margin: "0 auto" }}>
            Get the same institutional-grade tools used by whales and top funds
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
          <FeatureCard
            icon={IconBrain}
            title="Smart Money Tracking"
            description="Follow institutional wallets, whales, and top performers. Know what the pros are buying before everyone else."
          />
          <FeatureCard
            icon={IconBarChart}
            title="15,000+ Cryptocurrencies"
            description="Search and analyze any cryptocurrency in the market. Real-time data from Nansen.AI with Cosmic Score™ analysis."
          />
          <FeatureCard
            icon={IconStar}
            title="Personal Watchlist"
            description="Save your favorite coins and track their signals. Get notified when opportunities arise."
          />
          <FeatureCard
            icon={IconBell}
            title="Telegram Alerts"
            description="Receive instant notifications for significant movements and Smart Money signals."
          />
          <FeatureCard
            icon={IconShield}
            title="Historical Analysis"
            description="See how signals correlated with past price movements. Data-backed insights you can trust."
          />
          <FeatureCard
            icon={IconZap}
            title="Real-Time Updates"
            description="Live price updates and signal calculations. Never miss a trading opportunity."
          />
        </div>
      </section>

      {/* PRICING SECTION */}
      <section style={{ padding: "80px 24px", background: colors.bgCard }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 style={{ fontSize: "32px", fontWeight: 700, color: colors.textPrimary, marginBottom: "16px" }}>
              Simple, Transparent Pricing
            </h2>
            <p style={{ fontSize: "16px", color: colors.textSecondary }}>
              Pay <strong style={{ color: colors.accent }}>93% less</strong> than Nansen Pro. Get similar insights.
            </p>
          </div>

          <div style={{ display: "flex", gap: "24px", justifyContent: "center", flexWrap: "wrap" }}>
            <PricingCard
              title="Lite"
              price="Free"
              features={["Bitcoin Cosmic Score", "Basic Market Signals", "Community Access"]}
              cta="Start Free"
            />
            <PricingCard
              title="Pro"
              price="Rp99K"
              priceNote="vs Nansen $150/mo - Save 93%!"
              features={[
                "All 15,000+ Coins",
                "Smart Money Alerts",
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
            Trusted by Smart Traders
          </h2>
        </div>

        <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
          <TestimonialCard
            name="@cryptowhale_id"
            role="DeFi Investor"
            content="Finally, Nansen-level analytics without breaking the bank. My portfolio is up 300% since using Cryptologic."
            avatar="🐋"
          />
          <TestimonialCard
            name="@trader_pro"
            role="Full-time Trader"
            content="The Cosmic Score is incredibly accurate. It helped me spot hidden gems before they pumped. Worth every penny!"
            avatar="📈"
          />
          <TestimonialCard
            name="@alex_defi"
            role="Crypto Analyst"
            content="I was paying $150/mo for Nansen. Switched to Cryptologic and getting almost the same insights for 6 bucks. Insane value."
            avatar="🔍"
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
          Ready to Trade Like Smart Money?
        </h2>
        <p style={{ fontSize: "16px", color: colors.textSecondary, marginBottom: "32px" }}>
          Join thousands of traders using Nansen-level intelligence at 93% less cost
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
          © 2024 Cryptologic. Nansen-Level Analytics at Startup-Friendly Prices.
        </p>
        <p style={{ fontSize: "11px", color: colors.textDim, marginTop: "8px" }}>
          Disclaimer: This is not financial advice. Trade at your own risk.
        </p>
      </footer>
    </div>
  );
}
