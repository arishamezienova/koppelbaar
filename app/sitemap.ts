import type { MetadataRoute } from "next";
import { cases } from "@/data/cases";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

const locales = ["nl", "en"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    const homeEntries = locales.map((locale) => ({
        url: `${SITE_URL}/${locale}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: locale === "nl" ? 1.0 : 0.9,
        alternates: {
            languages: {
                "nl-BE": `${SITE_URL}/nl`,
                en: `${SITE_URL}/en`,
                "x-default": `${SITE_URL}/nl`,
            },
        },
    }));

    const caseEntries = locales.flatMap((locale) =>
        cases.map((c) => ({
            url: `${SITE_URL}/${locale}/cases/${c.slug}`,
            lastModified: now,
            changeFrequency: "yearly" as const,
            priority: 0.7,
            alternates: {
                languages: {
                    "nl-BE": `${SITE_URL}/nl/cases/${c.slug}`,
                    en: `${SITE_URL}/en/cases/${c.slug}`,
                    "x-default": `${SITE_URL}/nl/cases/${c.slug}`,
                },
            },
        }))
    );

    const privacyEntries = locales.map((locale) => ({
        url: `${SITE_URL}/${locale}/privacy`,
        lastModified: now,
        changeFrequency: "yearly" as const,
        priority: 0.3,
        alternates: {
            languages: {
                "nl-BE": `${SITE_URL}/nl/privacy`,
                en: `${SITE_URL}/en/privacy`,
                "x-default": `${SITE_URL}/nl/privacy`,
            },
        },
    }));

    return [...homeEntries, ...caseEntries, ...privacyEntries];
}
