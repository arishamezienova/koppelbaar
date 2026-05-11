import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";

const CookieBanner = dynamic(() => import("@/components/CookieBanner"));

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
});

const siteUrl = "https://koppelbaar.agency";

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: "Koppelbaar — Webbureau Hasselt | Websites op maat",
        template: "%s | Koppelbaar",
    },
    description:
        "Webbureau uit Hasselt (Limburg). Wij ontwerpen en ontwikkelen moderne websites, web apps en platformen op maat voor bedrijven die willen groeien.",
    applicationName: "Koppelbaar",
    authors: [{ name: "Koppelbaar", url: siteUrl }],
    creator: "Koppelbaar",
    publisher: "Koppelbaar",
    keywords: [
        "webdesign",
        "website op maat",
        "webbureau",
        "webbureau Hasselt",
        "webbureau Limburg",
        "digitaal bureau",
        "webontwikkeling",
        "web development",
        "Hasselt",
        "Limburg",
        "België",
        "Belgium",
        "bedrijfswebsite",
        "Next.js",
        "web agency",
        "web design Belgium",
        "website laten maken",
        "professionele website",
        "web app op maat",
    ],
    icons: {
        icon: [
            { url: "/favicon.ico", type: "image/x-icon" },
            { url: "/favicon.png", type: "image/png" },
            { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
            { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
        ],
        shortcut: "/favicon.png",
        apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
    manifest: "/manifest.webmanifest",
    openGraph: {
        type: "website",
        siteName: "Koppelbaar",
        url: siteUrl,
        locale: "nl_BE",
        alternateLocale: ["en_US"],
        title: "Koppelbaar — Webbureau Hasselt | Websites op maat",
        description:
            "Wij ontwerpen en ontwikkelen moderne websites, web apps en platformen op maat voor bedrijven die willen groeien.",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Koppelbaar — Webbureau Hasselt, België",
                type: "image/png",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Koppelbaar — Webbureau Hasselt",
        description:
            "Moderne websites, web apps en platformen op maat voor bedrijven die willen groeien.",
        images: ["/og-image.png"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },
    alternates: {
        canonical: "/",
        languages: {
            "nl-BE": "/nl",
            "en": "/en",
            "x-default": "/nl",
        },
    },
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
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

        </body>
        </html>
    );
}
