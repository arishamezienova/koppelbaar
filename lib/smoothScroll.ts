/**
 * Small utility for triggering smooth scrolls from anywhere in the app.
 * Uses the shared Lenis instance (exposed on `window.__lenis` by the
 * SmoothScroll layout component) when available, falls back to the
 * browser's native smooth scroll otherwise.
 */

import type Lenis from "lenis";

declare global {
    interface Window {
        __lenis?: Lenis;
    }
}

export function smoothScrollTo(top: number, duration = 2.0) {
    if (typeof window === "undefined") return;

    const lenis = window.__lenis;

    if (lenis) {
        lenis.scrollTo(top, {
            duration,
            easing: (t: number) =>
                t < 0.5
                    ? 4 * t * t * t
                    : 1 - Math.pow(-2 * t + 2, 3) / 2,
        });
    } else {
        window.scrollTo({ top, behavior: "smooth" });
    }
}
