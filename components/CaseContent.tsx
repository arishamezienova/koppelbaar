"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { MDXProvider } from "@mdx-js/react";

type Props = {
    slug: string;
    locale: string;
    screenshots?: { src: string; alt: string }[];
};

export default function CaseContent({ slug, locale, screenshots }: Props) {

    // De component die we in de MDX willen tonen
    const ScreenshotGallery = () => {
        if (!screenshots || screenshots.length === 0) return null;

        return (
            <div className="my-12 space-y-12 not-prose">
                {screenshots.map((img, i) => (
                    <div key={i} className="rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-white">
                        <Image
                            src={img.src}
                            alt={img.alt || "Project Screenshot"}
                            width={1200}
                            height={750}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                ))}
            </div>
        );
    };

    // De MDX file dynamisch laden
    const MDXContent: any = dynamic(() => import(`@/content/cases/${locale}/${slug}.mdx`), {
        ssr: true,
        loading: () => <p className="animate-pulse py-10">Inhoud laden...</p>,
    });

    return (
        <MDXProvider components={{ ScreenshotGallery }}>
            <MDXContent />
        </MDXProvider>
    );
}