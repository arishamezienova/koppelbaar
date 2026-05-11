"use client";

import { useEffect, useRef, useState } from "react";
import nl from "@/languages/nl.json";
import en from "@/languages/en.json";
import { Linkedin } from "lucide-react";

type FooterProps = {
    locale: "nl" | "en";
};

declare global {
    interface Window {
        grecaptcha: any;
    }
}

const RECAPTCHA_SITE_KEY = "6LdniY4sAAAAAF6sVm_m3IB-RN-pOVXTnzZLk5yh";
const RECAPTCHA_SCRIPT_ID = "recaptcha-v3-script";

function loadRecaptcha() {
    if (typeof window === "undefined") return;
    if (document.getElementById(RECAPTCHA_SCRIPT_ID)) return;

    const script = document.createElement("script");
    script.id = RECAPTCHA_SCRIPT_ID;
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
}

export default function Footer({ locale }: FooterProps) {

    const t = locale === "nl" ? nl : en;
    const options = t.footer.options;

    const [selected, setSelected] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const formRef = useRef<HTMLFormElement | null>(null);

    useEffect(() => {
        const el = formRef.current;
        if (!el) return;

        if (typeof IntersectionObserver === "undefined") {
            loadRecaptcha();
            return;
        }

        const io = new IntersectionObserver(
            (entries) => {
                if (entries.some((e) => e.isIntersecting)) {
                    loadRecaptcha();
                    io.disconnect();
                }
            },
            { rootMargin: "200px" }
        );
        io.observe(el);

        return () => io.disconnect();
    }, []);

    const toggle = (value: string) => {
        setSelected(prev =>
            prev.includes(value)
                ? prev.filter(v => v !== value)
                : [...prev, value]
        );
    };

    // ✅ NIEUWE SUBMIT (API ROUTE)
    const handleSubmit = async () => {
        // Ensure the script is loaded if the user submits before the observer fires.
        loadRecaptcha();

        // Wait briefly for grecaptcha to attach if needed.
        for (let i = 0; i < 50 && !window.grecaptcha?.execute; i++) {
            await new Promise((r) => setTimeout(r, 100));
        }

        if (!window.grecaptcha) {
            console.log("reCAPTCHA not loaded");
            return;
        }

        setLoading(true);

        try {
            await new Promise<void>((resolve) => window.grecaptcha.ready(resolve));

            const token = await window.grecaptcha.execute(
                RECAPTCHA_SITE_KEY,
                { action: "submit" }
            );

            const form = document.getElementById("contact-form") as HTMLFormElement;
            const formData = new FormData(form);

            const data = {
                name: formData.get("name"),
                email: formData.get("email"),
                message: formData.get("message"),
                interests: selected.join(", "),
                token,
            };

            const res = await fetch("/verify.php", {
                method: "POST",
                body: new URLSearchParams({
                    name: data.name as string,
                    email: data.email as string,
                    message: data.message as string,
                    interests: data.interests as string,
                    token: data.token as string,
                }),
            });

            if (res.ok) {
                window.location.href = `/${locale}/thanks`;
            } else {
                alert("Er ging iets mis");
                setLoading(false);
            }

        } catch (err) {
            console.error(err);
            alert("Error bij verzenden");
            setLoading(false);
        }
    };

    return (
        <footer id="contact" className="border-t bg-black text-white py-20 px-6">

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-start">

                {/* LEFT */}
                <div className="max-w-md order-2 md:order-1">

                    <p className="text-2xl md:text-3xl font-medium text-gray-200 leading-snug">
                        {t.footer.quote1}<br />{t.footer.quote2}
                    </p>

                    <div className="mt-8 space-y-4 text-sm">

                        <div>
                            <span className="text-gray-400">Email</span>
                            <a href="mailto:hello@koppelbaar.agency"
                               className="text-gray-400 hover:text-purple-400 mt-1 block">
                                hello@koppelbaar.agency
                            </a>
                        </div>

                        <div>
                            <span className="text-gray-400">{t.footer.phone}</span>

                            <a href="tel:+32488823625"
                               className="text-gray-400 hover:text-purple-400 mt-1 block">
                                +32 488 82 36 25
                            </a>

                            <a href="tel:+32497278186"
                               className="text-gray-400 hover:text-purple-400 mt-1 block">
                                +32 497 27 81 86
                            </a>
                        </div>

                        <div>
                            <span className="text-gray-400">{t.footer.profile}</span>

                            <a href="https://www.linkedin.com/in/koen-gielissen/"
                               target="_blank"
                               rel="noopener noreferrer"
                               aria-label="LinkedIn — Koen Gielissen"
                               className="flex items-center gap-2 text-gray-400 hover:text-purple-400 mt-1">
                                <Linkedin size={16}/> Koen Gielissen
                            </a>

                            <a href="https://www.linkedin.com/in/arisha-mezienova-9a0626305/"
                               target="_blank"
                               rel="noopener noreferrer"
                               aria-label="LinkedIn — Arisha Mezienova"
                               className="flex items-center gap-2 text-gray-400 hover:text-purple-400 mt-1">
                                <Linkedin size={16}/> Arisha Mezienova
                            </a>
                        </div>
                    </div>
                </div>

                {/* FORM */}
                <div className="max-w-lg w-full order-1 md:order-2">

                    <h3 className="text-xl font-semibold mb-6">
                        {t.footer.title}
                    </h3>

                    <form
                        id="contact-form"
                        ref={formRef}
                        onFocus={loadRecaptcha}
                        onSubmit={(e) => {
                            e.preventDefault();
                            void handleSubmit();
                        }}
                        noValidate={false}
                        className="grid grid-cols-2 gap-4"
                    >

                        <input
                            name="name"
                            required
                            aria-required="true"
                            aria-label={t.footer.name}
                            autoComplete="name"
                            placeholder={t.footer.name}
                            className="bg-black border border-gray-700 rounded-lg px-4 py-3 user-invalid:border-red-500/60 focus:border-purple-500 focus:outline-none transition-colors"
                        />

                        <input
                            name="email"
                            type="email"
                            required
                            aria-required="true"
                            aria-label={t.footer.email}
                            autoComplete="email"
                            placeholder={t.footer.email}
                            className="bg-black border border-gray-700 rounded-lg px-4 py-3 user-invalid:border-red-500/60 focus:border-purple-500 focus:outline-none transition-colors"
                        />

                        <fieldset className="col-span-2">
                            <legend className="sr-only">{t.footer.interest}</legend>
                            <div className="flex flex-wrap gap-3">
                                {options.map(option => {
                                    const isSelected = selected.includes(option);
                                    return (
                                        <button
                                            key={option}
                                            type="button"
                                            onClick={() => toggle(option)}
                                            aria-pressed={isSelected}
                                            className={`px-4 py-2 rounded-full border transition-colors ${
                                                isSelected
                                                    ? "bg-purple-600 text-white border-purple-600"
                                                    : "border-gray-700 text-gray-300 hover:border-gray-500"
                                            }`}
                                        >
                                            {option}
                                        </button>
                                    );
                                })}
                            </div>
                        </fieldset>

                        <textarea
                            name="message"
                            aria-label={t.footer.message}
                            placeholder={t.footer.message}
                            rows={4}
                            className="col-span-2 bg-black border border-gray-700 rounded-lg px-4 py-3 focus:border-purple-500 focus:outline-none transition-colors"
                        />

                        {/* BUTTON */}
                        <button
                            type="submit"
                            disabled={loading}
                            aria-busy={loading}
                            className="col-span-2 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
                        >
                            {loading ? (locale === "en" ? "Sending..." : "Versturen...") : t.footer.send}
                        </button>

                    </form>

                </div>
            </div>

            {/* bottom */}
            <div className="max-w-6xl mx-auto mt-16 pt-6 border-t border-gray-800 text-xs text-gray-400">

                <div className="flex">
                    <div className="flex gap-4">
                        <span>© {new Date().getFullYear()} koppelbaar.</span>
                        <span>BTW BE0791.252.457</span>
                    </div>

                    <a href={`/${locale}/privacy`} className="ml-auto hover:text-white">
                        {t.footer.privacy}
                    </a>
                </div>

                <p className="text-xs text-gray-400 mt-6 max-w-md">
                    {t.footer.recaptcha.before}
                    <a
                        href="https://policies.google.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-white"
                    >
                        {t.footer.recaptcha.privacy}
                    </a>
                    {t.footer.recaptcha.middle}
                    <a
                        href="https://policies.google.com/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-white"
                    >
                        {t.footer.recaptcha.terms}
                    </a>
                    {t.footer.recaptcha.after}
                </p>

            </div>
        </footer>
    );
}