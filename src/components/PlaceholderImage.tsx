'use client'

import React, { useState } from 'react'
import Image, { StaticImageData } from 'next/image'
import { Sparkles, ShoppingBag, Crown, Gem, Footprints } from 'lucide-react'

interface PlaceholderImageProps {
  src?: string | StaticImageData | null
  alt: string
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'wide'
  className?: string
  priority?: boolean
  label?: string
  category?: string
}

export default function PlaceholderImage({
  src,
  alt,
  aspectRatio = 'portrait',
  className = '',
  priority = false,
  label,
  category
}: PlaceholderImageProps) {
  const [hasError, setHasError] = useState(false)

  // Ratio classes
  const aspectClass = {
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]',
    wide: 'aspect-[16/9]'
  }[aspectRatio]

  // If valid src and not errored, render next/image
  if (src && !hasError) {
    return (
      <div className={`relative overflow-hidden bg-neutral-900 ${aspectClass} ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-center transition-transform duration-500 hover:scale-105"
          onError={() => setHasError(true)}
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    )
  }

  // Fallback Luxury Placeholder
  const getCategoryIcon = () => {
    const cat = category?.toLowerCase() || ''
    if (cat.includes('鞋履') || cat.includes('footwear')) {
      return <Footprints className="w-8 h-8 text-amber-400 stroke-1" />
    }
    if (cat.includes('高定') || cat.includes('couture')) {
      return <Crown className="w-8 h-8 text-amber-400 stroke-1" />
    }
    if (cat.includes('配饰') || cat.includes('accessories')) {
      return <Gem className="w-8 h-8 text-rose-400 stroke-1" />
    }
    if (cat.includes('皮革') || cat.includes('乳胶') || cat.includes('leather')) {
      return <Sparkles className="w-8 h-8 text-rose-500 stroke-1" />
    }
    if (cat.includes('内衣') || cat.includes('lingerie')) {
      return <Sparkles className="w-8 h-8 text-amber-300 stroke-1" />
    }
    return <ShoppingBag className="w-8 h-8 text-neutral-400 stroke-1" />
  }

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-b from-neutral-900 via-neutral-950 to-black border border-neutral-800 flex flex-col items-center justify-center p-6 text-center select-none ${aspectClass} ${className}`}
    >
      {/* Decorative background grid pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
      
      {/* Subtle corner accents */}
      <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-neutral-600"></div>
      <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-neutral-600"></div>
      <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-neutral-600"></div>
      <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-neutral-600"></div>

      <div className="relative z-10 flex flex-col items-center gap-3">
        <div className="p-3.5 rounded-full bg-neutral-900/80 border border-neutral-700/60 shadow-inner">
          {getCategoryIcon()}
        </div>
        <div className="space-y-1">
          <p className="text-xs font-mono uppercase tracking-widest text-neutral-400">
            {label || category || '高定展品'}
          </p>
          <p className="text-[11px] text-neutral-400/80 max-w-[200px] line-clamp-1">
            {alt}
          </p>
          <p className="text-[10px] font-mono text-neutral-400/80">
            [ 专属战袍实物大片 ]
          </p>
        </div>
      </div>
    </div>
  )
}
