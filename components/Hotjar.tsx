"use client";

import Script from "next/script";

export default function Hotjar() {

    return (
        <Script
            src="https://t.contentsquare.net/uxa/c793f7ae91402.js"
            strategy="lazyOnload"
        />
    );
}