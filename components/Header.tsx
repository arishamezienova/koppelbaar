"use client";

import { useEffect, useState } from "react";
import { Globe } from "lucide-react";

type HeaderProps = {
    locale: "nl" | "en";
    setLocale: (locale: "nl" | "en") => void;
};

export default function Header({ locale, setLocale }: HeaderProps) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 
      ${scrolled ? "bg-black shadow-lg" : "bg-transparent"}`}
        >
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

                <div className={`text-xl font-bold ${scrolled ? "text-white" : "text-black"}`}>
                    koppelbaar<span className="text-purple-600">.</span>
                </div>

                <div className="flex items-center gap-2">

                    <Globe className={`w-4 h-4 ${scrolled ? "text-white" : "text-black"}`} />

                    <div className="flex border border-white/40 rounded-full p-[2px] text-xs">

                        <button
                            onClick={() => setLocale("nl")}
                            className={`px-2 py-[2px] rounded-full transition
              ${locale === "nl" ? "bg-white text-black" : "text-white/70 hover:text-white"}`}
                        >
                            NL
                        </button>

                        <button
                            onClick={() => setLocale("en")}
                            className={`px-2 py-[2px] rounded-full transition
              ${locale === "en" ? "bg-white text-black" : "text-white/70 hover:text-white"}`}
                        >
                            EN
                        </button>

                    </div>

                </div>

            </div>
        </header>
    );
}