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
    keywords: [
        "webdesign",
        "website op maat",
        "webbureau",
        "digitaal bureau",
        "webontwikkeling",
        "Hasselt",
        "Limburg",
        "België",
        "bedrijfswebsite",
        "Next.js",
        "web agency",
        "web design Belgium",
        "website laten maken",
        "professionele website",
    ],
    icons: {
        icon: [
            { url: "/favicon.png", type: "image/png" },
            { url: "/favicon.ico", type: "image/x-icon" },
        ],
        shortcut: "/favicon.png",
        apple: "/favicon.png",
    },
    openGraph: {
        title: "koppelbaar",
        description: "Websites die bedrijven vooruithelpen",
        url: "https://koppelbaar.agency",
        siteName: "koppelbaar",
        locale: "nl_BE",
        type: "website",
    },
    metadataBase: new URL("https://koppelbaar.agency"),
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

        <Script
            src="https://www.google.com/recaptcha/api.js?render=6LdniY4sAAAAAF6sVm_m3IB-RN-pOVXTnzZLk5yh"
            strategy="afterInteractive"
        />

        </body>
        </html>
    );
}