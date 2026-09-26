'use client'

import Link from 'next/link'
import { SITE_CONFIG } from '@/config/siteConfig'
import { Sparkles, Crown, Heart, ArrowRight, ShieldCheck, Flame, Coins, Zap, Skull, AlertTriangle } from 'lucide-react'

export default function Home() {
  const marqueeList = [...SITE_CONFIG.recentTributes, ...SITE_CONFIG.recentTributes]

  const getBadgeIcon = (index: number) => {
    const icons = ['👑', '👠', '🖤', '💎', '⚡', '💰']
    return icons[index % icons.length]
  }

  return (
    <div className="relative min-h-[92vh] bg-neutral-950 text-neutral-100 flex flex-col justify-center overflow-hidden font-poppins">
      {/* Aggressive Red & Gold Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(220,38,38,0.18),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(217,119,6,0.12),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 text-center space-y-10">
        
        {/* Top Aggressive Pill */}
        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-neutral-900/90 border border-rose-600/50 backdrop-blur-md shadow-[0_0_20px_rgba(225,29,72,0.3)]">
          <Skull className="w-4 h-4 text-rose-500 animate-bounce" />
          <span className="font-orbitron text-xs tracking-widest text-rose-400 font-bold uppercase">
            女S 😈 专收纯种ATM奴 • 放弃人格沦为提款畜生
          </span>
        </div>

        {/* Hero Totems */}
        <div className="flex items-center justify-center gap-5 sm:gap-7 select-none">
          {/* 细高跟鞋 Totem */}
          <div className="flex flex-col items-center gap-1.5 p-3 sm:p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 shadow-xl hover:border-amber-400/60 hover:scale-105 transition-all duration-300">
            <span className="text-3xl filter drop-shadow-[0_0_12px_rgba(251,191,36,0.5)]">👠</span>
            <span className="font-orbitron text-[10px] text-amber-300 tracking-wider font-semibold">脚底亲妈</span>
          </div>

          {/* 黑心 Totem */}
          <div className="flex flex-col items-center gap-2 p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-900 border border-rose-500/60 shadow-2xl scale-110">
            <Heart className="w-9 h-9 text-rose-600 fill-rose-600/40 filter drop-shadow-[0_0_18px_rgba(225,29,72,0.7)] animate-pulse" />
            <span className="font-orbitron text-[11px] text-rose-400 font-extrabold tracking-widest">无条件上交</span>
          </div>

          {/* 皮鞭 Totem */}
          <div className="flex flex-col items-center gap-1.5 p-3 sm:p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 shadow-xl hover:border-rose-500/60 hover:scale-105 transition-all duration-300">
            <span className="text-3xl filter drop-shadow-[0_0_12px_rgba(225,29,72,0.5)]">🖤</span>
            <span className="font-orbitron text-[10px] text-rose-300 tracking-wider font-semibold">治疗贡瘾</span>
          </div>
        </div>

        {/* Queen Title & Fierce Tagline */}
        <div className="space-y-3">
          <h1 className="font-orbitron text-4xl sm:text-6xl md:text-7xl font-black tracking-wider text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]">
            {SITE_CONFIG.mistressName}
          </h1>

          <p className="font-orbitron text-xs sm:text-sm md:text-base font-bold tracking-[0.25em] text-rose-500 uppercase">
            {SITE_CONFIG.tagline}
          </p>
        </div>

        {/* Severe Bio Declaration */}
        <div className="max-w-3xl mx-auto bg-gradient-to-b from-neutral-900/90 to-neutral-950 border border-rose-900/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <p className="text-sm sm:text-base text-neutral-200 leading-relaxed font-normal">
            女S 😈 出原味🉑定制，专收纯种ATM奴。线下可足、调（无性无裸）4爱、前高、恋足、羞辱、pegging、龟责、榨精、原味定制。😘 谢谢每一个喜欢我的宝子 / 线下问题入门再问。
          </p>

          {/* S-Tier Tags Grid */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {SITE_CONFIG.tags.map((tag, i) => (
              <span 
                key={i}
                className="px-3 py-1 rounded-lg text-xs font-semibold bg-neutral-950 border border-neutral-800 text-neutral-300 hover:border-amber-400/50 hover:text-amber-300 transition"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* 6 House Rules - Fierce & Demanding */}
          <div className="pt-4 border-t border-neutral-800/80 space-y-3 text-left">
            <div className="flex items-center gap-2 text-rose-500 font-orbitron text-xs font-bold uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>女王门规六条 • 不遵守直接滚</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SITE_CONFIG.houseRules.map((rule, idx) => (
                <div 
                  key={idx}
                  className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 hover:border-rose-600/40 transition space-y-1"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-orbitron text-xs font-black text-rose-500 bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/30">
                      {rule.num}
                    </span>
                    <span className="font-orbitron text-xs font-bold text-white">
                      {rule.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-snug font-light pl-6">
                    {rule.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button - Direct to Wardrobe & Vault */}
        <div className="pt-2 flex items-center justify-center">
          <Link
            href="/wardrobe"
            className="px-10 py-4 rounded-2xl bg-gradient-to-r from-rose-600 via-amber-500 to-rose-600 text-white font-orbitron font-extrabold text-sm tracking-widest shadow-[0_0_35px_rgba(225,29,72,0.4)] hover:brightness-110 active:scale-[0.98] transition flex items-center gap-3 group"
          >
            <Sparkles className="w-4 h-4 fill-white group-hover:rotate-12 transition-transform" />
            <span>立即滚进来上交 • 为女王买单</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        {/* Continuous Marquee Ticker: 金库最新上交记录 • 功德印记 */}
        <div className="pt-4 space-y-3">
          <div className="flex items-center justify-center gap-2">
            <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="font-orbitron text-xs uppercase tracking-[0.2em] text-neutral-400 font-semibold">
              金库最新上交记录 • 功德印记 (实时更新)
            </span>
          </div>

          {/* Marquee Ticker Container */}
          <div className="relative w-full overflow-hidden mask-fade py-2">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-neutral-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-neutral-950 to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee gap-3.5">
              {marqueeList.map((t, idx) => (
                <div
                  key={idx}
                  className="w-[290px] shrink-0 bg-neutral-900/80 hover:bg-neutral-900 border border-neutral-800 hover:border-amber-400/40 rounded-2xl p-3.5 text-left transition-all duration-300 shadow-lg space-y-1.5 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{getBadgeIcon(idx)}</span>
                      <span className="text-xs font-semibold text-neutral-200 truncate max-w-[130px]">
                        {t.name}
                      </span>
                    </div>
                    <span className="font-orbitron text-xs font-bold text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
                      {t.amount}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-neutral-400">
                    <span className="text-amber-400/80 font-medium truncate max-w-[170px]">{t.item}</span>
                    <span className="text-[10px] font-mono text-neutral-500">{t.time}</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 italic truncate font-light">
                    "{t.note}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}