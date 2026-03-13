import Link from "next/link";
import nl from "@/languages/nl.json";
import en from "@/languages/en.json";

type Props = {
    params: Promise<{ locale: "nl" | "en" }>;
};

export default async function Thanks({ params }: Props) {
    const { locale } = await params;

    const t = locale === "nl" ? nl : en;

    return (
        <section className="min-h-screen flex items-center justify-center px-6 bg-white">
            <div className="text-center max-w-md">

                <h1 className="text-3xl font-semibold mb-4">
                    {t.thanks.title}
                </h1>

                <p className="text-gray-600 mb-3">
                    {t.thanks.description}
                </p>

                <p className="text-gray-500 text-sm mb-8">
                    {t.thanks.reply}
                </p>

                <Link
                    href={`/${locale}`}
                    className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
                >
                    {t.thanks.back}
                </Link>

            </div>
        </section>
    );
}