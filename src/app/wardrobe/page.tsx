'use client'

import React, { useState } from 'react'
import { SITE_CONFIG, WardrobeItem, TributeTier } from '@/config/siteConfig'
import PlaceholderImage from '@/components/PlaceholderImage'
import TributeModal from '@/components/TributeModal'
import { Sparkles, Heart, Crown, Gift, ShieldCheck, Flame, Coffee, Wine, Gem, ArrowRight, ExternalLink } from 'lucide-react'

export default function WardrobePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('全部')
  const [activeModalItem, setActiveModalItem] = useState<WardrobeItem | null>(null)
  const [activeModalTier, setActiveModalTier] = useState<TributeTier | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const categories = ['全部', '奢华内衣', '仪式配饰', '乳胶与皮革', '鞋履']

  const filteredItems = selectedCategory === '全部'
    ? SITE_CONFIG.wardrobeItems
    : SITE_CONFIG.wardrobeItems.filter(item => item.category === selectedCategory)

  const openItemTribute = (item: WardrobeItem) => {
    setActiveModalItem(item)
    setActiveModalTier(null)
    setIsModalOpen(true)
  }

  const openTierTribute = (tier: TributeTier) => {
    setActiveModalTier(tier)
    setActiveModalItem(null)
    setIsModalOpen(true)
  }

  const getTierIcon = (iconName: string) => {
    switch (iconName) {
      case 'Coffee':
        return <Coffee className="w-5 h-5 text-amber-500" />
      case 'Wine':
        return <Wine className="w-5 h-5 text-purple-400" />
      case 'Crown':
        return <Crown className="w-5 h-5 text-amber-400" /> 
      case 'Gem':
        return <Gem className="w-5 h-5 text-emerald-400" />
      default:
        return <Sparkles className="w-5 h-5 text-rose-400" />
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-poppins">
      {/* 1. Header Hero Section */}
      <section className="relative overflow-hidden border-b border-neutral-800 bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-950 py-14 sm:py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        
        <div className="relative max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-orbitron font-semibold uppercase tracking-widest">
            <Crown className="w-3.5 h-3.5" />
            <span>女S专属置装 • 纯种ATM奴提款圣殿</span>
          </div>

          <h1 className="font-orbitron text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
            {SITE_CONFIG.shortName || SITE_CONFIG.mistressName}的高定衣橱
          </h1>

          <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed font-light">
            只要白痴傻逼狗，不傻逼抓紧滚！进来之后放弃人格成为提款畜生。为你心目中的脚底亲妈买单战袍，或是向金库直接上交。不吐门槛的一分钟直接踹！
          </p>

          {/* Quick CTA Stats */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs text-neutral-400 font-medium">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800">
              <Gift className="w-3.5 h-3.5 text-amber-400" /> 精选高定单品
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800">
              <ShieldCheck className="w-3.5 h-3.5 text-green-400" /> 零多余纠缠 • 极速结算
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800">
              <Flame className="w-3.5 h-3.5 text-rose-400" /> 永载金库功德榜
            </span>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* 2. Direct Tribute / ATM奴现金金库 Tiers */}
        <section id="tribute" className="space-y-6 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 border-b border-neutral-800 pb-4">
            <div>
              <span className="font-orbitron text-xs uppercase tracking-widest text-amber-400 font-semibold">
                ATM奴纯金钱上交 • 无条件贡品
              </span>
              <h2 className="font-orbitron text-2xl sm:text-3xl font-bold text-white mt-1">
                女王金库 (Silent Tribute)
              </h2>
            </div>
            <p className="text-xs text-neutral-400 max-w-md font-light">
              无需挑选具体物品。直接向女王金库输送资金，享受纯粹被支配与无条件买单的最高心理快感。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {SITE_CONFIG.tributeTiers.map((tier) => (
              <div 
                key={tier.id}
                className="bg-neutral-900/80 border border-neutral-800 hover:border-amber-400/50 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-xl bg-neutral-950 border border-neutral-800 group-hover:border-amber-400/30 transition">
                      {getTierIcon(tier.iconName)}
                    </div>
                    <span className="font-orbitron text-xl font-bold text-amber-300">{tier.currency || '¥'}{tier.amount}</span>
                  </div>

                  <h3 className="font-orbitron text-base font-bold text-white group-hover:text-amber-200 transition">
                    {tier.title}
                  </h3>

                  <p className="text-xs text-neutral-400 leading-relaxed font-light">
                    {tier.description}
                  </p>

                  <ul className="text-[11px] text-neutral-300 space-y-1 pt-1 font-light">
                    {tier.perks.map((perk, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => openTierTribute(tier)}
                  className="mt-5 w-full py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-amber-400 hover:text-neutral-950 text-neutral-200 font-orbitron text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Heart className="w-3.5 h-3.5" />
                  <span>上交 {tier.currency || '¥'}{tier.amount}</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Wishlist / Wardrobe Outfits Catalog (严格4件单品) */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-800 pb-4">
            <div>
              <span className="font-orbitron text-xs uppercase tracking-widest text-amber-400 font-semibold">
                高定心愿清单 • 实物单品
              </span>
              <h2 className="font-orbitron text-2xl sm:text-3xl font-bold text-white mt-1">
                女王专属战袍与配饰
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-amber-400 text-neutral-950 font-bold shadow-md'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid - Exactly 4 Items in balanced 4-column layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-neutral-900/60 border border-neutral-800 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-amber-500/40 transition-all duration-300 hover:shadow-2xl"
              >
                {/* Image & Badges */}
                <div className="relative">
                  <PlaceholderImage
                    src={item.image}
                    alt={item.name}
                    aspectRatio="portrait"
                    category={item.category}
                    label={item.brand || item.category}
                  />

                  {/* Status Badge */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {item.status === 'Most Wanted' && (
                      <span className="px-2.5 py-1 rounded-md bg-rose-600/90 backdrop-blur-sm text-[10px] font-orbitron uppercase tracking-wider text-white font-bold shadow">
                        极度渴望 (Most Wanted)
                      </span>
                    )}
                    {item.brand && (
                      <span className="px-2 py-0.5 rounded-md bg-neutral-950/80 backdrop-blur-sm text-[10px] text-neutral-300 font-mono">
                        {item.brand}
                      </span>
                    )}
                  </div>

                  {/* Price Badge */}
                  <div className="absolute bottom-3 right-3 bg-neutral-950/90 backdrop-blur-md px-3 py-1 rounded-lg border border-neutral-800 text-amber-300 font-orbitron font-bold text-sm shadow-lg">
                    {item.currency || '¥'}{item.price}
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-orbitron uppercase tracking-wider text-amber-400/80 font-semibold">
                      {item.category}
                    </span>
                    <h3 className="font-orbitron text-base font-bold text-white group-hover:text-amber-200 transition line-clamp-2">
                      {item.name}
                    </h3>
                    <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-2">
                    <button
                      onClick={() => openItemTribute(item)}
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 text-neutral-950 font-orbitron text-xs font-bold hover:brightness-110 active:scale-[0.98] transition flex items-center justify-center gap-2 shadow-md"
                    >
                      <Gift className="w-3.5 h-3.5" />
                      <span>为女王买单上交 ({item.currency || '¥'}{item.price})</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Interactive Tribute Modal */}
      {isModalOpen && (
        <TributeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          item={activeModalItem}
          tier={activeModalTier}
        />
      )}
    </div>
  )
}
