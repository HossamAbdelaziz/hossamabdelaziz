/**
 * Faint technical drawing behind the content column. Same node-graph motif
 * as the LinkedIn banner, so the two look like the same hand.
 *
 * Rules it follows: never over the reading column at desktop width, never
 * above 7% opacity, masked so it fades before it reaches any text, and
 * hidden entirely on small screens where there is no room to the side.
 */
export default function ContentTexture() {
  return (
    // Sticky with no height of its own, so it takes no space in the flow
    // but stays in view the whole way down the column.
    <div
      aria-hidden
      className="pointer-events-none sticky top-0 z-0 hidden h-0 lg:block"
    >
      <div className="absolute inset-x-0 top-0 h-screen overflow-hidden">
        {/* Top right: a node graph. */}
        <svg
          className="absolute -top-10 -right-24 w-[620px] opacity-[0.07]"
          viewBox="0 0 620 420"
          fill="none"
        >
          <g stroke="var(--ink)" strokeWidth="1">
            <path d="M60 60 L170 110 M170 110 L110 210 M170 110 L300 70 M110 210 L240 250 M300 70 L400 150 M240 250 L400 150 M400 150 L360 240 M470 80 L400 150 M470 80 L300 70 M360 240 L470 300 M540 180 L470 80 M540 180 L470 300" />
          </g>
          <g fill="var(--ink)">
            <circle cx="60" cy="60" r="4" />
            <circle cx="170" cy="110" r="6" />
            <circle cx="110" cy="210" r="4" />
            <circle cx="300" cy="70" r="4.5" />
            <circle cx="240" cy="250" r="4" />
            <circle cx="400" cy="150" r="6" />
            <circle cx="360" cy="240" r="3.5" />
            <circle cx="470" cy="80" r="4.5" />
            <circle cx="470" cy="300" r="4" />
            <circle cx="540" cy="180" r="3.5" />
          </g>
        </svg>

        {/* Lower right: concentric arcs, like a range diagram. */}
        <svg
          className="absolute top-[52%] -right-40 w-[520px] opacity-[0.05]"
          viewBox="0 0 520 520"
          fill="none"
        >
          <g stroke="var(--accent-2)" strokeWidth="1">
            <circle cx="300" cy="260" r="70" />
            <circle cx="300" cy="260" r="130" />
            <circle cx="300" cy="260" r="195" />
            <circle cx="300" cy="260" r="255" />
          </g>
          <g stroke="var(--ink)" strokeWidth="1" strokeDasharray="3 7">
            <path d="M300 5 L300 515 M45 260 L555 260" />
          </g>
        </svg>

        {/* Right edge: a stack of hairlines, like a ruler. */}
        <svg
          className="absolute top-[22%] right-0 w-[120px] opacity-[0.06]"
          viewBox="0 0 120 300"
          fill="none"
        >
          <g stroke="var(--accent-3)" strokeWidth="1">
            {Array.from({ length: 13 }, (_, i) => (
              <path
                key={i}
                d={`M${i % 4 === 0 ? 40 : 76} ${i * 24 + 8} L120 ${i * 24 + 8}`}
              />
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
}
