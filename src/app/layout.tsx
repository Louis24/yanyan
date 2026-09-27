import type { Metadata } from "next";
import { Orbitron, Poppins } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { SITE_CONFIG } from "@/config/siteConfig";

const orbitron = Orbitron({
    subsets: ["latin"],
    variable: "--font-orbitron",
    weight: ["400", "600", "700", "800", "900"],
    display: "swap",
});

const poppins = Poppins({
    subsets: ["latin"],
    variable: "--font-poppins",
    weight: ["300", "400", "500", "600", "700"],
    display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://yanyan.mistressland.top'),

    title: `${SITE_CONFIG.mistressName} - 绝对主宰 & 极奢金库`,
    description: SITE_CONFIG.bio,
    icons: {
        icon: [
            { url: '/favicon.ico', sizes: 'any' },
            { url: '/favicon.png', type: 'image/png', sizes: '512x512' },
            { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
        ],
        apple: '/apple-touch-icon.png',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="zh-CN" className={`${orbitron.variable} ${poppins.variable}`}>
            <body className="font-poppins bg-neutral-950 text-neutral-100 antialiased selection:bg-amber-400 selection:text-neutral-950">
                <div className="min-h-screen bg-neutral-950 flex flex-col">
                    <Navigation />
                    <main className="flex-1">{children}</main>
                    
                    {/* Minimalist Elegant Footer */}
                    <footer className="bg-neutral-950 text-neutral-400 py-6 border-t border-neutral-800 text-xs text-center">
                        <div className="max-w-7xl mx-auto px-4">
                            <p className="font-orbitron text-xs text-neutral-400 tracking-wider">
                                {SITE_CONFIG.mistressName} • {SITE_CONFIG.tagline}
                            </p>
                        </div>
                    </footer>
                </div>
            </body>
        </html>
    );
}

