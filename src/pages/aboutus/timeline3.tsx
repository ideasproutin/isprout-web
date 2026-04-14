import { useRef, useState, useEffect } from "react";
import { animate, motion, useInView, useMotionValue } from "framer-motion";
import { COLORS } from "../../helpers/constants/Colors";

/* ─────────────────────────────────────────────
   Timeline data  (2017 → 2025)
───────────────────────────────────────────── */
const TIMELINE = [
  {
    year: "2017",
    tagline: "Journey begins in Hyderabad.",
    bullets: ["1 City", "1 Centre", "12K+ Sq Ft"],
  },
  {
    year: "2018",
    tagline: "Strengthened Hyderabad roots.", 
    bullets: ["1 City", "2 Centres", "97K+ Sq Ft"],
  },
  {
    year: "2019",
    tagline: "Expanded to new cities.",
    bullets: ["3 Cities", "5 Centres", "195K+ Sq Ft"],
  },
  {
    year: "2020",
    tagline: "Strengthened Chennai presence.",
    bullets: ["3 Cities", "6 Centres", "243K+ Sq Ft"],
  },
  {
    year: "2021",
    tagline: "Marked our Pune entry.",
    bullets: ["4 Cities", "7 Centres", "265K+ Sq Ft"],
  },
  {
    year: "2022",
    tagline: "Scaled in Hyderabad.",
    bullets: ["4 Cities", "9 Centres", "444K Sq Ft"],
  },
  {
    year: "2023",
    tagline: "Entered Bangalore strongly.",
    bullets: ["5 Cities", "13 Centres", "989K Sq Ft"],
  },
  {
    year: "2024",
    tagline: "Expanded our reach into Delhi.",
    bullets: ["6 Cities", "19 Centres", "1.5Mn Sq Ft"],
  },
  {
    year: "2025",
    tagline: "Entered Kolkata and Vizag.",
    bullets: ["8 Cities", "26 Centres", "2.5Mn Sq Ft"],
  },
];

/* ─────────────────────────────────────────────
   Canvas constants
   Cubic bezier growth curve (exponential upward):
     M 80,280  C 300,270  900,100  1200,35
   Dot positions are pre-computed at t = 0, 1/8, …, 1
   along that cubic bezier.
───────────────────────────────────────────── */
const CANVAS_W   = 1280;
const SVG_H      = 320;
const ITEM_W     = 110;
const PATH_D     = "M 80,280 C 300,270 900,100 1200,35";

