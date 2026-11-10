import Image from 'next/image';
import RailNav from './RailNav';

const links = [
    { href: 'mailto:hossam.anwar.aziz@gmail.com', label: 'Email' },
    {
        href: 'https://www.linkedin.com/in/Hossam-Anwar-Abdelaziz',
        label: 'LinkedIn',
    },
    { href: 'https://github.com/HossamAbdelaziz', label: 'GitHub' },
];

export default function HomeRail() {
    return (
        <div className="flex h-full flex-col justify-between">
            <div>
                <div className="mx-auto mb-9 h-36 w-36 overflow-hidden rounded-[3px] sm:h-44 sm:w-44 lg:h-48 lg:w-48">
                    <Image
                        src="/images/hossam-portrait.jpg"
                        alt="Hossam Abdelaziz"
                        width={384}
                        height={384}
                        className="h-full w-full object-cover"
                        priority
                    />
                </div>

                <h1 className="t-display">
                    Hossam
                    <br />
                    Abdelaziz
                </h1>

                <p className="mt-4 font-mono text-[12px] tracking-[0.12em] text-[var(--accent-3)] uppercase">
                    Software developer
                </p>

                <p className="mt-7 max-w-[36ch] text-[16px] leading-relaxed text-[var(--ink-soft)]">
                    Three products I built alone, live on the web, iPhone and
                    Android. I work on all of it — the data model, the back end,
                    the apps, the deployments.
                </p>

                <p className="mt-4 max-w-[36ch] text-[16px] leading-relaxed text-[var(--ink)]">
                    Open to a Summer 2027 software developer internship or co-op.
                </p>

                <div className="mt-11">
                    <RailNav
                        items={[
                            { id: 'work', label: 'Work' },
                            { id: 'about', label: 'About' },
                            { id: 'contact', label: 'Contact' },
                        ]}
                    />
                </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[14px] lg:mt-0">
                {links.map((l) => (
                    <a
                        key={l.label}
                        className="rail-link"
                        href={l.href}
                        target={l.href.startsWith('http') ? '_blank' : undefined}
                        rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                        {l.label}
                    </a>
                ))}
            </div>
        </div>
    );
}
