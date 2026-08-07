import type { Metadata } from "next";
import { seoConfig } from "@/lib/seo";
import UnsubscribeForm from "@/components/UnsubscribeForm";

type Props = {
    params: Promise<{ locale: "nl" | "en" }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const cfg = seoConfig[locale].unsubscribe;

    return {
        title: cfg.title,
        description: cfg.description,
        robots: {
            index: false,
            follow: false,
            googleBot: { index: false, follow: false },
        },
    };
}

export default async function Unsubscribe({ params }: Props) {
    const { locale } = await params;

    return <UnsubscribeForm locale={locale} />;
}
