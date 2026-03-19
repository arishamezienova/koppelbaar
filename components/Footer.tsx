"use client";

import { useState } from "react";
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

export default function Footer({ locale }: FooterProps) {

    const t = locale === "nl" ? nl : en;
    const options = t.footer.options;

    const [selected, setSelected] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const toggle = (value: string) => {
        setSelected(prev =>
            prev.includes(value)
                ? prev.filter(v => v !== value)
                : [...prev, value]
        );
    };

    // ✅ NIEUWE SUBMIT (API ROUTE)
    const handleSubmit = async () => {
        if (!window.grecaptcha) {
            console.log("reCAPTCHA not loaded");
            return;
        }

        setLoading(true);

        try {
            const token = await window.grecaptcha.execute(
                "6LdniY4sAAAAAF6sVm_m3IB-RN-pOVXTnzZLk5yh", // jouw site key
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
                            <span className="text-gray-500">Email</span>
                            <a href="mailto:hello@koppelbaar.agency"
                               className="text-gray-400 hover:text-purple-400 mt-1 block">
                                hello@koppelbaar.agency
                            </a>
                        </div>

                        <div>
                            <span className="text-gray-500">{t.footer.phone}</span>

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
                            <span className="text-gray-500">{t.footer.profile}</span>

                            <a href="https://www.linkedin.com/in/koen-gielissen/"
                               target="_blank"
                               className="flex items-center gap-2 text-gray-400 hover:text-purple-400 mt-1">
                                <Linkedin size={16}/> Koen Gielissen
                            </a>

                            <a href="https://www.linkedin.com/in/arisha-mezienova-9a0626305/"
                               target="_blank"
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
                        className="grid grid-cols-2 gap-4"
                    >


                        <input
                            name="name"
                            required
                            placeholder={t.footer.name}
                            className="bg-black border border-gray-700 rounded-lg px-4 py-3"
                        />

                        <input
                            name="email"
                            type="email"
                            required
                            placeholder={t.footer.email}
                            className="bg-black border border-gray-700 rounded-lg px-4 py-3"
                        />

                        <div className="col-span-2">
                            <div className="flex flex-wrap gap-3">
                                {options.map(option => (
                                    <button
                                        key={option}
                                        type="button"
                                        onClick={() => toggle(option)}
                                        className={`px-4 py-2 rounded-full border ${
                                            selected.includes(option)
                                                ? "bg-purple-600 text-white"
                                                : "border-gray-700 text-gray-300"
                                        }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <textarea
                            name="message"
                            placeholder={t.footer.message}
                            className="col-span-2 bg-black border border-gray-700 rounded-lg px-4 py-3"
                        />

                        {/* BUTTON */}
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={loading}
                            className="col-span-2 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
                        >
                            {loading ? "Versturen..." : t.footer.send}
                        </button>

                    </form>

                </div>
            </div>

            {/* bottom */}
            <div className="max-w-6xl mx-auto mt-16 pt-6 border-t border-gray-800 text-xs text-gray-500">

                <div className="flex">
                    <div className="flex gap-4">
                        <span>© {new Date().getFullYear()} koppelbaar.</span>
                        <span>BTW BE0791.252.457</span>
                    </div>

                    <a href={`/${locale}/privacy`} className="ml-auto hover:text-white">
                        {t.footer.privacy}
                    </a>
                </div>

                {/* 👇 NIEUW TOEGEVOEGD */}
                <p className="text-xs text-gray-500 mt-6 max-w-md">
                    This site is protected by reCAPTCHA and the Google{" "}
                    <a
                        href="https://policies.google.com/privacy"
                        target="_blank"
                        className="underline hover:text-white"
                    >
                        Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a
                        href="https://policies.google.com/terms"
                        target="_blank"
                        className="underline hover:text-white"
                    >
                        Terms of Service
                    </a>{" "}
                    apply.
                </p>

            </div>
        </footer>
    );
}