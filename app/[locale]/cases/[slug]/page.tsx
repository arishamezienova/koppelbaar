import { cases } from "@/data/cases";
import { notFound } from "next/navigation";
import Image from "next/image";
import nl from "@/languages/nl.json";
import en from "@/languages/en.json";
import CaseContent from "@/components/CaseContent";
import FadeIn from "@/components/FadeIn";

type Props = {
    params: Promise<{
        slug: string;
        locale: string;
    }>;
};

export async function generateStaticParams() {
    return cases.map((c) => ({
        slug: c.slug,
    }));
}

export default async function CasePage({ params }: Props) {
    const { slug, locale } = await params;

    const caseData = cases.find((c) => c.slug === slug);

    if (!caseData) {
        return notFound();
    }

    const t = locale === "nl" ? nl : en;

    const caseContentText = (t.cases.items as any)[slug] ?? {
        title: "Project",
        description: "",
    };

    return (
        <section className="py-24 px-6 min-h-screen">

            {/* HERO */}
            <div className="max-w-6xl mx-auto mb-32">

                <div className="border border-gray-200 rounded-3xl p-8 md:p-12 bg-gradient-to-br from-purple-50/70 via-white to-white shadow-sm">

                    <FadeIn>
                        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

                            {/* IMAGE */}
                            <div className="relative h-[260px] md:h-[360px] w-full rounded-2xl overflow-hidden shadow-xl order-1 md:order-2">
                                <Image
                                    src={caseData.image}
                                    alt={caseData.title}
                                    fill
                                    priority
                                    sizes="(max-width: 768px) 100vw, 600px"
                                    className="object-cover transition duration-700 hover:scale-[1.03]"
                                />
                            </div>

                            {/* TEXT */}
                            <div className="max-w-xl order-2 md:order-1">

                                <div className="w-10 h-1 bg-purple-600 mb-4 rounded-full"></div>

                                <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-black mb-4">
                                    {caseData.title}
                                </h1>

                                <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
                                    {caseContentText.description}
                                </p>

                                {caseData.website && (
                                    <a
                                        href={caseData.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex items-center gap-2 text-gray-700 hover:text-purple-400 transition font-medium"
                                    >
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      {t.cases.viewLive}
                    </span>

                                        <span className="opacity-0 group-hover:opacity-100 transition text-purple-400">
                      →
                    </span>
                                    </a>
                                )}

                            </div>

                        </div>
                    </FadeIn>

                </div>

            </div>

            {/* CASE CONTENT SECTION */}
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-start mb-32">

                {/* LEFT SCREENSHOT */}
                {caseData.screenshots && caseData.screenshots.length > 0 && (
                    <div className="order-2 md:order-1 md:sticky md:top-32">

                        <FadeIn>
                            <Image
                                src={caseData.screenshots[0].src}
                                alt={caseData.screenshots[0].alt}
                                width={1200}
                                height={800}
                                className="rounded-2xl shadow-xl border border-gray-200 transition hover:scale-[1.02]"
                            />
                        </FadeIn>

                        {slug === "afsprakenplatform-natalyahaarmode" && caseData.screenshots?.[1] && (
                            <div className="mt-10">
                                <FadeIn>
                                    <Image
                                        src={caseData.screenshots[1].src}
                                        alt={caseData.screenshots[1].alt}
                                        width={1200}
                                        height={800}
                                        className="rounded-2xl shadow-xl border border-gray-200 transition hover:scale-[1.02]"
                                    />
                                </FadeIn>
                            </div>
                        )}

                    </div>
                )}

                {/* RIGHT CONTENT */}
                <article
                    className="
                    order-1 md:order-2
                    prose prose-lg
                    max-w-none
                    prose-headings:text-black
                    prose-headings:font-semibold
                    prose-headings:tracking-tight
                    prose-h2:text-2xl
                    prose-h2:mt-0
                    prose-h2:mb-4
                    prose-h2:relative
                    prose-h2:pl-6
                    prose-h2:before:content-['']
                    prose-h2:before:absolute
                    prose-h2:before:left-0
                    prose-h2:before:top-1
                    prose-h2:before:h-6
                    prose-h2:before:w-1
                    prose-h2:before:bg-purple-600
                    prose-h2:before:rounded-full
                    prose-h3:text-xl
                    prose-h3:mt-10
                    prose-h3:mb-3
                    prose-p:text-gray-700
                    prose-p:leading-relaxed
                    prose-ul:space-y-2
                    prose-li:text-gray-700
                    "
                >
                    <CaseContent
                        slug={slug}
                        locale={locale}
                        screenshots={caseData.screenshots}
                    />
                </article>

            </div>

        </section>
    );
}