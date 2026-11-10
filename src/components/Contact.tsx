import SectionLabel from './SectionLabel';

const items = [
    { href: 'mailto:hossam.anwar.aziz@gmail.com', label: 'hossam.anwar.aziz@gmail.com' },
    {
        href: 'https://www.linkedin.com/in/Hossam-Anwar-Abdelaziz',
        label: 'linkedin.com/in/Hossam-Anwar-Abdelaziz',
    },
    { href: 'https://github.com/HossamAbdelaziz', label: 'github.com/HossamAbdelaziz' },
];

export default function Contact() {
    return (
        <section
            id="contact"
            className="mx-auto max-w-[var(--w-page)] border-t border-[var(--rule)] px-5 py-16 sm:px-6 sm:py-24"
        >
            <SectionLabel>Contact</SectionLabel>

            <p className="t-prose mt-8">
                Open to a Summer 2027 software developer internship or co-op in the
                Greater Toronto Area.
            </p>

            <ul className="mt-8 space-y-3">
                {items.map(({ href, label }) => (
                    <li key={label}>
                        <a
                            href={href}
                            target={href.startsWith('http') ? '_blank' : undefined}
                            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="prose-link text-[15px]"
                        >
                            {label}
                        </a>
                    </li>
                ))}
            </ul>
        </section>
    );
}
