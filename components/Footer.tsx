"use client";

import { useState, useEffect } from "react";
import nl from "@/languages/nl.json";
import en from "@/languages/en.json";
import { Linkedin } from "lucide-react";

type FooterProps = {
    locale: "nl" | "en";
};

declare global {
    interface Window {
        turnstile?: {
            execute: (selector: string) => void;
        };
        onTurnstileSuccess?: () => void;
    }
}
export default function Footer({ locale }: FooterProps) {


    const t = locale === "nl" ? nl : en;

    const options = t.footer.options;

    const [selected, setSelected] = useState<string[]>([]);

    const toggle = (value: string) => {
        setSelected(prev =>
            prev.includes(value)
                ? prev.filter(v => v !== value)
                : [...prev, value]
        );
    };

    useEffect(() => {
        window.onTurnstileSuccess = function () {
            const form = document.getElementById("contact-form") as HTMLFormElement | null;
            if (form) form.submit();
        };
    }, []);

    return (
        <footer id="contact" className="border-t bg-black text-white py-20 px-6">

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-start">

                {/* Quote */}
                <div className="max-w-md order-2 md:order-1">

                    <p className="text-2xl md:text-3xl font-medium text-gray-200 leading-snug">
                        {t.footer.quote1}
                        <br />
                        {t.footer.quote2}
                    </p>

                    {/* Contact info */}
                    <div className="mt-8 space-y-4 text-sm">

                        {/* Email */}
                        <div>
                            <span className="text-gray-500">Email</span>

                            <a
                                href="mailto:hello@koppelbaar.agency"
                                className="group flex items-center gap-2 text-gray-400 hover:text-purple-400 transition mt-1"
                            >
                                <span className="transition-transform duration-200 group-hover:translate-x-1">
                                    hello@koppelbaar.agency
                                </span>

                                <span className="opacity-0 group-hover:opacity-100 transition text-purple-400">
                                    →
                                </span>
                            </a>
                        </div>

                        {/* Telefoon */}
                        <div>
                            <span className="text-gray-500">{t.footer.phone}</span>

                            <a
                                href="tel:+32488823625"
                                className="group flex items-center gap-2 text-gray-400 hover:text-purple-400 transition mt-1"
                            >
                            <span className="transition-transform duration-200 group-hover:translate-x-1">
                                +32 488 82 36 25
                            </span>

                                <span className="opacity-0 group-hover:opacity-100 transition text-purple-400">
                                     →
                                </span>
                            </a>

                            <a
                                href="tel:+32497278186"
                                className="group flex items-center gap-2 text-gray-400 hover:text-purple-400 transition mt-1"
                            >
                            <span className="transition-transform duration-200 group-hover:translate-x-1">
                            +32 497 27 81 86
                            </span>

                                <span className="opacity-0 group-hover:opacity-100 transition text-purple-400">
                                    →
                                </span>
                            </a>
                        </div>
                        {/* Profielen */}
                        <div>
                            <span className="text-gray-500">{t.footer.profile}</span>

                            <a
                                href="https://www.linkedin.com/in/koen-gielissen/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-2 text-gray-400 hover:text-purple-400 transition mt-1"
                            >
                                <Linkedin size={16} className="text-gray-500 group-hover:text-purple-400 transition" />

                                <span className="transition-transform duration-200 group-hover:translate-x-1">
                                    Koen Gielissen
                                </span>

                                <span className="opacity-0 group-hover:opacity-100 transition text-purple-400">
                                →
                                </span>
                            </a>

                            <a
                                href="https://www.linkedin.com/in/arisha-mezienova-9a0626305/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-2 text-gray-400 hover:text-purple-400 transition mt-1"
                            >
                                <Linkedin size={16} className="text-gray-500 group-hover:text-purple-400 transition" />

                                <span className="transition-transform duration-200 group-hover:translate-x-1">
                                    Arisha Mezienova
                                </span>

                                <span className="opacity-0 group-hover:opacity-100 transition text-purple-400">
                                    →
                                </span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Contact form */}
                <div className="max-w-lg w-full order-1 md:order-2">

                    <h3 className="text-xl font-semibold mb-6">
                        {t.footer.title}
                    </h3>

                    <form
                        id="contact-form"
                        action="https://formsubmit.co/hello@koppelbaar.agency"
                        method="POST"
                        className="grid grid-cols-2 gap-4"
                    >

                        <input type="hidden" name="_captcha" value="false"/>
                        <input type="text" name="_honey" style={{display: "none"}}/>
                        <input type="hidden" name="_subject" value="Nieuwe aanvraag via koppelbaar.agency"/>
                        <input type="hidden" name="_template" value="table"/>
                        <input type="hidden" name="_next" value={`https://koppelbaar.agency/${locale}/thanks`}/>
                        <input type="hidden" name="_captcha" value="false"/>
                        <input
                            type="hidden"
                            name="_autoresponse"
                            value="Thanks! We received your request and will contact you soon."
                        />

                        <input
                            name="name"
                            type="text"
                            required
                            placeholder={t.footer.name}
                            className="col-span-1 bg-black border border-gray-700 rounded-lg px-4 py-3"
                        />

                        <input
                            name="email"
                            type="email"
                            required
                            placeholder={t.footer.email}
                            className="col-span-1 bg-black border border-gray-700 rounded-lg px-4 py-3"
                        />

                        <div className="col-span-2">
                            <p className="text-sm text-gray-400 mb-4">
                                {t.footer.interest}
                            </p>

                            <div className="flex flex-wrap gap-3">
                                {options.map(option => (
                                    <button
                                        key={option}
                                        type="button"
                                        onClick={() => toggle(option)}
                                        className={`px-4 py-2 rounded-full border transition
                    ${
                                            selected.includes(option)
                                                ? "bg-purple-600 border-purple-600 text-white"
                                                : "border-gray-700 text-gray-300 hover:border-purple-400 hover:text-white"
                                        }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                            <input
                                type="hidden"
                                name="interests"
                                value={selected.join(", ")}
                            />
                        </div>

                        <textarea
                            name="message"
                            placeholder={t.footer.message}
                            rows={3}
                            className="col-span-2 bg-black border border-gray-700 rounded-lg px-4 py-3"
                        />

                        <div
                            id="turnstile-widget"
                            className="cf-turnstile"
                            data-sitekey="0x4AAAAAACqHxsri0XZmpKVW"
                            data-size="invisible"
                            data-callback="onTurnstileSuccess"
                        />
                        <button
                            type="button"
                            onClick={() => {
                                if (window.turnstile) {
                                    window.turnstile.execute("#turnstile-widget");
                                }
                            }}
                            className="col-span-2 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
                        >
                            {t.footer.send}
                        </button>

                    </form>

                </div>

            </div>

            {/* bottom */}
            <div className="max-w-6xl mx-auto mt-16 pt-6 border-t border-gray-800 text-xs sm:text-sm text-gray-500 flex items-center">

                <div className="flex items-center gap-4">
                    <span>© {new Date().getFullYear()} koppelbaar.</span>
                    <span>BTW BE0123.456.789</span>
                </div>

                <a
                    href={`/${locale}/privacy`}
                    className="ml-auto hover:text-white"
                >
                    {t.footer.privacy}
                </a>

            </div>


        </footer>
    );
}