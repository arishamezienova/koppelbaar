import Hero from "@/components/Hero";
import Cases from "@/components/Cases";

type Props = {
    params: Promise<{
        locale: "nl" | "en";
    }>;
};

export default async function Home({ params }: Props) {

    const { locale } = await params;

    return (
        <main className="min-h-screen flex flex-col">

            <Hero locale={locale} />

            <Cases locale={locale} />

        </main>
    );
}