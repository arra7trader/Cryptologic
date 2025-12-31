"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Zap,
  TrendingUp,
  Shield,
  Globe,
  BarChart3,
  Wallet,
  Target,
  Brain,
  Award,
  ChevronRight,
  Star,
  Users,
  ArrowRight,
  Check,
  Sparkles,
  Eye,
  Layers,
  Activity,
} from "lucide-react";

// ============================================
// COLORS - Premium Dark Theme
// ============================================
const colors = {
  bg: "#09090b",
  bgCard: "#0f0f11",
  bgGlass: "rgba(15,15,17,0.8)",
  border: "rgba(255,255,255,0.06)",
  borderLight: "rgba(255,255,255,0.1)",
  textPrimary: "#fafafa",
  textSecondary: "#a1a1aa",
  textDim: "#71717a",
  accent: "#6366f1", // Indigo
  accentLight: "#818cf8",
  green: "#10b981",
  purple: "#a855f7",
  gold: "#f59e0b",
  gradient1: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
  gradient2: "linear-gradient(135deg, #10b981 0%, #6366f1 100%)",
};

// ============================================
// COMPONENTS
// ============================================

function GlowOrb({ color, size, top, left, opacity = 0.15 }: { color: string; size: number; top: string; left: string; opacity?: number }) {
  return (
    <div
      style={{
        position: "absolute",
        width: `${size}px`,
        height: `${size}px`,
        background: color,
        borderRadius: "50%",
        filter: `blur(${size / 2}px)`,
        opacity,
        top,
        left,
        pointerEvents: "none",
      }}
    />
  );
}

