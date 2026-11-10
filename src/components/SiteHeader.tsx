import Link from 'next/link';

const nav = [
    { href: '/#work', label: 'Work' },
    { href: '/#about', label: 'About' },
    { href: '/#contact', label: 'Contact' },
];

export default function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 border-b border-[var(--rule)] bg-[var(--paper)]">
            <div className="mx-auto flex max-w-[var(--w-page)] items-baseline justify-between px-5 py-4 sm:px-6">
                <Link
                    href="/"
                    className="font-serif text-[17px] font-semibold tracking-tight text-[var(--ink)]"
                    style={{ fontFamily: 'var(--font-serif)' }}
                >
                    Hossam Abdelaziz
                </Link>
                <nav className="flex items-center gap-5 sm:gap-7">
                    {nav.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-[14px] text-[var(--ink-soft)] underline-offset-4 hover:underline"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}
