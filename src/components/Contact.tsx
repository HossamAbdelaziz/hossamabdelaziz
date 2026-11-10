import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';

const items = [
    {
        href: 'mailto:hossam.anwar.aziz@gmail.com',
        label: 'hossam.anwar.aziz@gmail.com',
        Icon: FaEnvelope,
    },
    {
        href: 'https://www.linkedin.com/in/Hossam-Anwar-Abdelaziz',
        label: 'linkedin.com/in/Hossam-Anwar-Abdelaziz',
        Icon: FaLinkedin,
    },
    {
        href: 'https://github.com/HossamAbdelaziz',
        label: 'github.com/HossamAbdelaziz',
        Icon: FaGithub,
    },
];

export default function Contact() {
    return (
        <section id="contact" className="mx-auto max-w-5xl px-6 py-20">
            <h2 className="text-sm font-semibold tracking-[0.14em] text-[var(--dim)] uppercase">
                Contact
            </h2>

            <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-[var(--muted)]">
                Open to a Summer 2027 software developer internship or co-op in the
                Greater Toronto Area.
            </p>

            <ul className="mt-8 space-y-3">
                {items.map(({ href, label, Icon }) => (
                    <li key={label}>
                        <a
                            href={href}
                            target={href.startsWith('http') ? '_blank' : undefined}
                            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="inline-flex items-center gap-3 text-[15px] text-[var(--muted)] transition hover:text-[var(--text)]"
                        >
                            <Icon className="text-[var(--dim)]" />
                            {label}
                        </a>
                    </li>
                ))}
            </ul>
        </section>
    );
}