function FeatureCard({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) {
  return (
    <div
      style={{
        background: colors.bgCard,
        border: `1px solid ${colors.border}`,
        borderRadius: "16px",
        padding: "28px",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = colors.accent;
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = colors.border;
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          background: `linear-gradient(135deg, ${colors.accent}20 0%, ${colors.purple}20 100%)`,
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <Icon size={24} style={{ color: colors.accent }} />
      </div>
      <h3 style={{ fontSize: "18px", fontWeight: 600, color: colors.textPrimary, marginBottom: "10px" }}>{title}</h3>
      <p style={{ fontSize: "14px", color: colors.textSecondary, lineHeight: 1.7 }}>{desc}</p>
    </div>
  );
}

// ============================================
// MAIN LANDING PAGE
// ============================================

export default function LandingPage() {
  const [cosmicScore, setCosmicScore] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCosmicScore(Math.floor(Math.random() * 15) + 78);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ background: colors.bg, minHeight: "100vh", fontFamily: "'Inter', -apple-system, sans-serif", position: "relative", overflow: "hidden" }}>
      {/* Background Effects */}
      <GlowOrb color={colors.accent} size={600} top="-200px" left="50%" opacity={0.08} />
      <GlowOrb color={colors.purple} size={400} top="40%" left="-100px" opacity={0.06} />
      <GlowOrb color={colors.green} size={300} top="60%" left="80%" opacity={0.05} />

      {/* Navbar */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: colors.bgGlass,
          backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                background: colors.gradient1,
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Zap size={18} style={{ color: "#fff" }} />
            </div>
            <span style={{ fontSize: "18px", fontWeight: 700, color: colors.textPrimary, letterSpacing: "-0.02em" }}>Cryptologic</span>
            <span
              style={{
                fontSize: "10px",
                padding: "3px 8px",
                background: `${colors.green}20`,
                color: colors.green,
                borderRadius: "4px",
                fontWeight: 600,
              }}
            >
              BETA
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <Link href="/dashboard" style={{ fontSize: "14px", color: colors.textSecondary, textDecoration: "none" }}>Dashboard</Link>
            <Link href="/login" style={{ fontSize: "14px", color: colors.textSecondary, textDecoration: "none" }}>Login</Link>
            <Link
              href="/register"
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#fff",
                background: colors.gradient1,
                padding: "10px 20px",
                borderRadius: "8px",
                textDecoration: "none",
              }}
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ paddingTop: "160px", paddingBottom: "80px", position: "relative" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: colors.bgCard,
              border: `1px solid ${colors.border}`,
              borderRadius: "100px",
              padding: "8px 16px",
              marginBottom: "32px",
            }}
          >
            <Sparkles size={14} style={{ color: colors.gold }} />
            <span style={{ fontSize: "13px", color: colors.textSecondary }}>Powered by <strong style={{ color: colors.textPrimary }}>Nansen-Level</strong> Analytics</span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: "clamp(40px, 6vw, 72px)",
              fontWeight: 800,
              color: colors.textPrimary,
              lineHeight: 1.1,
              marginBottom: "24px",
              letterSpacing: "-0.03em",
            }}
          >
            Surface the Signal.<br />
            <span style={{ background: colors.gradient1, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Create Winners.
            </span>
          </h1>

          <p style={{ fontSize: "18px", color: colors.textSecondary, maxWidth: "600px", margin: "0 auto 40px", lineHeight: 1.7 }}>
            Institutional-grade crypto analytics at a fraction of the price. Track <strong style={{ color: colors.textPrimary }}>Smart Money</strong> movements,
            discover hidden gems, and make data-driven decisions like the pros.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", marginBottom: "60px" }}>
            <Link
              href="/register"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: colors.gradient1,
                color: "#fff",
                padding: "16px 32px",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Start Free Trial
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/dashboard"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: colors.bgCard,
                border: `1px solid ${colors.border}`,
                color: colors.textPrimary,
                padding: "16px 32px",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              <Eye size={18} />
              View Demo
            </Link>
          </div>

          {/* Stats Bar */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1px",
              background: colors.border,
              borderRadius: "16px",
              overflow: "hidden",
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            {[
              { value: "15,000+", label: "Cryptocurrencies" },
              { value: "300M+", label: "Labeled Addresses" },
              { value: "24/7", label: "Real-Time Data" },
              { value: "99%", label: "Accuracy Rate" },
            ].map((stat, i) => (
              <div key={i} style={{ background: colors.bgCard, padding: "24px", textAlign: "center" }}>
                <div style={{ fontSize: "28px", fontWeight: 700, color: colors.textPrimary, marginBottom: "4px" }}>{stat.value}</div>
                <div style={{ fontSize: "13px", color: colors.textDim }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cosmic Score Preview */}
      <section style={{ padding: "60px 24px", background: `linear-gradient(180deg, transparent 0%, ${colors.bgCard} 100%)` }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <div
            style={{
              background: colors.bgCard,
              border: `1px solid ${colors.border}`,
              borderRadius: "24px",
              padding: "48px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <GlowOrb color={colors.accent} size={200} top="50%" left="50%" opacity={0.1} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: "14px", color: colors.textDim, marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Exclusive Algorithm
              </div>
              <h2 style={{ fontSize: "32px", fontWeight: 700, color: colors.textPrimary, marginBottom: "24px" }}>
                Cosmic Score™
              </h2>
              <div
                style={{
                  width: "160px",
                  height: "160px",
                  borderRadius: "50%",
                  background: `conic-gradient(${colors.accent} ${cosmicScore}%, ${colors.border} ${cosmicScore}%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 24px",
                  boxShadow: `0 0 60px ${colors.accent}40`,
                }}
              >
                <div
                  style={{
                    width: "130px",
                    height: "130px",
                    borderRadius: "50%",
                    background: colors.bgCard,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <span style={{ fontSize: "40px", fontWeight: 800, color: colors.accent }}>{cosmicScore}</span>
                  <span style={{ fontSize: "12px", color: colors.textDim }}>/ 100</span>
                </div>
              </div>
              <p style={{ fontSize: "15px", color: colors.textSecondary, maxWidth: "400px", margin: "0 auto" }}>
                Advanced AI-powered scoring system that combines on-chain metrics, sentiment analysis, and whale movements into a single actionable signal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <div style={{ fontSize: "14px", color: colors.accent, fontWeight: 600, marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Why Choose Cryptologic
            </div>
            <h2 style={{ fontSize: "40px", fontWeight: 700, color: colors.textPrimary, marginBottom: "16px" }}>
              Nansen-Level Intelligence.<br />
              <span style={{ color: colors.textSecondary }}>Startup-Friendly Pricing.</span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            <FeatureCard icon={Brain} title="Smart Money Tracking" desc="Follow the movements of institutional wallets, whales, and top performers. Know what the pros are buying before everyone else." />
            <FeatureCard icon={Target} title="Real-Time Signals" desc="Get instant alerts when significant on-chain activity occurs. Never miss a profitable opportunity again." />
            <FeatureCard icon={BarChart3} title="Advanced Analytics" desc="Deep dive into token metrics, holder distribution, and historical patterns with our comprehensive dashboard." />
            <FeatureCard icon={Layers} title="Multi-Chain Coverage" desc="Track assets across Ethereum, BSC, Polygon, Arbitrum, and 20+ more chains from a single interface." />
            <FeatureCard icon={Activity} title="Market Sentiment" desc="AI-powered sentiment analysis from social media, news, and community discussions." />
            <FeatureCard icon={Award} title="Pro Strategies" desc="Access curated investment strategies used by top crypto funds and research teams." />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section style={{ padding: "100px 24px", background: colors.bgCard }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 style={{ fontSize: "40px", fontWeight: 700, color: colors.textPrimary, marginBottom: "16px" }}>
              Simple, Transparent Pricing
            </h2>
            <p style={{ fontSize: "16px", color: colors.textSecondary }}>
              Pay 90% less than competitors. Get 100% of the alpha.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }}>
            {/* Free Tier */}
            <div
              style={{
                background: colors.bg,
                border: `1px solid ${colors.border}`,
                borderRadius: "20px",
                padding: "40px",
              }}
            >
              <div style={{ fontSize: "14px", color: colors.textDim, marginBottom: "8px" }}>Lite</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "24px" }}>
                <span style={{ fontSize: "48px", fontWeight: 800, color: colors.textPrimary }}>$0</span>
                <span style={{ fontSize: "16px", color: colors.textDim }}>/forever</span>
              </div>
              <p style={{ fontSize: "14px", color: colors.textSecondary, marginBottom: "32px" }}>Perfect for getting started with crypto analytics</p>
              <Link
                href="/register"
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "14px",
                  background: colors.bgCard,
                  border: `1px solid ${colors.border}`,
                  borderRadius: "10px",
                  color: colors.textPrimary,
                  textDecoration: "none",
                  fontWeight: 600,
                  marginBottom: "32px",
                }}
              >
                Get Started Free
              </Link>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {["Top 1 Crypto Access", "Basic Cosmic Score", "Daily Market Summary", "Email Support"].map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <Check size={16} style={{ color: colors.green }} />
                    <span style={{ fontSize: "14px", color: colors.textSecondary }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pro Tier */}
            <div
              style={{
                background: `linear-gradient(135deg, ${colors.accent}10 0%, ${colors.purple}10 100%)`,
                border: `2px solid ${colors.accent}`,
                borderRadius: "20px",
                padding: "40px",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-12px",
                  right: "24px",
                  background: colors.gradient1,
                  color: "#fff",
                  fontSize: "11px",
                  fontWeight: 700,
                  padding: "6px 12px",
                  borderRadius: "100px",
                }}
              >
                BEST VALUE
              </div>
              <div style={{ fontSize: "14px", color: colors.accent, marginBottom: "8px", fontWeight: 600 }}>Pro</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "8px" }}>
                <span style={{ fontSize: "48px", fontWeight: 800, color: colors.textPrimary }}>Rp99K</span>
                <span style={{ fontSize: "16px", color: colors.textDim }}>/month</span>
              </div>
              <div style={{ fontSize: "13px", color: colors.green, marginBottom: "24px" }}>
                <s style={{ color: colors.textDim }}>Rp1.500K</s> Save 93%
              </div>
              <Link
                href="/register"
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "14px",
                  background: colors.gradient1,
                  borderRadius: "10px",
                  color: "#fff",
                  textDecoration: "none",
                  fontWeight: 600,
                  marginBottom: "32px",
                }}
              >
                Upgrade to Pro
              </Link>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {[
                  "All 15,000+ Cryptocurrencies",
                  "Full Cosmic Score™ Analysis",
                  "Smart Money Alerts",
                  "Real-Time Whale Tracking",
                  "Advanced Watchlist",
                  "Priority Support",
                  "Early Access Features",
                ].map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <Check size={16} style={{ color: colors.accent }} />
                    <span style={{ fontSize: "14px", color: colors.textPrimary }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Comparison Note */}
          <div style={{ textAlign: "center", marginTop: "40px", padding: "24px", background: colors.bg, borderRadius: "12px", border: `1px solid ${colors.border}` }}>
            <p style={{ fontSize: "14px", color: colors.textSecondary }}>
              <strong style={{ color: colors.textPrimary }}>Nansen Pro costs $150/month.</strong> Get similar features for only <strong style={{ color: colors.green }}>Rp99K ($6)</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 style={{ fontSize: "40px", fontWeight: 700, color: colors.textPrimary }}>
              Loved by Smart Traders
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {[
              { text: "Finally, Nansen-level analytics that doesn't break the bank. My portfolio is up 300% since I started using Cryptologic.", user: "@cryptowhale_id", role: "DeFi Investor" },
              { text: "The Cosmic Score is incredibly accurate. It helped me spot hidden gems before they pumped. Worth every penny!", user: "@trader_pro", role: "Full-time Trader" },
              { text: "I was paying $150/mo for Nansen. Switched to Cryptologic and getting almost the same insights for 6 bucks. Insane value.", user: "@alex_defi", role: "Crypto Analyst" },
            ].map((t, i) => (
              <div
                key={i}
                style={{
                  background: colors.bgCard,
                  border: `1px solid ${colors.border}`,
                  borderRadius: "16px",
                  padding: "28px",
                }}
              >
                <div style={{ display: "flex", gap: "4px", marginBottom: "16px" }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={16} fill={colors.gold} style={{ color: colors.gold }} />
                  ))}
                </div>
                <p style={{ fontSize: "14px", color: colors.textSecondary, lineHeight: 1.7, marginBottom: "20px" }}>"{t.text}"</p>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: colors.textPrimary }}>{t.user}</div>
                  <div style={{ fontSize: "12px", color: colors.textDim }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ padding: "100px 24px", background: `linear-gradient(180deg, ${colors.bg} 0%, ${colors.accent}10 100%)` }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "48px", fontWeight: 800, color: colors.textPrimary, marginBottom: "24px" }}>
            Ready to Trade Smarter?
          </h2>
          <p style={{ fontSize: "18px", color: colors.textSecondary, marginBottom: "40px" }}>
            Join thousands of traders who are already using Cryptologic to find alpha. Start for free, upgrade when you're ready.
          </p>
          <Link
            href="/register"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: colors.gradient1,
              color: "#fff",
              padding: "18px 40px",
              borderRadius: "12px",
              fontSize: "18px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Get Started Free
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: "40px 24px", borderTop: `1px solid ${colors.border}` }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "28px",
                height: "28px",
                background: colors.gradient1,
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Zap size={14} style={{ color: "#fff" }} />
            </div>
            <span style={{ fontSize: "14px", color: colors.textSecondary }}>© 2024 Cryptologic. All rights reserved.</span>
          </div>
          <div style={{ display: "flex", gap: "24px" }}>
            <Link href="#" style={{ fontSize: "13px", color: colors.textDim, textDecoration: "none" }}>Privacy</Link>
            <Link href="#" style={{ fontSize: "13px", color: colors.textDim, textDecoration: "none" }}>Terms</Link>
            <Link href="#" style={{ fontSize: "13px", color: colors.textDim, textDecoration: "none" }}>Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
