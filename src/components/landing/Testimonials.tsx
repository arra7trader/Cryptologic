"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { colors } from "@/lib/constants";

export default function Testimonials() {
    const { t } = useLanguage();

    const testimonials = [
        // Indonesian
        { name: "@cryptowhale_id", role: "DeFi Investor, Jakarta", content: "Finally, Glassnode-level analytics without breaking the bank. Portfolio up 300%!", avatar: "🐋", flag: "🇮🇩" },
        { name: "@trader_pro", role: "Full-time Trader, Surabaya", content: "Cosmic Score helped me spot gems before they pumped. Worth every penny!", avatar: "📈", flag: "🇮🇩" },
        { name: "Budi Santoso", role: "Swing Trader, Bandung", content: "Dari bayar Glassnode $2K/bln, sekarang cuma $14. Gila sih value-nya!", avatar: "💰", flag: "🇮🇩" },
        { name: "@defi_hunter", role: "Crypto Analyst, Medan", content: "Smart Money tracking-nya akurat banget. Bisa tau whale mau beli apa.", avatar: "🎯", flag: "🇮🇩" },
        { name: "Dewi Lestari", role: "Investor, Bali", content: "Watchlist + Telegram alerts bikin ga pernah ketinggalan momentum.", avatar: "⚡", flag: "🇮🇩" },
        // Chinese
        { name: "李明 (Li Ming)", role: "Quant Trader, Shanghai", content: "比Glassnode便宜99%，但功能差不多。太值了！", avatar: "🔥", flag: "🇨🇳" },
        { name: "王伟 (Wang Wei)", role: "Fund Manager, Beijing", content: "Cosmic Score算法很准确，帮我发现了很多隐藏的机会。", avatar: "💎", flag: "🇨🇳" },
        { name: "张三 (Zhang San)", role: "Crypto Enthusiast, Shenzhen", content: "Smart Money追踪功能很强大，能看到大户在买什么。", avatar: "🐳", flag: "🇨🇳" },
        { name: "@crypto_dragon", role: "Day Trader, Hong Kong", content: "Finally found an affordable alternative to expensive analytics tools!", avatar: "🐲", flag: "🇭🇰" },
        { name: "陈小明", role: "DeFi Farmer, Hangzhou", content: "实时数据很快，警报也很及时。推荐！", avatar: "🚀", flag: "🇨🇳" },
        // International
        { name: "@alex_defi", role: "Analyst, New York", content: "Was paying $2K/mo for Glassnode. Same insights for $14. Insane value.", avatar: "🔍", flag: "🇺🇸" },
        { name: "John Smith", role: "Hedge Fund, London", content: "The institutional-grade analytics at this price point is unbelievable.", avatar: "🏦", flag: "🇬🇧" },
        { name: "@tokyo_trader", role: "Pro Trader, Tokyo", content: "Cosmic Score™ is surprisingly accurate. Better than most paid tools.", avatar: "⭐", flag: "🇯🇵" },
        { name: "Hans Mueller", role: "Crypto Fund, Berlin", content: "Switched our entire team from Glassnode. Saving thousands monthly.", avatar: "💼", flag: "🇩🇪" },
        { name: "@sydney_crypto", role: "Investor, Sydney", content: "Best crypto analytics tool I've used. The value is incredible.", avatar: "🦘", flag: "🇦🇺" },
        // More Indonesian
        { name: "Andi Wijaya", role: "Day Trader, Yogyakarta", content: "Pake Cryptologic sebulan, profit naik 200%. Recommended banget!", avatar: "🎯", flag: "🇮🇩" },
        { name: "@altcoin_master", role: "Altcoin Hunter, Semarang", content: "Fitur search 15,000+ coin bikin gampang cari permata tersembunyi.", avatar: "💎", flag: "🇮🇩" },
        { name: "Rizky Pratama", role: "Holder, Makassar", content: "Dashboard clean, data real-time, harga murah. Apa lagi yang dicari?", avatar: "👍", flag: "🇮🇩" },
        // More International
        { name: "@paris_crypto", role: "Trader, Paris", content: "L'analyse de niveau institutionnel à ce prix, c'est incroyable!", avatar: "🗼", flag: "🇫🇷" },
        { name: "Carlos Silva", role: "Investor, São Paulo", content: "Melhor ferramenta de análise cripto que já usei. Valor incrível!", avatar: "🌟", flag: "🇧🇷" },
        { name: "@dubai_whale", role: "Whale, Dubai", content: "Smart Money alerts helped me front-run major moves. Game changer!", avatar: "🏆", flag: "🇦🇪" },
        { name: "Kim Soo-jin", role: "Trader, Seoul", content: "Glassnode 수준의 분석을 이 가격에? 믿을 수 없어요!", avatar: "🇰🇷", flag: "🇰🇷" },
        { name: "@singapore_pro", role: "Fund Manager, Singapore", content: "Our fund switched to Cryptologic. Best decision we made this year.", avatar: "🦁", flag: "🇸🇬" },
        // More Chinese
        { name: "刘强 (Liu Qiang)", role: "Trader, Guangzhou", content: "数据更新速度很快，比其他平台好用很多。", avatar: "⚡", flag: "🇨🇳" },
        { name: "@taiwan_trader", role: "Investor, Taipei", content: "終於有個便宜又好用的分析工具了！", avatar: "🎌", flag: "🇹🇼" },
        // Final batch
        { name: "Mike Chen", role: "VC Partner, SF", content: "We recommend Cryptologic to all our portfolio companies. Huge value.", avatar: "🚀", flag: "🇺🇸" },
        { name: "@mumbai_crypto", role: "Analyst, Mumbai", content: "Glassnode-level insights at affordable prices. Perfect for our market!", avatar: "🇮🇳", flag: "🇮🇳" },
        { name: "Anna Kowalski", role: "Trader, Warsaw", content: "Finally democratized access to institutional-grade crypto analytics!", avatar: "🌍", flag: "🇵🇱" },
        { name: "@jakarta_whale", role: "Big Investor, Jakarta", content: "Sudah pake 6 bulan. ROI dari fee-nya udah 100x lipat!", avatar: "💰", flag: "🇮🇩" },
        { name: "Ahmed Hassan", role: "Trader, Cairo", content: "Best crypto tool in the MENA region. Highly recommended!", avatar: "⭐", flag: "🇪🇬" },
    ];

    return (
        <section style={{ padding: "80px 0", overflow: "hidden" }}>
            <div style={{ textAlign: "center", marginBottom: "60px", padding: "0 24px" }}>
                <h2 style={{ fontSize: "32px", fontWeight: 700, color: colors.textPrimary, marginBottom: "16px" }}>
                    {t("testimonials.title")}
                </h2>
                <p style={{ fontSize: "16px", color: colors.textSecondary }}>
                    {t("testimonials.subtitle")}
                </p>
            </div>

            {/* Row 1 - scrolling left */}
            <div style={{ display: "flex", gap: "20px", animation: "scrollLeft 60s linear infinite", marginBottom: "20px" }}>
                {[...testimonials.slice(0, 15), ...testimonials.slice(0, 15)].map((t, i) => (
                    <div
                        key={i}
                        style={{
                            background: colors.bgCard,
                            border: `1px solid ${colors.border}`,
                            borderRadius: "16px",
                            padding: "20px",
                            minWidth: "320px",
                            maxWidth: "320px",
                            flexShrink: 0,
                        }}
                    >
                        <div style={{ display: "flex", gap: "2px", marginBottom: "12px" }}>
                            {[1, 2, 3, 4, 5].map((s) => (
                                <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill={colors.gold} stroke={colors.gold}>
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                            ))}
                        </div>
                        <p style={{ fontSize: "13px", color: colors.textSecondary, lineHeight: 1.6, marginBottom: "16px", height: "60px", overflow: "hidden" }}>"{t.content}"</p>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <div style={{ width: "36px", height: "36px", background: colors.accentDim, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>
                                {t.avatar}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: "13px", fontWeight: 600, color: colors.textPrimary, display: "flex", alignItems: "center", gap: "6px" }}>
                                    {t.name} <span>{t.flag}</span>
                                </div>
                                <div style={{ fontSize: "11px", color: colors.textDim }}>{t.role}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Row 2 - scrolling right (reverse) */}
            <div style={{ display: "flex", gap: "20px", animation: "scrollRight 60s linear infinite" }}>
                {[...testimonials.slice(15, 30), ...testimonials.slice(15, 30)].map((t, i) => (
                    <div
                        key={i}
                        style={{
                            background: colors.bgCard,
                            border: `1px solid ${colors.border}`,
                            borderRadius: "16px",
                            padding: "20px",
                            minWidth: "320px",
                            maxWidth: "320px",
                            flexShrink: 0,
                        }}
                    >
                        <div style={{ display: "flex", gap: "2px", marginBottom: "12px" }}>
                            {[1, 2, 3, 4, 5].map((s) => (
                                <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill={colors.gold} stroke={colors.gold}>
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                            ))}
                        </div>
                        <p style={{ fontSize: "13px", color: colors.textSecondary, lineHeight: 1.6, marginBottom: "16px", height: "60px", overflow: "hidden" }}>"{t.content}"</p>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <div style={{ width: "36px", height: "36px", background: colors.accentDim, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>
                                {t.avatar}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: "13px", fontWeight: 600, color: colors.textPrimary, display: "flex", alignItems: "center", gap: "6px" }}>
                                    {t.name} <span>{t.flag}</span>
                                </div>
                                <div style={{ fontSize: "11px", color: colors.textDim }}>{t.role}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* CSS Animations */}
            <style jsx global>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scrollRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
        </section>
    );
}
