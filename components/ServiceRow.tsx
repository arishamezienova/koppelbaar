"use client";

import {
    useEffect,
    useRef,
    useState,
    type CSSProperties,
    type ReactNode,
} from "react";

type ServiceRowProps = {
    children: ReactNode;
    delay?: number;
};

/**
 * <li> with a one-shot scroll-in fade/rise. Direct child of <ul> so the
 * list markup stays semantically valid (a wrapping <div> from a separate
 * scroll-in helper would break the list semantic).
 */
export default function ServiceRow({ children, delay = 0 }: ServiceRowProps) {
    const ref = useRef<HTMLLIElement>(null);
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
        <li
            ref={ref}
            style={style}
            className={`relative py-7 md:py-8 scroll-in ${visible ? "scroll-in--visible" : ""}`}
        >
            {children}
        </li>
    );
}
