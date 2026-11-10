import Link from 'next/link';

const nav = [
    { href: '/#work', label: 'Work' },
    { href: '/#about', label: 'About' },
    { href: '/#contact', label: 'Contact' },
];

export default function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--bg)_82%,transparent)] backdrop-blur">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
                <Link
                    href="/"
                    className="text-sm font-semibold tracking-tight text-[var(--text)]"
                >
                    Hossam Abdelaziz
                </Link>
                <nav className="flex items-center gap-6">
                    {nav.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-sm text-[var(--muted)] transition hover:text-[var(--text)]"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}
