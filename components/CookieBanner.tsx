"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import * as CookieConsent from "vanilla-cookieconsent";

export default function CookieBanner() {

    const pathname = usePathname();
    const locale = pathname.startsWith("/nl") ? "nl" : "en";

    useEffect(() => {

        // reset banner when language changes
        (CookieConsent as any).reset();

        CookieConsent.run({

            guiOptions: {
                consentModal: {
                    layout: "box",
                    position: "bottom right"
                },
                preferencesModal: {
                    layout: "box"
                }
            },

            categories: {
                necessary: {
                    enabled: true,
                    readOnly: true
                },
                analytics: {}
            },

            language: {
                default: locale,

                translations: {

                    en: {
                        consentModal: {
                            title: `<img src="/cookie.webp" style="width:24px;margin-right:8px;display:inline-block;vertical-align:middle;"> Your privacy matters`,
                            description:
                                "We use cookies to enhance your experience, analyse traffic, and serve personalised content. 'Accept all' to consent per our Cookie and Privacy policies.",
                            acceptAllBtn: "Accept all",
                            acceptNecessaryBtn: "Reject",
                            showPreferencesBtn: "Preferences"
                        },

                        preferencesModal: {
                            title: "Cookie preferences",
                            acceptAllBtn: "Accept all",
                            acceptNecessaryBtn: "Reject all",
                            savePreferencesBtn: "Save preferences",
                            closeIconLabel: "Close",
                            sections: [
                                {
                                    title: "Necessary cookies",
                                    description:
                                        "These cookies are essential for the website to function."
                                },
                                {
                                    title: "Analytics cookies",
                                    description:
                                        "These cookies help us analyse website usage.",
                                    linkedCategory: "analytics"
                                }
                            ]
                        }
                    },

                    nl: {
                        consentModal: {
                            title: `<img src="/cookie.webp" style="width:24px;margin-right:8px;display:inline-block;vertical-align:middle;"> Uw privacy is belangrijk`,
                            description:
                                "Wij gebruiken cookies om uw ervaring te verbeteren, verkeer te analyseren en gepersonaliseerde content te tonen. Klik op 'Alles accepteren' om toestemming te geven volgens ons Cookie- en Privacybeleid.",
                            acceptAllBtn: "Alles accepteren",
                            acceptNecessaryBtn: "Weigeren",
                            showPreferencesBtn: "Instellingen"
                        },

                        preferencesModal: {
                            title: "Cookie instellingen",
                            acceptAllBtn: "Alles accepteren",
                            acceptNecessaryBtn: "Alles weigeren",
                            savePreferencesBtn: "Instellingen opslaan",
                            closeIconLabel: "Sluiten",
                            sections: [
                                {
                                    title: "Noodzakelijke cookies",
                                    description:
                                        "Deze cookies zijn nodig voor de werking van de website."
                                },
                                {
                                    title: "Analytics cookies",
                                    description:
                                        "Deze cookies helpen ons begrijpen hoe bezoekers de website gebruiken.",
                                    linkedCategory: "analytics"
                                }
                            ]
                        }
                    }

                }

            }

        });

    }, [locale]);

    return null;
}