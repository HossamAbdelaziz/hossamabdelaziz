'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { Diagram as DiagramSpec } from '@/content/types';

const NODE_W = 168;
const NODE_H = 56;
const NODE_GAP = 18;
const COL_GAP = 64;
const TITLE_H = 28;
const PAD = 14;

interface Placed {
    id: string;
    label: string;
    role?: string;
    col: number;
    x: number;
    y: number;
}

/** useLayoutEffect warns during SSR; fall back to useEffect on the server. */
const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function Diagram({ spec }: { spec: DiagramSpec }) {
    const ref = useRef<HTMLDivElement>(null);
    const [armed, setArmed] = useState(false);
    const [shown, setShown] = useState(false);

    // Only hide things once we know scripting works, so the diagram is never
    // invisible without JS.
    useIsomorphicLayoutEffect(() => {
        const reduced = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches;
        if (reduced) {
            setShown(true);
            return;
        }
        setArmed(true);
    }, []);

    useEffect(() => {
        if (!armed || shown) return;
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((e) => e.isIntersecting)) {
                    setShown(true);
                    observer.disconnect();
                }
            },
            { threshold: 0 },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [armed, shown]);

    const placed: Placed[] = [];
    const maxRows = Math.max(...spec.columns.map((c) => c.nodes.length));
    const bodyH = maxRows * NODE_H + (maxRows - 1) * NODE_GAP;

    spec.columns.forEach((col, ci) => {
        const colH = col.nodes.length * NODE_H + (col.nodes.length - 1) * NODE_GAP;
        const offset = (bodyH - colH) / 2;
        col.nodes.forEach((node, ni) => {
            placed.push({
                ...node,
                col: ci,
                x: PAD + ci * (NODE_W + COL_GAP),
                y: PAD + TITLE_H + offset + ni * (NODE_H + NODE_GAP),
            });
        });
    });

    const width =
        PAD * 2 + spec.columns.length * NODE_W + (spec.columns.length - 1) * COL_GAP;
    const height = PAD * 2 + TITLE_H + bodyH;
    const byId = new Map(placed.map((p) => [p.id, p]));

    // Columns appear first, then the arrows between them.
    const nodeDelay = (col: number) => col * 180;
    const edgeDelay = 180 * spec.columns.length + 120;

    const cls = (base: string) =>
        armed ? `${base} reveal${shown ? ' is-in' : ''}` : base;

    return (
        <div ref={ref}>
            {/* Small screens get the pieces as a list; a 660px-wide SVG that
                scrolls sideways is worse than no diagram on a phone. */}
            <div className="border border-[var(--rule)] bg-[var(--paper-raised)] xl:hidden">
                {spec.columns.map((col) => (
                    <div
                        key={col.title}
                        className="border-b border-[var(--rule)] px-5 py-4 last:border-b-0"
                    >
                        {col.title && <p className="t-label">{col.title}</p>}
                        <ul className="mt-3 space-y-3">
                            {col.nodes.map((node) => (
                                <li key={node.id}>
                                    <p className="font-mono text-[13px] text-[var(--ink)]">
                                        {node.label}
                                    </p>
                                    {node.role && (
                                        <p className="text-[14px] text-[var(--ink-faint)]">
                                            {node.role}
                                        </p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="hidden border border-[var(--rule)] bg-[var(--paper-raised)] xl:block">
                <svg
                    viewBox={`0 0 ${width} ${height}`}
                    className="w-full"
                    role="img"
                    aria-label="System diagram"
                >
                    <defs>
                        <marker
                            id="diagram-arrow"
                            viewBox="0 0 8 8"
                            refX="7"
                            refY="4"
                            markerWidth="6"
                            markerHeight="6"
                            orient="auto-start-reverse"
                        >
                            <path d="M 0 1 L 7 4 L 0 7 z" fill="var(--accent)" />
                        </marker>
                    </defs>

                    {spec.columns.map((col, ci) =>
                        col.title ? (
                            <text
                                key={ci}
                                x={PAD + ci * (NODE_W + COL_GAP)}
                                y={PAD + 12}
                                fill="var(--ink-faint)"
                                fontFamily="var(--font-mono)"
                                fontSize="9.5"
                                letterSpacing="1.3"
                                className={cls('')}
                                style={{ transitionDelay: `${nodeDelay(ci)}ms` }}
                            >
                                {col.title.toUpperCase()}
                            </text>
                        ) : null,
                    )}

                    {spec.edges.map((edge, i) => {
                        const a = byId.get(edge.from);
                        const b = byId.get(edge.to);
                        if (!a || !b || a.col === b.col) return null;

                        const forward = a.col < b.col;
                        const sx = forward ? a.x + NODE_W : a.x;
                        const ex = forward ? b.x : b.x + NODE_W;
                        const sy = a.y + NODE_H / 2;
                        const ey = b.y + NODE_H / 2;
                        const bend = forward ? 48 : -48;

                        return (
                            <path
                                key={i}
                                d={`M ${sx} ${sy} C ${sx + bend} ${sy}, ${ex - bend} ${ey}, ${ex} ${ey}`}
                                fill="none"
                                stroke="var(--rule-strong)"
                                strokeWidth={1}
                                markerEnd="url(#diagram-arrow)"
                                className={cls('')}
                                style={{ transitionDelay: `${edgeDelay + i * 60}ms` }}
                            />
                        );
                    })}

                    {placed.map((node) => (
                        <g
                            key={node.id}
                            className={cls('')}
                            style={{ transitionDelay: `${nodeDelay(node.col)}ms` }}
                        >
                            <rect
                                x={node.x}
                                y={node.y}
                                width={NODE_W}
                                height={NODE_H}
                                fill="var(--rail)"
                                stroke="var(--rule)"
                                strokeWidth={1}
                            />
                            <text
                                x={node.x + 12}
                                y={node.y + (node.role ? 23 : 34)}
                                fill="var(--ink)"
                                fontFamily="var(--font-mono)"
                                fontSize="11.5"
                                fontWeight="500"
                            >
                                {node.label}
                            </text>
                            {node.role && (
                                <text
                                    x={node.x + 12}
                                    y={node.y + 40}
                                    fill="var(--ink-faint)"
                                    fontFamily="var(--font-sans)"
                                    fontSize="10"
                                >
                                    {node.role}
                                </text>
                            )}
                        </g>
                    ))}
                </svg>
            </div>

            <ul className="mt-8 max-w-[var(--w-read)]">
                {spec.edges.map((edge, i) => {
                    const a = byId.get(edge.from);
                    const b = byId.get(edge.to);
                    if (!a || !b) return null;
                    return (
                        <li
                            key={i}
                            className="border-t border-[var(--rule)] py-2.5 text-[15px] leading-relaxed text-[var(--ink-soft)]"
                        >
                            <span className="t-meta text-[var(--ink)]">
                                {a.label} → {b.label}
                            </span>
                            <br />
                            {edge.label}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
