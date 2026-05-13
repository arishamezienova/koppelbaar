"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Initialises Lenis (with built-in autoRaf so we don't run a competing
 * requestAnimationFrame loop) and intercepts same-page anchor clicks to
 * smooth-scroll to the target.
 *
 * Falls back to native `scrollIntoView` for users with prefers-reduced-motion
 * (where Lenis is skipped on purpose).
 */
export default function SmoothScroll() {
    useEffect(() => {
        if (typeof window === "undefined") return;

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        let lenis: Lenis | null = null;

        if (!prefersReducedMotion) {
            lenis = new Lenis({
                autoRaf: true,
                // Wheel/touch stays native — feels 1:1, no input lag.
                // Lenis is only here to power the smooth anchor scrollTo from
                // the CTA and logo click.
                smoothWheel: false,
            });

            // Expose for utilities elsewhere (logo click, etc.)
            window.__lenis = lenis;
        }

        // Belt-and-braces: even with scrollRestoration: "manual" set in the
        // layout's inline <head> script, ensure the page lands at the top
        // on (re)load. Avoids a flash of restored position before our reset.
        window.scrollTo(0, 0);

        const handleAnchorClick = (e: MouseEvent) => {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

            const target = e.target as HTMLElement | null;
            if (!target) return;

            const anchor = target.closest<HTMLAnchorElement>('a[href*="#"]');
            if (!anchor) return;

            const hrefAttr = anchor.getAttribute("href");
            if (!hrefAttr) return;

            const hashIndex = hrefAttr.indexOf("#");
            if (hashIndex === -1) return;
            const hash = hrefAttr.slice(hashIndex + 1);
            if (!hash) return;

            const targetEl = document.getElementById(hash);
            if (!targetEl) return;

            e.preventDefault();

            const top = targetEl.getBoundingClientRect().top + window.scrollY;

            if (lenis) {
                lenis.scrollTo(top, {
                    duration: 2.5,
                    // Cubic ease-in-out — slow start, fast middle, slow end.
                    // Reads as a deliberate journey for long-page anchors.
                    easing: (t) =>
                        t < 0.5
                            ? 4 * t * t * t
                            : 1 - Math.pow(-2 * t + 2, 3) / 2,
                });
            } else {
                window.scrollTo({ top, behavior: "smooth" });
            }

            // Deliberately NOT updating history with the hash — keeps refresh
            // landing the user at the top of the page instead of auto-scrolling
            // back to the section they previously clicked towards.
        };

        document.addEventListener("click", handleAnchorClick);

        return () => {
            document.removeEventListener("click", handleAnchorClick);
            lenis?.destroy();
            lenis = null;
            delete window.__lenis;
        };
    }, []);

    return null;
}
