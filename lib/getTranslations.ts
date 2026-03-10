import nl from "@/languages/nl.json";
import en from "@/languages/en.json";

export function getTranslations(locale: string) {
    return locale === "en" ? en : nl;
}