"use client";

import { useEffect, useState } from "react";

export default function Header() {
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
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center">
                <div
                    className={`text-xl font-bold tracking-tight 
          ${scrolled ? "text-white" : "text-black"}`}
                >
                    koppelbaar<span className="text-purple-600">.</span>
                </div>
            </div>
        </header>
    );
}