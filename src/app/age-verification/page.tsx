'use client'

import { useRouter } from 'next/navigation'
import { SITE_CONFIG } from '@/config/siteConfig'
import { ShieldAlert, CheckCircle2, XCircle } from 'lucide-react'

export default function AgeVerification() {
  const router = useRouter()

  const handleEnter = () => {
    router.push('/home')
  }

  const handleLeave = () => {
    window.location.href = 'https://www.google.com'
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-8 text-center">
        
        <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-400">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            {SITE_CONFIG.shortName || SITE_CONFIG.mistressName}的专属圣殿
          </h1>
          <p className="font-serif italic text-lg text-neutral-400">
            ... 若有胆量，便踏入此地 ...
          </p>
        </div>

        <div className="text-left text-xs sm:text-sm text-neutral-300 space-y-4 bg-neutral-950 p-6 rounded-2xl border border-neutral-800/80 leading-relaxed">
          <p>
            这里是 {SITE_CONFIG.mistressName} 的私人官方领地，一位专业的女王统治者（Dominatrix）。本站包含成人生活方式及知情同意的力量支配/臣服（BDSM）内容，包含支配、束缚、调教与臣服相关的图文信息与高定美学表达。
          </p>
          <p className="font-semibold text-neutral-200">
            进入前请务必确认并同意以下法定条款：
          </p>
          <ul className="space-y-2 text-neutral-400">
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">✓</span> 我已年满 18 周岁（或达到我所在国家/地区的法定成年年龄）。
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">✓</span> 本站所有内容仅供我个人私密浏览，绝不向任何未成年人展示或传播。
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">✓</span> 本站所有代码、视觉形象、艺术肖像及文字均受版权严格保护，未经许可严禁转载。
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <button 
            onClick={handleEnter}
            className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 text-neutral-950 font-bold text-sm hover:brightness-110 active:scale-[0.98] transition flex items-center justify-center gap-2 shadow-lg"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>我已年满18岁 / 踏入圣殿</span>
          </button>
          <button 
            onClick={handleLeave}
            className="flex-1 py-3.5 px-6 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-medium text-sm transition flex items-center justify-center gap-2"
          >
            <XCircle className="w-4 h-4" />
            <span>离开 / 退出</span>
          </button>
        </div>
      </div>
    </div>
  )
}

