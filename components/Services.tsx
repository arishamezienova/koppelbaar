import nl from "@/languages/nl.json";
import en from "@/languages/en.json";
import ServiceRow from "@/components/ServiceRow";

type ServicesProps = {
    locale: "nl" | "en";
};

type ItemKey = keyof typeof nl.services.items;

const items: { key: ItemKey; featured?: boolean }[] = [
    { key: "ai", featured: true },
    { key: "website" },
    { key: "webapp" },
    { key: "platform" },
    { key: "integrations" },
    { key: "api" },
    { key: "consulting" },
];

export default function Services({ locale }: ServicesProps) {
    const t = locale === "nl" ? nl : en;
    const newLabel = locale === "en" ? "New" : "Nieuw";

    return (
        <section className="py-24 md:py-32 px-6 bg-white">
            <div className="max-w-6xl mx-auto">

                <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">

                    {/* Sticky header column */}
                    <div className="lg:sticky lg:top-32 lg:self-start">
                        <div className="w-10 h-1 bg-purple-600 mb-5 rounded-full"></div>
                        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-black mb-4">
                            {t.services.title}
                        </h2>
                        <p className="text-gray-600 text-base leading-relaxed max-w-md">
                            {t.services.subtitle}
                        </p>
                    </div>

                    {/* Editorial list */}
                    <ul className="divide-y divide-gray-200 border-y border-gray-200">
                        {items.map(({ key, featured }, i) => {
                            const item = t.services.items[key];
                            return (
                                <ServiceRow key={key} delay={i * 60}>

                                    <div className="flex items-center gap-3 flex-wrap mb-2">
                                        <h3 className="text-2xl md:text-3xl font-semibold text-black tracking-tight leading-none">
                                            {item.title}
                                        </h3>

                                        {featured && (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium tracking-wider uppercase bg-purple-50 text-purple-700 ring-1 ring-inset ring-purple-100">
                                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                                                {newLabel}
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl">
                                        {item.description}
                                    </p>

                                </ServiceRow>
                            );
                        })}
                    </ul>

                </div>

            </div>
        </section>
    );
}
