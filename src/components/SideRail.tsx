'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const nav = [
    { id: 'work', label: 'Work' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
];

export default function SideRail() {
    const [active, setActive] = useState('work');

    useEffect(() => {
        const sections = nav
            .map((n) => document.getElementById(n.id))
            .filter((el): el is HTMLElement => Boolean(el));

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
                if (visible) setActive(visible.target.id);
            },
            { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
        );

        sections.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <div className="flex h-full flex-col justify-between">
            <div>
                <div className="mb-9 h-16 w-16 overflow-hidden rounded-[2px] lg:h-20 lg:w-20">
                    <Image
                        src="/images/hossam-portrait.jpg"
                        alt="Hossam Abdelaziz"
                        width={192}
                        height={192}
                        className="h-full w-full object-cover"
                        priority
                    />
                </div>

                <h1 className="t-display text-[var(--paper)]">
                    Hossam
                    <br />
                    Abdelaziz
                </h1>

                <p className="mt-5 font-mono text-[12px] tracking-[0.12em] text-[var(--accent-light)] uppercase">
                    Software developer
                </p>

                <p className="mt-7 max-w-[34ch] text-[16px] leading-relaxed text-[var(--paper-dim)]">
                    Three products I built alone, live on the web, iPhone and
                    Android. I work on all of it — the data model, the back end,
                    the apps, the deployments.
                </p>

                <p className="mt-5 max-w-[34ch] text-[16px] leading-relaxed text-[var(--paper)]">
                    Open to a Summer 2027 software developer internship or co-op.
                </p>

                <nav className="mt-12 hidden lg:block">
                    <ul className="space-y-3.5">
                        {nav.map((item) => {
                            const on = active === item.id;
                            return (
                                <li key={item.id}>
                                    <a
                                        href={`#${item.id}`}
                                        className="group flex items-center gap-4"
                                    >
                                        <span
                                            className={`h-px transition-all duration-300 ${
                                                on
                                                    ? 'w-14 bg-[var(--accent-light)]'
                                                    : 'w-7 bg-[var(--paper-dim)] group-hover:w-14 group-hover:bg-[var(--paper)]'
                                            }`}
                                        />
                                        <span
                                            className={`font-mono text-[11.5px] tracking-[0.14em] uppercase transition-colors ${
                                                on
                                                    ? 'text-[var(--paper)]'
                                                    : 'text-[var(--paper-dim)] group-hover:text-[var(--paper)]'
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
            </div>

            <div className="mt-12 flex flex-wrap gap-x-6 gap-y-2 text-[14px] lg:mt-0">
                <a className="rail-link" href="mailto:hossam.anwar.aziz@gmail.com">
                    Email
                </a>
                <a
                    className="rail-link"
                    href="https://www.linkedin.com/in/Hossam-Anwar-Abdelaziz"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    LinkedIn
                </a>
                <a
                    className="rail-link"
                    href="https://github.com/HossamAbdelaziz"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    GitHub
                </a>
            </div>
        </div>
    );
}
