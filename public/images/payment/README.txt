微信打赏二维码存放说明
========================

请将微信打赏二维码保存为以下文件名：
wechat-qr.png

完整路径应该是：
C:\Zero\JavaScript\Mistress\YanyanS\public\images\payment\wechat-qr.png

图片要求：
- 格式：PNG 或 JPG
- 建议尺寸：至少 400x400 像素
- 文件大小：建议不超过 500KB
- 背景：建议使用白色背景，确保二维码清晰可扫

配置步骤：
1. 将二维码图片保存到此文件夹
2. 打开 src/config/siteConfig.ts
3. 找到 wechatPayQRCode: ""
4. 修改为 wechatPayQRCode: "/images/payment/wechat-qr.png"
5. 保存并重启开发服务器

注意：如果不配置微信二维码，系统会显示"暂未配置"的提示，用户仍可使用加密货币支付。
