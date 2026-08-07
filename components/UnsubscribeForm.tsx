"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import nl from "@/languages/nl.json";
import en from "@/languages/en.json";

type Props = {
    locale: "nl" | "en";
};

const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export default function UnsubscribeForm({ locale }: Props) {
    const t = (locale === "nl" ? nl : en).unsubscribe;

    const [email, setEmail] = useState("");
    const [confirmed, setConfirmed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [done, setDone] = useState(false);

    // Read the e-mail address passed in the unsubscribe link (?email=...).
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const fromLink = params.get("email");
        if (fromLink) setEmail(fromLink.trim());
    }, []);

    const canSubmit = confirmed && isValidEmail(email) && !loading;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!canSubmit) return;

        setLoading(true);
        setError(false);

        try {
            const res = await fetch("/unsubscribe.php", {
                method: "POST",
                body: new URLSearchParams({ email: email.trim(), locale }),
            });

            if (res.ok) {
                setDone(true);
            } else {
                setError(true);
                setLoading(false);
            }
        } catch (err) {
            console.error(err);
            setError(true);
            setLoading(false);
        }
    };

    if (done) {
        return (
            <section className="min-h-screen flex items-center justify-center px-6 bg-white">
                <div className="text-center max-w-md">
                    <h1 className="text-3xl font-semibold mb-4">{t.doneTitle}</h1>

                    <p className="text-gray-600 mb-8">{t.doneDescription}</p>

                    <Link
                        href={`/${locale}`}
                        className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
                    >
                        {t.back}
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen flex items-center justify-center px-6 py-24 bg-white">
            <div className="w-full max-w-md">
                <h1 className="text-3xl font-semibold mb-4 text-center">{t.title}</h1>

                <p className="text-gray-600 mb-8 text-center">{t.intro}</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="unsubscribe-email"
                            className="block text-sm text-gray-600 mb-2"
                        >
                            {t.emailLabel}
                        </label>
                        <input
                            id="unsubscribe-email"
                            name="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={t.emailPlaceholder}
                            autoComplete="email"
                            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 focus:border-purple-500 focus:outline-none transition-colors"
                        />
                    </div>

                    <label className="flex items-start gap-3 cursor-pointer select-none">
                        <input
                            type="checkbox"
                            checked={confirmed}
                            onChange={(e) => setConfirmed(e.target.checked)}
                            className="mt-1 h-5 w-5 shrink-0 accent-purple-600"
                        />
                        <span className="text-sm text-gray-700">{t.confirmLabel}</span>
                    </label>

                    {error && (
                        <p className="text-sm text-red-600" role="alert">
                            {t.error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={!canSubmit}
                        aria-busy={loading}
                        className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? t.sending : t.button}
                    </button>
                </form>
            </div>
        </section>
    );
}
