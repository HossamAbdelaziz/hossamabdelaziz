import Image from 'next/image';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const links = [
    {
        href: 'https://github.com/HossamAbdelaziz',
        label: 'GitHub',
        Icon: FaGithub,
    },
    {
        href: 'https://www.linkedin.com/in/Hossam-Anwar-Abdelaziz',
        label: 'LinkedIn',
        Icon: FaLinkedin,
    },
    {
        href: 'mailto:hossam.anwar.aziz@gmail.com',
        label: 'Email',
        Icon: FaEnvelope,
    },
];

export default function Hero() {
    return (
        <section id="top" className="relative overflow-hidden">
            <div className="field" aria-hidden />
            <div className="grid-lines" aria-hidden />

            <div className="relative mx-auto max-w-5xl px-6 pt-24 pb-20 sm:pt-32 sm:pb-24">
                <div className="flex flex-col-reverse items-start gap-10 sm:flex-row sm:items-center sm:gap-14">
                    <div className="min-w-0 flex-1">
                        <div className="rule-accent mb-7 h-[3px] w-16 rounded" />

                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                            Hossam Abdelaziz
                        </h1>

                        <p className="mt-3 text-xl font-medium text-[var(--muted)] sm:text-2xl">
                            Software developer
                        </p>

                        <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-[var(--muted)]">
                            I build and run three products that real people use every
                            day — on the web, on iPhone and on Android. I work on all of
                            it: the data model, the back end, the apps and the
                            deployments.
                        </p>

                        <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-[var(--muted)]">
                            Computer science student at Sheridan College, Ontario.{' '}
                            <span className="text-[var(--text)]">
                                Open to a Summer 2027 software developer internship or
                                co-op.
                            </span>
                        </p>

                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            {links.map(({ href, label, Icon }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target={href.startsWith('http') ? '_blank' : undefined}
                                    rel={
                                        href.startsWith('http')
                                            ? 'noopener noreferrer'
                                            : undefined
                                    }
                                    className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--muted)] transition hover:border-[var(--border-strong)] hover:text-[var(--text)]"
                                >
                                    <Icon className="text-base" />
                                    {label}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="shrink-0">
                        <div className="relative h-32 w-32 overflow-hidden rounded-2xl border border-[var(--border-strong)] sm:h-44 sm:w-44">
                            <Image
                                src="/images/hossam-portrait.jpg"
                                alt="Hossam Abdelaziz"
                                fill
                                sizes="176px"
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
