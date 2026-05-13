"use client";

import { useEffect, useState } from "react";
import { Globe } from "lucide-react";
import Link from "next/link";
import { smoothScrollTo } from "@/lib/smoothScroll";

type HeaderProps = {
    locale: "nl" | "en";
};

export default function Header({ locale }: HeaderProps) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        let rafId = 0;

        const handleScroll = () => {
            // Coalesce multiple scroll events per frame into one state update.
            if (rafId) return;
            rafId = requestAnimationFrame(() => {
                setScrolled(window.scrollY > 50);
                rafId = 0;
            });
        };

        // `passive: true` — promise to never call preventDefault, so the
        // browser doesn't have to wait for this handler before scrolling.
        // Without this, every scroll/wheel event blocks paint = lag.
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, []);

    const textColor = scrolled ? "text-white" : "text-black";
    const borderColor = scrolled ? "border-white/40" : "border-black/40";

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 
      ${scrolled ? "bg-black shadow-lg" : "bg-transparent"}`}
        >
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

                <Link
                    href={`/${locale}`}
                    onClick={(e) => {
                        // Same-page click → smooth scroll to top instead of a
                        // no-op Next.js navigation.
                        const path = window.location.pathname.replace(/\/$/, "");
                        if (path === `/${locale}`) {
                            e.preventDefault();
                            smoothScrollTo(0);
                        }
                    }}
                    className={`text-xl font-bold ${textColor} hover:opacity-80 transition`}
                >
                    koppelbaar<span className="text-purple-600">.</span>
                </Link>

                <div className="flex items-center gap-2">

                    <Globe className={`w-4 h-4 ${textColor}`} />

                    <div className={`flex border ${borderColor} rounded-full p-0.5 text-xs`}>

                        <Link
                            href="/nl" scroll={false}
                            className={`px-2 py-0.5 rounded-full transition
              ${
                                locale === "nl"
                                    ? "bg-white text-black"
                                    : `${textColor} opacity-70 hover:opacity-100`
                            }`}
                        >
                            NL
                        </Link>

                        <Link
                            href="/en" scroll={false}
                            className={`px-2 py-0.5 rounded-full transition
              ${
                                locale === "en"
                                    ? "bg-white text-black"
                                    : `${textColor} opacity-70 hover:opacity-100`
                            }`}
                        >
                            EN
                        </Link>

                    </div>

                </div>

            </div>
        </header>
    );
}