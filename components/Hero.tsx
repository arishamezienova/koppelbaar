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
            style={{ backgroundImage: "url('/bg.webp')" }}
        >
            {/* overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            <div className="relative max-w-6xl mx-auto w-full px-6 py-24 md:py-0">

                <div className="flex items-center">
                    {/* TEXT */}
                    <div className="text-white max-w-none">
                        <h1 className="font-bold tracking-tight leading-[0.95] mb-6 uppercase text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl">
                            <span className="block">
                                {t.line1}
                            </span>

                            <span className="block">
                                {t.line2}
                                <span className="text-purple-600">.</span>
                            </span>

                        </h1>

                        <p className="max-w-sm sm:max-w-md md:max-w-xl text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg mt-4 leading-relaxed md:leading-relaxed">
                            <span className="block">{t.desc1}</span>
                            <span className="block">{t.desc2}</span>
                            <span className="block">{t.desc3}</span>
                        </p>

                        <a
                            href="#contact"
                            className="mt-8 inline-flex group relative items-center gap-2 pr-3 pl-1 py-1 rounded-full border border-white text-xs sm:text-sm overflow-hidden"
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