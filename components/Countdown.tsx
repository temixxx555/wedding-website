"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeader from "./SectionHeader";

const WEDDING_DATE = new Date("2026-12-19T17:00:00").getTime();

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function useCountdown() {
  const calc = () => {
    const diff = Math.max(0, WEDDING_DATE - Date.now());
    return {
      d: Math.floor(diff / 86_400_000),
      h: Math.floor((diff % 86_400_000) / 3_600_000),
      m: Math.floor((diff % 3_600_000) / 60_000),
      s: Math.floor((diff % 60_000) / 1_000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function Unit({ value, label, delay }: { value: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center min-w-[72px]"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      <span
        className="font-serif font-light leading-none tabular-nums"
        style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", color: "var(--color-blush)" }}
      >
        {value}
      </span>
      <span
        className="mt-1 text-[0.58rem] tracking-[0.32em] uppercase"
        style={{ color: "var(--color-gold)" }}
      >
        {label}
      </span>
    </motion.div>
  );
}

function Sep() {
  return (
    <span
      className="font-serif pb-5 select-none"
      style={{ fontSize: "2.5rem", color: "rgba(255,255,255,0.12)" }}
    >
      :
    </span>
  );
}

export default function Countdown() {
  const { d, h, m, s } = useCountdown();

  return (
    <section
      id="countdown"
      className="relative py-24 px-8 overflow-hidden"
      style={{ backgroundColor: "var(--color-dark)" }}
    >
      {/* Ambient glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 18% 50%, rgba(201,130,107,0.13) 0%, transparent 58%)," +
            "radial-gradient(ellipse at 82% 50%, rgba(184,151,90,0.09) 0%, transparent 58%)",
        }}
      />

      <div className="relative z-10">
        <SectionHeader
          tag="Counting Down"
          title="The Wedding Day"
          subtitle="At Foxegan Hotel & Restaurant, Los Angeles"
          light
        />

        <div className="flex items-center justify-center gap-3 sm:gap-5 flex-wrap">
          <Unit value={pad(d)} label="Days"    delay={0.10} />
          <Sep />
          <Unit value={pad(h)} label="Hours"   delay={0.20} />
          <Sep />
          <Unit value={pad(m)} label="Minutes" delay={0.30} />
          <Sep />
          <Unit value={pad(s)} label="Seconds" delay={0.40} />
        </div>
      </div>
    </section>
  );
}
