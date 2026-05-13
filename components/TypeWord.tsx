"use client";

import { useEffect, useState } from "react";

type TypeWordProps = {
    text: string;
    typeSpeed?: number;
    deleteSpeed?: number;
    pauseEnd?: number;
    pauseStart?: number;
    startDelay?: number;
    /** When false (default), types once and stops — better for LCP. */
    loop?: boolean;
};

/**
 * Looping typewriter on a fixed-width slot: types `text`, pauses, deletes,
 * pauses, retypes — forever. Width is reserved up-front with an invisible
 * copy of the full text so the typing animation does not cause layout shifts
 * (was a major CLS contributor — Lighthouse 0.123 → 0 after this fix).
 *
 * Respects prefers-reduced-motion (renders the full text statically).
 * Full text is always present via sr-only for SEO and screen readers.
 */
export default function TypeWord({
    text,
    typeSpeed = 95,
    deleteSpeed = 55,
    pauseEnd = 1800,
    pauseStart = 600,
    startDelay = 1100,
    loop = false,
}: TypeWordProps) {
    const [display, setDisplay] = useState("");
    const [phase, setPhase] = useState<
        "initial" | "typing" | "pausedEnd" | "deleting" | "pausedStart" | "done"
    >("initial");

    useEffect(() => {
        if (
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            setDisplay(text);
            setPhase("done");
            return;
        }

        let timer: ReturnType<typeof setTimeout>;

        if (phase === "initial") {
            timer = setTimeout(() => setPhase("typing"), startDelay);
        } else if (phase === "typing") {
            if (display.length < text.length) {
                timer = setTimeout(
                    () => setDisplay(text.slice(0, display.length + 1)),
                    typeSpeed
                );
            } else {
                // Type complete — stop here when not looping (helps LCP)
                timer = setTimeout(
                    () => setPhase(loop ? "pausedEnd" : "done"),
                    0
                );
            }
        } else if (phase === "pausedEnd") {
            timer = setTimeout(() => setPhase("deleting"), pauseEnd);
        } else if (phase === "deleting") {
            if (display.length > 0) {
                timer = setTimeout(
                    () => setDisplay(text.slice(0, display.length - 1)),
                    deleteSpeed
                );
            } else {
                timer = setTimeout(() => setPhase("pausedStart"), 0);
            }
        } else if (phase === "pausedStart") {
            timer = setTimeout(() => setPhase("typing"), pauseStart);
        }

        return () => clearTimeout(timer);
    }, [display, phase, text, typeSpeed, deleteSpeed, pauseEnd, pauseStart, startDelay]);

    return (
        <span className="relative inline-block whitespace-nowrap align-baseline">
            {/* Width reservation — invisible, AT skips it (visibility: hidden) */}
            <span aria-hidden="true" className="invisible">
                {text}
            </span>

            {/* Visible animated text — overlays the reserve, doesn't take layout space */}
            <span
                aria-hidden="true"
                className="absolute left-0 top-0 whitespace-nowrap"
            >
                {display}
                {phase !== "done" && <span className="type-cursor">|</span>}
            </span>

            {/* For SEO + screen readers */}
            <span className="sr-only">{text}</span>
        </span>
    );
}
