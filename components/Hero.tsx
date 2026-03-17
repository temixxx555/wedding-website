"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { HeartIcon } from "./icons";
import pic from "../images/pic.jpg"
import love from "../images/love.jpg"

const SLIDES = [
  {
    src: pic,
    alt: "Couple portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1800&q=90",
    alt: "Wedding venue",
  },
  {
    src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1800&q=90",
    alt: "First dance",
  },
  {
    src: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=1800&q=90",
    alt: "The proposal",
  },
  {
    src: love,
    alt: "Romantic evening",
  },
];

const INTERVAL = 5000;

/** Delay helper keeps animate objects tidy */
const d = (delay: number) => ({
  transition: { delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
});

export default function Hero() {
  const petalsRef            = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const timerRef             = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ── Auto-advance carousel ── */
  const advance = (dir: 1 | -1 = 1) => {
    setCurrent((c) => (c + dir + SLIDES.length) % SLIDES.length);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => advance(1), INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  /* Clicking a dot resets the timer */
  const goTo = (i: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrent(i);
    timerRef.current = setInterval(() => advance(1), INTERVAL);
  };

  /* ── Client-only petal generation ── */
  useEffect(() => {
    const container = petalsRef.current;
    if (!container) return;
    container.innerHTML = "";
    for (let i = 0; i < 26; i++) {
      const el = document.createElement("div");
      const w  = 4 + Math.random() * 7;
      const h  = 7 + Math.random() * 9;
      el.style.cssText = `
        position:absolute;
        left:${Math.random() * 100}%;
        width:${w}px;
        height:${h}px;
        background:rgba(232,196,184,0.38);
        border-radius:50% 50% 50% 0;
        animation:floatPetal ${9 + Math.random() * 13}s linear infinite;
        animation-delay:${Math.random() * 15}s;
        pointer-events:none;
      `;
      container.appendChild(el);
    }
  }, []);

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center min-h-screen text-center overflow-hidden"
    >

      {/* ══════════════════════════════════════
          CAROUSEL BACKGROUND
      ══════════════════════════════════════ */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={current}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.07 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          >
            <Image
              src={SLIDES[current].src}
              alt={SLIDES[current].alt}
              fill
              priority={current === 0}
              sizes="100vw"
              className="object-cover"
              style={{ filter: "brightness(0.42) saturate(0.8)" }}
            />
          </motion.div>
        </AnimatePresence>

        {/* ── Warm colour-grade + vignette overlay ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              /* top vignette */
              "linear-gradient(180deg, rgba(26,16,10,0.45) 0%, rgba(26,16,10,0.0) 35%, rgba(26,16,10,0.0) 60%, rgba(26,16,10,0.65) 100%)," +
              /* warm blush glow left */
              "radial-gradient(ellipse at 22% 55%, rgba(201,130,107,0.22) 0%, transparent 58%)," +
              /* gold shimmer right */
              "radial-gradient(ellipse at 78% 28%, rgba(184,151,90,0.13) 0%, transparent 50%)",
          }}
        />
      </div>

      {/* ── Floating petals (above bg, below text) ── */}
      <div ref={petalsRef} className="absolute inset-0 pointer-events-none z-10" />

      {/* ══════════════════════════════════════
          HERO CONTENT
      ══════════════════════════════════════ */}
      <div className="relative z-20 px-6 gap-3 flex flex-col items-center">

        <motion.p
          className="text-[0.62rem] tracking-[0.5em] uppercase mb-5"
          style={{ color: "var(--color-gold)" }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0, ...d(2.6) }}
        >
          We Are Getting Married
        </motion.p>

        {/* Divider */}
        <motion.div
          className="flex items-center gap-4 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, ...d(2.72) }}
        >
          <span className="block h-px w-20" style={{ backgroundColor: "rgba(184,151,90,0.55)" }} />
          <HeartIcon className="w-4 h-4" style={{ fill: "var(--color-gold)" }} />
          <span className="block h-px w-20" style={{ backgroundColor: "rgba(184,151,90,0.55)" }} />
        </motion.div>

        {/* Names */}
        <motion.h1
          className="font-display leading-none"
          style={{
            fontSize: "clamp(3.6rem, 11vw, 8.5rem)",
            color: "#fff",
            textShadow: "0 4px 40px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4)",
          }}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0, ...d(2.84) }}
        >
          Eniola{" "}
          <span style={{ color: "var(--color-blush)" }}>&amp;</span>{" "}
          Joseph
        </motion.h1>

        {/* Date */}
        <motion.p
          className="text-[0.68rem] tracking-[0.5em] uppercase mt-14"
          style={{ color: "rgba(255,255,255,0.52)" }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0, ...d(3.0) }}
        >
          December 19, 2026 · Los Angeles, California
        </motion.p>

        {/* Venue */}
        <motion.p
          className="text-[0.72rem] tracking-[0.3em] font-extralight mt-4"
          style={{ color: "var(--color-blush)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, ...d(3.12) }}
        >
          Foxegan Hotel &amp; Restaurant
        </motion.p>
      </div>

      {/* ══════════════════════════════════════
          SLIDE INDICATOR DOTS
      ══════════════════════════════════════ */}
      <motion.div
        className="absolute bottom-[4.5rem] left-1/2 -translate-x-1/2 z-20 flex items-center gap-[10px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, ...d(3.5) }}
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="cursor-pointer border-none p-0 rounded-full transition-all duration-500"
            style={{
              width:           i === current ? "28px" : "7px",
              height:          "7px",
              backgroundColor: i === current
                ? "var(--color-gold)"
                : "rgba(255,255,255,0.32)",
              boxShadow: i === current
                ? "0 0 8px rgba(184,151,90,0.7)"
                : "none",
            }}
          />
        ))}
      </motion.div>

      {/* ── Scroll cue ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-[6px] z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, ...d(3.65) }}
      >
        <div
          className="w-px h-8 animate-scroll-dot"
          style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)" }}
        />
        <span
          className="text-[0.55rem] tracking-[0.38em] uppercase"
          style={{ color: "rgba(255,255,255,0.28)" }}
        >
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
