import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Cases from "@/components/Cases";
import type { Metadata } from "next";
import { localeAlternates, openGraphFor, OG_IMAGE, seoConfig, SITE_URL } from "@/lib/seo";
import { cases } from "@/data/cases";

type Props = {
    params: Promise<{
        locale: "nl" | "en";
    }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const cfg = seoConfig[locale].home;
    const url = `${SITE_URL}/${locale}`;

    return {
        title: { absolute: cfg.title },
        description: cfg.description,
        alternates: localeAlternates(locale, { nl: "/nl", en: "/en" }),
        openGraph: openGraphFor(locale, url, cfg.title, cfg.description),
        twitter: {
            card: "summary_large_image",
            title: cfg.title,
            description: cfg.description,
            images: [OG_IMAGE.url],
        },
    };
}

export default async function Home({ params }: Props) {

    const { locale } = await params;

    const isEN = locale === "en";

    const organizationLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Koppelbaar",
        url: SITE_URL,
        logo: `${SITE_URL}/favicon.png`,
        email: "hello@koppelbaar.agency",
        telephone: ["+32488823625", "+32497278186"],
        address: {
            "@type": "PostalAddress",
            addressLocality: "Hasselt",
            addressRegion: "Limburg",
            addressCountry: "BE",
        },
        sameAs: [
            "https://www.linkedin.com/in/koen-gielissen/",
            "https://www.linkedin.com/in/arisha-mezienova-9a0626305/",
        ],
        vatID: "BE0791252457",
        founder: [
            { "@type": "Person", name: "Koen Gielissen" },
            { "@type": "Person", name: "Arisha Mezienova" },
        ],
    };

    const localBusinessLd = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: "Koppelbaar",
        url: SITE_URL,
        image: `${SITE_URL}/favicon.png`,
        priceRange: "€€",
        telephone: "+32488823625",
        email: "hello@koppelbaar.agency",
        address: {
            "@type": "PostalAddress",
            addressLocality: "Hasselt",
            addressRegion: "Limburg",
            addressCountry: "BE",
        },
        areaServed: ["BE", "NL", "LU"],
        serviceType: isEN
            ? ["Web design", "Web development", "Web applications", "API integrations"]
            : ["Webdesign", "Webontwikkeling", "Web applicaties", "API koppelingen"],
    };

    const websiteLd = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Koppelbaar",
        url: SITE_URL,
        inLanguage: isEN ? "en" : "nl-BE",
    };

    const itemListLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: cases.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${SITE_URL}/${locale}/cases/${c.slug}`,
            name: c.title,
        })),
    };

    return (
        <main className="min-h-screen flex flex-col">

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
            />

            <Hero locale={locale} />

            <Services locale={locale} />

            <Cases locale={locale} />

        </main>
    );
}
