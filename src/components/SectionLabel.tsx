export default function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <div className="section-bar" />
            <h2 className="t-label mt-4">{children}</h2>
        </div>
    );
}
