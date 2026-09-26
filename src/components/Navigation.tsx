'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SITE_CONFIG } from '@/config/siteConfig'
import { Sparkles, Crown } from 'lucide-react'

export default function Navigation() {
  const pathname = usePathname()
  
  return (
    <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3.5 md:py-4">
          {/* Brand Logo / Name */}
          <Link href="/home" className="flex items-center gap-2 group">
            <Crown className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
            <span className="font-orbitron text-base md:text-lg font-bold tracking-wider text-white group-hover:text-amber-300 transition-colors">
              {SITE_CONFIG.shortName || SITE_CONFIG.mistressName}
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="flex items-center flex-wrap gap-1 sm:gap-4 md:gap-6">
            {SITE_CONFIG.navItems.map((item, index) => {
              const isActive = pathname === item.path
              const isHighlight = item.highlight

              return (
                <Link
                  key={index}
                  href={item.path}
                  className={`relative px-3.5 py-1.5 font-orbitron text-xs md:text-sm font-semibold rounded-lg transition-all duration-200 flex items-center gap-1.5 ${
                    isHighlight
                      ? isActive
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 font-bold shadow-md'
                        : 'bg-amber-400/20 text-amber-300 hover:bg-amber-400/30 border border-amber-400/40'
                      : isActive
                        ? 'text-amber-300 font-semibold border-b-2 border-amber-400 rounded-none'
                        : 'text-neutral-400 hover:text-white hover:bg-neutral-900/60'
                  }`}
                >
                  {isHighlight && <Sparkles className="w-3.5 h-3.5 fill-current animate-pulse text-amber-400" />}
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </header>
  )
}


