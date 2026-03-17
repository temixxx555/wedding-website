"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useAnimationFrame, AnimatePresence } from "framer-motion";
import SectionHeader from "./SectionHeader";

const TESTIMONIALS = [
  {
    name: "Eleanor Hartwell",
    relation: "Dianne's Mother",
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=120&q=80",
    quote:
      "Watching my daughter walk toward the man she loves — nothing in my life has ever made me cry and laugh at the same time so beautifully. These two were made for each other.",
    stars: 5,
  },
  {
    name: "Marcus Bell",
    relation: "Best Man",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80",
    quote:
      "I've known Gerrard for fifteen years. I've never seen him nervous about anything — until the moment he saw Dianne walk down the aisle. That's how I knew this was real.",
    stars: 5,
  },
  {
    name: "Sofia Carvalho",
    relation: "Dianne's Best Friend",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&q=80",
    quote:
      "Dianne used to read me Gerrard's letters out loud. Even then, we both knew. The day finally arrived and it was even more magical than all those letters promised.",
    stars: 5,
  },
  {
    name: "Roberto Leandro",
    relation: "Gerrard's Father",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&q=80",
    quote:
      "I told Gerrard when he was a boy that love is not a feeling, it is a decision you make every morning. He chose well. Dianne, welcome to our family — you already belong.",
    stars: 5,
  },
  {
    name: "Amara Osei",
    relation: "College Friend",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&q=80",
    quote:
      "The venue, the flowers, the food — all stunning. But none of it compared to the look on their faces during the vows. I will talk about this wedding for the rest of my life.",
    stars: 5,
  },
  {
    name: "Theo Walsh",
    relation: "Groomsman",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&q=80",
    quote:
      "I gave a speech. I cried. Everyone cried. Even the bartender cried. If that's not a sign of a perfect wedding, I don't know what is.",
    stars: 5,
  },
  {
    name: "Camille Dubois",
    relation: "Family Friend",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=120&q=80",
    quote:
      "I have attended many weddings. This is the first one where I forgot to check my phone all evening. Gerrard and Dianne have a gift for making everyone feel like they belong.",
    stars: 5,
  },
  {
    name: "Noah Firth",
    relation: "Groomsman",
    avatar: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=120&q=80",
    quote:
      "The first dance was something else. Gerrard practiced for months — and it showed. Dianne looked like she had always known this was coming. Maybe she did.",
    stars: 5,
  },
];

// Duplicate for seamless loop
const ITEMS = [...TESTIMONIALS, ...TESTIMONIALS];

const CARD_WIDTH = 340;
const CARD_GAP   = 24;
const STEP       = CARD_WIDTH + CARD_GAP;
const SPEED      = 0.45;

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-[3px]">
      {Array.from({ length: count }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.06, duration: 0.3, type: "spring", stiffness: 300 }}
          style={{ color: "var(--color-gold)", fontSize: "0.7rem" }}
        >
          ★
        </motion.span>
      ))}
    </div>
  );
}

function QuoteIcon({ opacity = 1 }: { opacity?: number }) {
  return (
    <svg
      width="32" height="24" viewBox="0 0 32 24" fill="none"
      style={{ opacity, flexShrink: 0 }}
    >
      <path
        d="M0 24V14.4C0 10.56 .853 7.307 2.56 4.64 4.267 1.973 6.827.373 10.24 0L12 2.88C9.92 3.413 8.267 4.507 7.04 6.16 5.813 7.76 5.2 9.6 5.2 11.68H10.4V24H0ZM19.6 24V14.4C19.6 10.56 20.453 7.307 22.16 4.64 23.867 1.973 26.427.373 29.84 0L31.6 2.88C29.52 3.413 27.867 4.507 26.64 6.16 25.413 7.76 24.8 9.6 24.8 11.68H30V24H19.6Z"
        fill="currentColor"
      />
    </svg>
  );
}

