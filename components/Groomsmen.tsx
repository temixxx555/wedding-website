"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import SectionHeader from "./SectionHeader";

const GROOMSMEN = [
  {
    name: "Marcus Bell",
    role: "Best Man",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=85",
  },
  {
    name: "Luca Romano",
    role: "Groomsman",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=85",
  },
  {
    name: "Theo Walsh",
    role: "Groomsman",
    img: "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=400&q=85",
  },
  {
    name: "James Osei",
    role: "Groomsman",
    img: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&q=85",
  },
  {
    name: "Noah Firth",
    role: "Groomsman",
    img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&q=85",
  },
  {
    name: "Ethan Moore",
    role: "Ring Bearer",
    img: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=400&q=85",
  },
];

// Duplicate for seamless infinite loop
const ITEMS = [...GROOMSMEN, ...GROOMSMEN];

const CARD_WIDTH = 260;
const CARD_GAP   = 24;
const STEP       = CARD_WIDTH + CARD_GAP;
const SPEED      = 0.55; // px per frame

function GroomsmanCard({
  person,
  paused,
}: {
  person: (typeof GROOMSMEN)[0];
  paused: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative flex-shrink-0 cursor-pointer select-none"
      style={{ width: CARD_WIDTH }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Photo */}
      <div className="relative overflow-hidden" style={{ height: 320 }}>
        {/* Corner brackets */}
        {[
          { cls: "top-3 left-3",   bt: true,  bl: true  },
          { cls: "top-3 right-3",  bt: true,  br: true  },
          { cls: "bottom-3 left-3", bb: true, bl: true  },
          { cls: "bottom-3 right-3",bb: true, br: true  },
        ].map(({ cls, bt, bl, br, bb }, i) => (
          <span
            key={i}
            className={`absolute z-10 w-4 h-4 pointer-events-none transition-all duration-400 ${cls}`}
            style={{
              borderTop:    bt ? "1.5px solid var(--color-gold)" : "none",
              borderBottom: bb ? "1.5px solid var(--color-gold)" : "none",
              borderLeft:   bl ? "1.5px solid var(--color-gold)" : "none",
              borderRight:  br ? "1.5px solid var(--color-gold)" : "none",
              opacity: hovered ? 1 : 0.3,
              transform: hovered ? "scale(1)" : "scale(0.8)",
            }}
          />
        ))}

        {/* Image */}
        <motion.div
          className="absolute inset-0"
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={person.img}
            alt={person.name}
            fill
            draggable={false}
            sizes="260px"
            className="object-cover object-top"
            style={{
              filter: hovered
                ? "sepia(0%) brightness(0.52)"
                : "sepia(20%) contrast(0.93) brightness(0.88)",
              transition: "filter 0.6s ease",
            }}
          />
        </motion.div>

        {/* Hover text overlay */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-end p-5 z-10"
          initial={false}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(26,16,10,0.95) 0%, rgba(26,16,10,0.5) 55%, transparent 100%)",
            }}
          />
          <motion.div
            className="relative z-10"
            animate={{ y: hovered ? 0 : 12 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="text-[0.56rem] tracking-[0.4em] uppercase mb-1"
              style={{ color: "var(--color-gold)" }}
            >
              {person.role}
            </p>
            <h4
              className="font-serif font-light italic text-white leading-tight"
              style={{ fontSize: "1.25rem" }}
            >
              {person.name}
            </h4>
            <motion.div
              className="mt-2 h-px"
              style={{ backgroundColor: "var(--color-gold)" }}
              animate={{ width: hovered ? "100%" : "0%" }}
              transition={{ delay: 0.08, duration: 0.45, ease: "easeOut" }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Below-card label */}
      <div className="mt-4 text-center">
        <p
          className="text-[0.56rem] tracking-[0.38em] uppercase mb-[3px]"
          style={{ color: "var(--color-gold)" }}
        >
          {person.role}
        </p>
        <p
          className="font-serif font-normal italic"
          style={{ fontSize: "1.15rem", color: "var(--color-dark)" }}
        >
          {person.name}
        </p>
        {/* Underline that widens on hover */}
        <div className="flex justify-center mt-[6px]">
          <motion.div
            className="h-px"
            style={{ backgroundColor: "var(--color-gold)" }}
            animate={{ width: hovered ? 60 : 24 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function Groomsmen() {
  const x          = useMotionValue(0);
  const paused     = useRef(false);
  const trackRef   = useRef<HTMLDivElement>(null);
  const totalWidth = STEP * GROOMSMEN.length;

  /* ── Continuous auto-scroll via useAnimationFrame ── */
  useAnimationFrame(() => {
    if (paused.current) return;
    const next = x.get() - SPEED;
    // When we've scrolled one full set, snap back silently
    x.set(next <= -totalWidth ? 0 : next);
  });

  return (
    <section
      id="groomsmen"
      className="py-28 overflow-hidden"
      style={{ backgroundColor: "var(--color-cream)" }}
    >
      <div className="px-8">
        <SectionHeader
          tag="Standing With Me"
          title="The Groomsmen and Bridal Train"
          subtitle="The brothers by blood or bond who stand beside me on this day. Each one a chapter in the story of who I am."
        />
      </div>

      {/* ── Carousel track ── */}
      <div
        className="relative"
        /* Pause on hover */
        onMouseEnter={() => { paused.current = true;  }}
        onMouseLeave={() => { paused.current = false; }}
      >
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none opacity-70"
          style={{
            background:
              "linear-gradient(to right, var(--color-cream) 0%, transparent 100%)",
          }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none opacity-70"
          style={{
            background:
              "linear-gradient(to left, var(--color-cream) 0%, transparent 100%)",
          }}
        />

        <motion.div
          ref={trackRef}
          className="flex"
          style={{
            x,
            gap: CARD_GAP,
            paddingLeft: 48,
            paddingRight: 48,
            width: "max-content",
          }}
        >
          {ITEMS.map((person, i) => (
            <GroomsmanCard
              key={`${person.name}-${i}`}
              person={person}
              paused={paused.current}
            />
          ))}
        </motion.div>
      </div>

      {/* ── Dot indicators ── */}
      <div className="flex justify-center gap-2 mt-10">
        {GROOMSMEN.map((_, i) => (
          <motion.button
            key={i}
            className="rounded-full border-none cursor-pointer p-0"
            style={{ backgroundColor: "var(--color-gold)", opacity: 0.25, height: 6, width: 6 }}
            whileHover={{ opacity: 1, scale: 1.3 }}
            onClick={() => {
              x.set(-(STEP * i));
            }}
          />
        ))}
      </div>
    </section>
  );
}