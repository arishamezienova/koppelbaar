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

    const orgDescription = isEN
        ? "Koppelbaar is an independent web studio based in Hasselt, Belgium. We design and engineer modern websites, web applications, platforms and API integrations — built by senior engineers to ship to production and run for years."
        : "Koppelbaar is een onafhankelijk webbureau uit Hasselt (Limburg). Wij ontwerpen en bouwen moderne websites, web applicaties, platformen en API-integraties — geleverd door senior engineers, klaar voor productie en gemaakt om jaren mee te gaan.";

    const organizationLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Koppelbaar",
        alternateName: "Koppelbaar Agency",
        description: orgDescription,
        url: SITE_URL,
        logo: `${SITE_URL}/favicon.png`,
        email: "hello@koppelbaar.agency",
        telephone: ["+32488823625", "+32497278186"],
        foundingDate: "2020",
        numberOfEmployees: { "@type": "QuantitativeValue", value: 2 },
        knowsAbout: isEN
            ? ["Web design", "Web development", "Web applications", "API integrations", "AI integrations", "TypeScript", "Next.js"]
            : ["Webdesign", "Webontwikkeling", "Web applicaties", "API koppelingen", "AI integraties", "TypeScript", "Next.js"],
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
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: isEN ? "Services" : "Diensten",
            itemListElement: [
                { service: "website", en: "Website", nl: "Website", enDesc: "Custom marketing site", nlDesc: "Marketing site op maat" },
                { service: "webapp", en: "Web app", nl: "Web app", enDesc: "Custom-built browser application", nlDesc: "Web applicatie op maat" },
                { service: "platform", en: "Platform", nl: "Platform", enDesc: "Full system for users", nlDesc: "Volwaardig systeem voor gebruikers" },
                { service: "integrations", en: "Integrations", nl: "Integraties", enDesc: "Connecting existing tools", nlDesc: "Bestaande tools verbinden" },
                { service: "api", en: "API integration", nl: "API koppeling", enDesc: "Data between services", nlDesc: "Data tussen diensten" },
                { service: "ai", en: "AI integration", nl: "AI integraties", enDesc: "AI features in products", nlDesc: "AI-features in producten" },
                { service: "consulting", en: "Consulting", nl: "Advies", enDesc: "Strategic digital advice", nlDesc: "Strategisch digitaal advies" },
            ].map((s) => ({
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: isEN ? s.en : s.nl,
                    description: isEN ? s.enDesc : s.nlDesc,
                    provider: { "@type": "Organization", name: "Koppelbaar" },
                },
            })),
        },
    };

    const localBusinessLd = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: "Koppelbaar",
        description: orgDescription,
        url: SITE_URL,
        image: `${SITE_URL}/favicon.png`,
        priceRange: "€€",
        telephone: "+32488823625",
        email: "hello@koppelbaar.agency",
        foundingDate: "2020",
        address: {
            "@type": "PostalAddress",
            addressLocality: "Hasselt",
            addressRegion: "Limburg",
            addressCountry: "BE",
        },
        areaServed: ["BE", "NL", "LU"],
        serviceType: isEN
            ? ["Web design", "Web development", "Web applications", "API integrations", "AI integrations"]
            : ["Webdesign", "Webontwikkeling", "Web applicaties", "API koppelingen", "AI integraties"],
    };

    const websiteLd = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Koppelbaar",
        alternateName: "Koppelbaar Agency",
        description: orgDescription,
        url: SITE_URL,
        inLanguage: isEN ? "en" : "nl-BE",
        publisher: { "@type": "Organization", name: "Koppelbaar", url: SITE_URL },
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
