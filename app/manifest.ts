import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Koppelbaar — Webbureau Hasselt",
        short_name: "Koppelbaar",
        description:
            "Moderne websites, web apps en platformen op maat voor bedrijven die willen groeien.",
        lang: "nl-BE",
        start_url: "/nl",
        scope: "/",
        display: "standalone",
        orientation: "portrait",
        theme_color: "#0a0a0a",
        background_color: "#ffffff",
        icons: [
            {
                src: "/icon-192.png",
                sizes: "192x192",
                type: "image/png",
                purpose: "any",
            },
            {
                src: "/icon-512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "any",
            },
            {
                src: "/apple-touch-icon.png",
                sizes: "180x180",
                type: "image/png",
                purpose: "any",
            },
        ],
    };
}
