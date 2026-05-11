"use client";

import { useEffect } from "react";

export default function HtmlLang({ locale }: { locale: "nl" | "en" }) {
    useEffect(() => {
        if (typeof document !== "undefined") {
            document.documentElement.lang = locale === "en" ? "en" : "nl";
        }
    }, [locale]);

    return null;
}
