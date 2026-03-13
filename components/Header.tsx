"use client";

import { useEffect, useState } from "react";
import { Globe } from "lucide-react";
import Link from "next/link";

type HeaderProps = {
    locale: "nl" | "en";
};

export default function Header({ locale }: HeaderProps) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
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