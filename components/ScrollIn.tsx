"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type ScrollInProps = {
    children: ReactNode;
    delay?: number;
    className?: string;
};

export default function ScrollIn({ children, delay = 0, className = "" }: ScrollInProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        if (typeof IntersectionObserver === "undefined") {
            setVisible(true);
            return;
        }

        const io = new IntersectionObserver(
            (entries) => {
                if (entries.some((e) => e.isIntersecting)) {
                    setVisible(true);
                    io.disconnect();
                }
            },
            { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
        );

        io.observe(el);
        return () => io.disconnect();
    }, []);

    const style = { "--scroll-in-delay": `${delay}ms` } as CSSProperties;

    return (
        <div
            ref={ref}
            style={style}
            className={`scroll-in ${visible ? "scroll-in--visible" : ""} ${className}`}
        >
            {children}
        </div>
    );
}
