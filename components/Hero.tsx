"use client";

import nl from "@/languages/nl.json";
import en from "@/languages/en.json";

type HeroProps = {
    locale: "nl" | "en";
};

export default function Hero({ locale }: HeroProps) {
    const t = locale === "en" ? en.hero : nl.hero;

    return (
        <section
            className="relative w-full min-h-[90vh] md:min-h-screen flex items-center bg-cover bg-center"
            style={{ backgroundImage: "url('/bg.jpeg')" }}
        >
            {/* overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            <div className="relative max-w-6xl mx-auto w-full px-6 py-24 md:py-0">

                <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-12 items-center">

                    {/* TEXT */}
                    <div className="text-white">

                        <h1
                            className={`font-bold tracking-tight leading-[1.05] mb-6 ${
                                locale === "en"
                                    ? "text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                                    : "text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
                            }`}
                        >
                            {t.line1}
                            <br />
                            {t.line2}
                            <br />
                            {t.line3}
                            <span className="text-purple-500">.</span>
                        </h1>

                        <p className="max-w-md text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed">
                            {t.description}
                        </p>

                        <a
                            href="#contact"
                            className="mt-8 inline-flex group relative items-center gap-2 pr-4 pl-1 py-1 rounded-full border-2 border-white overflow-hidden"
                        >
                            <span className="absolute inset-0 bg-purple-600 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>

                            <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 text-white">
                <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>

                            <span className="relative font-medium text-white text-sm">
                {t.cta}
              </span>
                        </a>

                    </div>

                </div>

            </div>
        </section>
    );
}