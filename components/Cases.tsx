import Link from "next/link";
import Image from "next/image";
import { cases } from "@/data/cases";
import nl from "@/languages/nl.json";
import en from "@/languages/en.json";

type CasesProps = {
    locale: "nl" | "en";
};



export default function Cases({ locale }: CasesProps) {
    const t = locale === "nl" ? nl : en;

    return (
        <section className="py-24 px-6 bg-white">
            <div className="max-w-6xl mx-auto">

                <h2 className="text-3xl font-semibold mb-14 text-center text-black">
                    {t.cases.title}
                </h2>

                <div className="grid md:grid-cols-3 gap-10 items-stretch">

                    {cases.map((c) => {
                        const caseContent = t.cases.items[c.slug as keyof typeof t.cases.items] ?? {
                            title: "",
                            description: ""
                        };
                        return(
                            <Link
                                key={c.slug}
                                href={`/${locale}/cases/${c.slug}`}
                                className="group block h-full"
                            >
                                <div className="overflow-hidden rounded-xl border bg-white transition hover:shadow-lg h-full flex flex-col">

                                    <div className="relative h-56 w-full overflow-hidden">
                                        <Image
                                            src={c.image}
                                            alt={caseContent.title || "Project image"}
                                            fill
                                            className="object-cover transition duration-500 group-hover:scale-105"
                                        />
                                    </div>

                                    <div className="p-6 flex flex-col grow">

                                        <h3 className="font-semibold text-lg text-black">
                                            {caseContent.title}
                                        </h3>

                                        <p className="text-gray-600 mt-2 text-sm leading-relaxed line-clamp-2">
                                            {caseContent.description}
                                        </p>

                                        <span className="inline-block mt-auto text-sm font-medium text-black group-hover:translate-x-1 transition">
                                            {t.cases.cta}
                                        </span>

                                    </div>

                                </div>
                            </Link>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}