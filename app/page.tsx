"use client";

import { useState } from "react";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Cases from "@/components/Cases";
import Footer from "@/components/Footer";

export default function Home() {

    const [locale, setLocale] = useState<"nl" | "en">("nl");

    return (
        <main className="min-h-screen flex flex-col">

            <Header locale={locale} setLocale={setLocale} />

            <Hero locale={locale} />

            <Cases locale={locale} />

            <Footer locale={locale} />

        </main>
    );
}