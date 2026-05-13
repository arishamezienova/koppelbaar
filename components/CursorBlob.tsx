"use client";

import { useEffect, useRef } from "react";

/**
 * Small circle that follows the cursor with subtle inertia and inverts
 * the colours underneath via mix-blend-mode: difference.
 *
 * Hidden on touch devices (no mouse) and for users who prefer reduced
 * motion. Position is updated via requestAnimationFrame + lerp — never
 * directly from mousemove — so heavy mouse activity won't thrash layout.
 */
export default function CursorBlob() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        if (typeof window === "undefined") return;
        if (window.matchMedia("(hover: none)").matches) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let targetX = -200;
        let targetY = -200;
        let currentX = -200;
        let currentY = -200;
        let rafId = 0;

        const onMove = (e: MouseEvent) => {
            targetX = e.clientX;
            targetY = e.clientY;
        };

        const tick = () => {
            // Lerp for soft trailing — feels alive without lag
            currentX += (targetX - currentX) * 0.22;
            currentY += (targetY - currentY) * 0.22;
            el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
            rafId = requestAnimationFrame(tick);
        };

        window.addEventListener("mousemove", onMove, { passive: true });
        rafId = requestAnimationFrame(tick);

        // Reveal once initialised (avoids flash at top-left of viewport on load)
        el.style.opacity = "1";

        return () => {
            window.removeEventListener("mousemove", onMove);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <div
            ref={ref}
            aria-hidden="true"
            className="cursor-blob pointer-events-none fixed top-0 left-0 z-[9999] opacity-0"
        />
    );
}
