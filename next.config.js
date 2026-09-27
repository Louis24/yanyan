/** @type {import('next').NextConfig} */
const nextConfig = {
  // App directory is now stable in Next.js 14
  // 根路径用配置层重定向（返回带 Location 的 307），而不是在页面里 redirect()
  // 页面里 redirect() 会让爬虫拿到没有 Location 的错误页，导致首页无法收录
  async redirects() {
    return [{ source: '/', destination: '/home', permanent: false }]
  },
}

module.exports = nextConfig
