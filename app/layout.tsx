import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import Script from "next/script";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "koppelbaar",
    description: "Websites die bedrijven vooruithelpen",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="nl">
        <body className={`${poppins.className} antialiased bg-white text-black`}>

        {children}

        {/* Cookie banner */}
        <CookieBanner />

        {/* Cloudflare Turnstile */}
        <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            strategy="afterInteractive"
        />

        {/* Contentsquare / Hotjar */}
        <Script
            src="https://t.contentsquare.net/uxa/c793f7ae91402.js"
            strategy="afterInteractive"
        />

        </body>
        </html>
    );
}