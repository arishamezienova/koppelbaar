export const SITE_URL = "https://koppelbaar.agency";

type Locale = "nl" | "en";

const ogLocale = (locale: Locale) => (locale === "en" ? "en_US" : "nl_BE");
const alternateOgLocale = (locale: Locale) => (locale === "en" ? "nl_BE" : "en_US");

export const seoConfig = {
    nl: {
        siteName: "Koppelbaar",
        home: {
            title: "Koppelbaar — Webbureau Hasselt | Websites op maat",
            description:
                "Webbureau uit Hasselt (Limburg). Wij ontwerpen en ontwikkelen moderne websites, web apps en platformen op maat voor bedrijven die willen groeien.",
        },
        privacy: {
            title: "Privacybeleid",
            description:
                "Lees hoe Koppelbaar omgaat met persoonsgegevens, cookies en analytics op deze website.",
        },
        thanks: {
            title: "Bedankt voor je aanvraag",
            description: "We nemen zo snel mogelijk contact met je op.",
        },
    },
    en: {
        siteName: "Koppelbaar",
        home: {
            title: "Koppelbaar — Web agency in Belgium | Custom websites",
            description:
                "Web agency based in Hasselt, Belgium. We design and develop modern, custom websites, web apps and platforms for companies that want to grow.",
        },
        privacy: {
            title: "Privacy Policy",
            description:
                "Read how Koppelbaar handles personal data, cookies and analytics on this website.",
        },
        thanks: {
            title: "Thank you for your request",
            description: "We will get back to you as soon as possible.",
        },
    },
} as const;

export function localeAlternates(
    currentLocale: Locale,
    pathByLocale: { nl: string; en: string }
) {
    return {
        canonical: pathByLocale[currentLocale],
        languages: {
            "nl-BE": pathByLocale.nl,
            en: pathByLocale.en,
            "x-default": pathByLocale.nl,
        },
    };
}

export const OG_IMAGE = {
    url: "/og-image.png",
    width: 1200,
    height: 630,
    type: "image/png",
};

export function openGraphFor(locale: Locale, url: string, title: string, description: string) {
    return {
        type: "website" as const,
        siteName: "Koppelbaar",
        url,
        locale: ogLocale(locale),
        alternateLocale: [alternateOgLocale(locale)],
        title,
        description,
        images: [
            {
                ...OG_IMAGE,
                alt:
                    locale === "en"
                        ? "Koppelbaar — Web agency in Hasselt, Belgium"
                        : "Koppelbaar — Webbureau Hasselt, België",
            },
        ],
    };
}