// Evenly spaced x positions for consistent year/card/connector spacing
const DOTS = [
  { x: 80,   y: 280 },
  { x: 220,  y: 262 },
  { x: 360,  y: 238 },
  { x: 500,  y: 208 },
  { x: 640,  y: 172 },
  { x: 780,  y: 132 },
  { x: 920,  y: 95  },
  { x: 1060, y: 63  },
  { x: 1200, y: 35  },
] as const;

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */
export default function Timeline3() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const isInView   = useInView(sectionRef, { once: true, amount: 0.15 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [dotPosition, setDotPosition] = useState<{ x: number; y: number }>({
    x: DOTS[0].x,
    y: DOTS[0].y,
  });
  const [arrowAngle, setArrowAngle] = useState<number>(0);
  const [arrowScale, setArrowScale] = useState<number>(1);
  const drawProgress = useMotionValue(0);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const scrollWidth = container.scrollWidth - container.clientWidth;
      const progress = scrollWidth > 0 ? (scrollLeft / scrollWidth) * 100 : 0;
      setScrollProgress(progress);
    };

    container.addEventListener('scroll', handleScroll);
    // Initial calculation
    handleScroll();

    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isInView) {
      drawProgress.set(0);
      return;
    }

    const controls = animate(drawProgress, 1, {
      duration: 2.4,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: 0.2,
      onUpdate: (latest) => {
        const path = pathRef.current;
        if (!path) return;

        const pathLength = path.getTotalLength();
        const currentLength = pathLength * latest;
        const point = path.getPointAtLength(currentLength);

        const prev = path.getPointAtLength(Math.max(0, currentLength - 1));
        const next = path.getPointAtLength(Math.min(pathLength, currentLength + 1));
        const angle = (Math.atan2(next.y - prev.y, next.x - prev.x) * 180) / Math.PI;

        setDotPosition({ x: point.x, y: point.y });
        setArrowAngle(angle);

        // Subtle premium emphasis right at the end.
        if (latest > 0.96) {
          setArrowScale(1.08);
        } else {
          setArrowScale(1);
        }
      },
    });

    return () => controls.stop();
  }, [isInView, drawProgress]);

  return (
    <section
      ref={sectionRef}
      style={{
        width: "100%",
        background: "#fff",
        paddingTop: 72,
        paddingBottom: 72,
        fontFamily: "'Outfit', 'Poppins', sans-serif",
        overflow: "hidden",
      }}
    >
      <style>{`
        @media (min-width: 1025px) {
          .timeline-scroll-progress {
            display: none;
          }
        }
        .timeline-scroll-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      {/* ── Section heading ── */}
      <div style={{ maxWidth: 1280, margin: "0 auto", paddingLeft: 32, paddingRight: 32, marginBottom: 40 }}>
        <motion.h2
          style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, color: COLORS.brandBlue, margin: 0 }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Our Journey
        </motion.h2>
        <motion.p
          style={{ margin: "8px 0 0", fontSize: 15, color: "#666", lineHeight: 1.5 }}
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          From a single workspace to a growing national presence, iSprout’s journey reflects steady expansion and thoughtful growth.
        </motion.p>
      </div>

      {/* ── Horizontal-scroll wrapper ── */}
      <div
        ref={scrollContainerRef}
        className="timeline-scroll-container"
        style={{
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          // @ts-expect-error vendor prefix
          msOverflowStyle: "none" as React.CSSProperties["overflow"],
        }}
      >
        <div style={{ width: CANVAS_W, minWidth: CANVAS_W, position: "relative", margin: "0 auto" }}>

          {/* ── SVG: growth curve · dots · year labels · connectors ── */}
          <svg
            width={CANVAS_W}
            height={SVG_H}
            viewBox={`0 0 ${CANVAS_W} ${SVG_H}`}
            style={{ display: "block", overflow: "visible" }}
          >
            <defs>
              {/* Subtle yellow glow used on dots */}
              <filter id="t3-glow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* ── Dashed vertical connectors (dot → text baseline) ── */}
            {(() => {
              const BASELINE_Y = SVG_H - 4;
              
              return DOTS.map((pos, i) => (
                <motion.line
                  key={`conn-${i}`}
                  x1={pos.x}
                  y1={pos.y + 28}
                  x2={pos.x}
                  y2={BASELINE_Y}
                  stroke={COLORS.brandBlue}
                  strokeWidth={1}
                  strokeOpacity={0.25}
                  strokeDasharray="3 4"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.55 + i * 0.22, duration: 0.5 }}
                />
              ));
            })()}

            {/* ── Animated bezier growth line ── */}
            <motion.path
              ref={pathRef}
              d={PATH_D}
              fill="none"
              stroke={COLORS.brandBlue}
              strokeWidth={2}
              strokeLinecap="round"
              style={{ pathLength: drawProgress }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.2 }}
            />

            {/* Highlight marker that "draws" the line and lands on 2025 */}
            <motion.g
              transform={`translate(${dotPosition.x}, ${dotPosition.y}) rotate(${arrowAngle}) scale(${arrowScale})`}
              style={{ pointerEvents: "none" }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.2 }}
            >
              <polygon
                points="-18,-10 16,0 -18,10 -6,0"
                fill="#00275c"
              />
            </motion.g>

            {/* ── Dots (group translated to dot center for correct scale origin) ── */}
            {DOTS.map((pos, i) => (
              <motion.g
                key={`dot-${i}`}
                transform={`translate(${pos.x}, ${pos.y})`}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                whileHover={{
                  scale: 1.55,
                  transition: { type: "spring", stiffness: 420, damping: 14 },
                }}
                transition={{
                  opacity: { delay: 0.4 + i * 0.22, duration: 0.4 },
                  scale:   { delay: 0.4 + i * 0.22, type: "spring", stiffness: 280, damping: 18 },
                }}
                style={{ cursor: "default" }}
              >
              </motion.g>
            ))}

            {/* ── Year labels (above each dot, not scaled with dot hover) ── */}
            {DOTS.map((pos, i) => (
              <motion.text
                key={`yr-${i}`}
                x={pos.x}
                y={pos.y - 20}
                textAnchor="middle"
                fill={COLORS.brandBlue}
                fontSize={14}
                fontWeight={700}
                fontFamily="Outfit, Poppins, sans-serif"
                letterSpacing={0.4}
                initial={{ opacity: 0.7 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0.7 }}
                transition={{ delay: 0.55 + i * 0.22, duration: 0.4 }}
              >
                {TIMELINE[i].year}
              </motion.text>
            ))}
          </svg>

          {/* ── HTML text cards (tagline + bullets) below SVG ── */}
          <div style={{ position: "relative", height: 160, marginTop: 4, width: CANVAS_W }}>
            {DOTS.map((pos, i) => (
              <motion.div
                key={`card-${i}`}
                style={{
                  position: "absolute",
                  left: pos.x - ITEM_W / 2,
                  top: 0,
                  width: ITEM_W,
                }}
                initial={{ opacity: 0.6, y: 8 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.6, y: 8 }}
                transition={{ delay: 0.75 + i * 0.22, duration: 0.5, ease: "easeOut" }}
              >
                {/* Tagline */}
                <p
                  style={{
                    margin: "0 0 10px 0",
                    fontSize: 12,
                    fontStyle: "italic",
                    color: "#2a2a2a",
                    lineHeight: 1.6,
                  }}
                >
                  {TIMELINE[i].tagline}
                </p>

                {/* Stat bullets */}
                <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                  {TIMELINE[i].bullets.map((bullet, j) => (
                    <li
                      key={j}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        marginBottom: 6,
                        fontSize: 11.5,
                        color: "#111",
                        fontWeight: 500,
                      }}
                    >
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: COLORS.brandYellow,
                          border: `1.5px solid ${COLORS.brandBlue}`,
                          flexShrink: 0,
                          display: "block",
                        }}
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      {/* ── Scroll progress bar (mobile/tablet only) ── */}
      <div
        className="timeline-scroll-progress"
        style={{
          width: "100%",
          height: 3,
          background: "rgba(0, 0, 0, 0.15)",
          borderRadius: 2,
          overflow: "hidden",
          marginTop: 16,
        }}
      >
        <motion.div
          style={{
            height: "100%",
            background: "#000",
            borderRadius: 2,
            transformOrigin: "left",
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: scrollProgress / 100 }}
          transition={{ duration: 0.1, ease: "easeOut" }}
        />
      </div>
    </section>
  );
}
