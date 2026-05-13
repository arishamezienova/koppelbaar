import nl from "@/languages/nl.json";
import en from "@/languages/en.json";
import TypeWord from "@/components/TypeWord";

type HeroProps = {
    locale: "nl" | "en";
};

export default function Hero({ locale }: HeroProps) {
    const t = locale === "en" ? en.hero : nl.hero;

    return (
        <section className="hero-bg relative w-full min-h-[90vh] md:min-h-screen flex items-center overflow-hidden bg-black bg-cover bg-center">
            <div className="absolute inset-0 bg-black/55"></div>

            <div className="relative max-w-6xl mx-auto w-full px-6 py-24 md:py-0">

                <div className="text-white max-w-none">

                    {/* H1 has NO entrance animation — it's the LCP element and must
                        paint immediately. Subtitle + CTA animate in. */}
                    <h1 className="font-bold tracking-tight leading-[0.95] mb-7 uppercase text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                        <span className="block md:whitespace-nowrap text-white/35 font-medium">
                            {t.line1Static}{" "}
                            <TypeWord text={t.line1Typed} typeSpeed={45} startDelay={200} />
                        </span>

                        <span className="block md:whitespace-nowrap text-white">
                            {t.line2}<span className="text-purple-500">.</span>
                        </span>

                    </h1>

                    <p className="hero-rise hero-rise--1 max-w-md sm:max-w-lg md:max-w-3xl text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed md:whitespace-nowrap">
                        {t.desc1} {t.desc2}
                    </p>


                    <a
                        href="#contact"
                        className="hero-rise hero-rise--2 mt-9 inline-flex group relative items-center gap-2 pr-3 pl-1 py-1 rounded-full border border-white text-xs sm:text-sm overflow-hidden"
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
        </section>
    );
}
