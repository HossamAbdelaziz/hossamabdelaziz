'use client';

import { useEffect, useState } from 'react';

export interface RailNavItem {
    id: string;
    label: string;
}

export default function RailNav({ items }: { items: RailNavItem[] }) {
    const [active, setActive] = useState(items[0]?.id ?? '');

    useEffect(() => {
        const sections = items
            .map((n) => document.getElementById(n.id))
            .filter((el): el is HTMLElement => Boolean(el));
        if (sections.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
                if (visible) setActive(visible.target.id);
            },
            { rootMargin: '-40% 0px -45% 0px', threshold: [0, 0.2, 0.5, 1] },
        );

        sections.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [items]);

    return (
        <nav className="hidden lg:block">
            <ul className="space-y-3">
                {items.map((item) => {
                    const on = active === item.id;
                    return (
                        <li key={item.id}>
                            <a href={`#${item.id}`} className="group flex items-center gap-4">
                                <span
                                    className={`h-px transition-all duration-300 ${
                                        on
                                            ? 'w-14 bg-[var(--accent)]'
                                            : 'w-7 bg-[var(--ink-faint)] group-hover:w-14 group-hover:bg-[var(--ink)]'
                                    }`}
                                />
                                <span
                                    className={`font-mono text-[11.5px] tracking-[0.14em] uppercase transition-colors ${
                                        on
                                            ? 'text-[var(--ink)]'
                                            : 'text-[var(--ink-faint)] group-hover:text-[var(--ink)]'
                                    }`}
                                >
                                    {item.label}
                                </span>
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
