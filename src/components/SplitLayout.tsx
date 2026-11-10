export default function SplitLayout({
    rail,
    children,
}: {
    rail: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <div className="lg:flex">
            <div className="bg-[var(--rail)] lg:w-[42%] lg:max-w-[560px] lg:shrink-0">
                <div className="px-6 py-12 sm:px-10 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:py-16 xl:px-16">
                    <div className="mx-auto h-full w-full max-w-[560px] lg:mr-0 lg:ml-auto lg:max-w-[400px]">
                        {rail}
                    </div>
                </div>
            </div>

            <main className="min-w-0 flex-1 px-6 sm:px-10 lg:px-14 xl:px-20">
                {children}
            </main>
        </div>
    );
}