function TestimonialCard({ item }: { item: (typeof TESTIMONIALS)[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative flex-shrink-0 flex flex-col bg-white overflow-hidden"
      style={{
        width: CARD_WIDTH,
        boxShadow: hovered
          ? "0 24px 56px rgba(44,35,24,0.14)"
          : "0 4px 24px rgba(44,35,24,0.07)",
        transition: "box-shadow 0.4s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Accent top bar */}
      <motion.div
        className="h-[3px] w-full"
        style={{
          background: "linear-gradient(90deg, var(--color-gold), var(--color-rose))",
          transformOrigin: "left",
        }}
        animate={{ scaleX: hovered ? 1 : 0.3 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="flex flex-col flex-1 p-7">
        {/* Big quote mark */}
        <motion.div
          className="mb-4"
          style={{ color: "var(--color-blush)" }}
          animate={{ opacity: hovered ? 1 : 0.45, scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.4 }}
        >
          <QuoteIcon />
        </motion.div>

        {/* Stars */}
        <div className="mb-4">
          <Stars count={item.stars} />
        </div>

        {/* Quote text */}
        <p
          className="font-serif font-light italic flex-1 leading-relaxed mb-7"
          style={{
            fontSize: "clamp(0.92rem, 1.5vw, 1.05rem)",
            color: "var(--color-dark)",
          }}
        >
          &ldquo;{item.quote}&rdquo;
        </p>

        {/* Divider */}
        <motion.div
          className="h-px mb-6"
          style={{
            background: "linear-gradient(90deg, var(--color-blush), transparent)",
          }}
          animate={{ scaleX: hovered ? 1 : 0.6, transformOrigin: "left" }}
          transition={{ duration: 0.5 }}
        />

        {/* Author */}
        <div className="flex items-center gap-4">
          <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0 ring-2"
            style={{ ringColor: "var(--color-blush)" } as React.CSSProperties}>
            <div
              className="absolute inset-0 rounded-full"
              style={{ boxShadow: `0 0 0 2px var(--color-blush)` }}
            />
            <Image
              src={item.avatar}
              alt={item.name}
              fill
              sizes="44px"
              className="object-cover object-top"
            />
          </div>
          <div>
            <p
              className="text-[0.78rem] font-[400] leading-tight"
              style={{ color: "var(--color-dark)" }}
            >
              {item.name}
            </p>
            <p
              className="text-[0.62rem] tracking-[0.2em] uppercase mt-[2px]"
              style={{ color: "var(--color-gold)" }}
            >
              {item.relation}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const x        = useMotionValue(0);
  const paused   = useRef(false);
  const total    = STEP * TESTIMONIALS.length;
  const [active, setActive] = useState(0);

  /* Continuous scroll */
  useAnimationFrame(() => {
    if (paused.current) return;
    const next = x.get() - SPEED;
    x.set(next <= -total ? 0 : next);
    // Update active dot based on position
    const idx = Math.round(Math.abs(x.get()) / STEP) % TESTIMONIALS.length;
    setActive(idx);
  });

  return (
    <section
      id="testimonials"
      className="py-28 overflow-hidden relative"
      style={{ backgroundColor: "var(--color-cream)" }}
    >
      {/* Decorative background text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span
          className="font-display whitespace-nowrap"
          style={{
            fontSize: "clamp(8rem, 20vw, 18rem)",
            color: "rgba(184,151,90,0.045)",
            lineHeight: 1,
          }}
        >
          Love
        </span>
      </div>

      <div className="relative z-10">
        <div className="px-8">
          <SectionHeader
            tag="Words of Love"
            title="Our Friends Say"
            subtitle="The people who know us best — sharing the moments that meant the most to them."
          />
        </div>

        {/* ── Carousel ── */}
        <div
          className="relative"
          onMouseEnter={() => { paused.current = true;  }}
          onMouseLeave={() => { paused.current = false; }}
        >
          {/* Left fade */}
          <div
            className="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
            style={{
              background: "linear-gradient(to right, var(--color-cream) 0%, transparent 100%)",
            }}
          />
          {/* Right fade */}
          <div
            className="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
            style={{
              background: "linear-gradient(to left, var(--color-cream) 0%, transparent 100%)",
            }}
          />

          <motion.div
            className="flex"
            style={{
              x,
              gap: CARD_GAP,
              paddingLeft: 56,
              paddingRight: 56,
              paddingTop: 12,
              paddingBottom: 24,
              width: "max-content",
            }}
          >
            {ITEMS.map((item, i) => (
              <TestimonialCard key={`${item.name}-${i}`} item={item} />
            ))}
          </motion.div>
        </div>

        {/* ── Dot indicators ── */}
        <div className="flex justify-center items-center gap-[10px] mt-6">
          {TESTIMONIALS.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => { x.set(-(STEP * i)); setActive(i); }}
              className="border-none cursor-pointer p-0 rounded-full"
              animate={{
                width:           i === active ? 28 : 7,
                backgroundColor: i === active ? "var(--color-gold)" : "rgba(184,151,90,0.28)",
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ height: 7 }}
            />
          ))}
        </div>

        {/* ── Bottom counter ── */}
        <div className="flex justify-center mt-6">
          <p
            className="text-[0.6rem] tracking-[0.35em] uppercase"
            style={{ color: "var(--color-light-mid)" }}
          >
            {active + 1} &nbsp;/&nbsp; {TESTIMONIALS.length}
          </p>
        </div>
      </div>
    </section>
  );
}