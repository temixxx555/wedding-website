"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInViewReveal } from "@/hooks/useInViewReveal";
import { HeartIcon } from "./icons";

// ← swap this for your actual couple photo
const PHOTO =
  "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1800&q=90";

export default function Footer() {
  const { ref, inView } = useInViewReveal(0.1);

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <footer
      ref={ref}
      className='relative flex flex-col items-center justify-end overflow-hidden'
      style={{ minHeight: "100vh" }}
    >
      {/* ── Full-bleed photo ── */}
      <div className='absolute inset-0'>
        <Image
          src={PHOTO}
          alt='Eniola & Joseph'
          fill
          sizes='100vw'
          className='object-cover object-center'
          style={{ filter: "brightness(0.55) saturate(0.85)" }}
        />
      </div>

      {/* ── Gradient overlays ── */}
      {/* top vignette */}
      <div
        className='absolute inset-0 pointer-events-none'
        style={{
          background:
            "linear-gradient(to bottom, rgba(15,10,6,0.55) 0%, rgba(15,10,6,0.0) 35%, rgba(15,10,6,0.0) 45%, rgba(15,10,6,0.88) 100%)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      />
      {/* warm blush glow */}
      <div
        className='absolute inset-0 pointer-events-none'
        style={{
          background:
            "radial-gradient(ellipse at 50% 80%, rgba(201,130,107,0.18) 0%, transparent 65%)",
               backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        }}
      />

      {/* ── Content pinned to bottom ── */}
      <div className='relative z-10 w-full text-center px-6 pb-16 pt-32'>
        {/* Thank you tag */}
        <motion.p
          className='text-[0.6rem] tracking-[0.55em] uppercase mb-6'
          style={{ color: "var(--color-gold)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.8, ease }}
        >
          With all our love
        </motion.p>

        {/* Names */}
        <motion.p
          className='font-display leading-none mb-4'
          style={{
            fontSize: "clamp(3.5rem, 10vw, 7rem)",
            color: "#fff",
            textShadow: "0 4px 40px rgba(0,0,0,0.5)",
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.9, ease }}
        >
          Eniola <span style={{ color: "var(--color-blush)" }}>&amp;</span>{" "}
          Joseph
        </motion.p>

        {/* Ornament row */}
        <motion.div
          className='flex items-center justify-center gap-4 my-7'
          initial={{ opacity: 0, scaleX: 0.5 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ delay: 0.32, duration: 0.8, ease }}
        >
          <span
            className='block h-px w-16 md:w-28'
            style={{ backgroundColor: "rgba(184,151,90,0.45)" }}
          />
          <HeartIcon
            className='w-4 h-4'
            style={{ fill: "var(--color-gold)" }}
          />
          <span
            className='block h-px w-16 md:w-28'
            style={{ backgroundColor: "rgba(184,151,90,0.45)" }}
          />
        </motion.div>

        {/* Thank you message */}
        <motion.p
          className='font-serif font-light italic max-w-lg mx-auto mb-3 leading-relaxed'
          style={{
            fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
            color: "rgba(255,255,255,0.82)",
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.42, duration: 0.85, ease }}
        >
          Thank you for being part of our story.
        </motion.p>

        <motion.p
          className='font-serif font-light italic max-w-md mx-auto mb-10'
          style={{
            fontSize: "clamp(0.85rem, 1.8vw, 1.05rem)",
            color: "rgba(255,255,255,0.45)",
          }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.55, duration: 0.8 }}
        >
          Your presence, laughter, and love made this day everything we ever
          dreamed it would be.
        </motion.p>

        {/* Date pill */}
        <motion.div
          className='inline-flex items-center gap-3 px-6 py-2 mb-12 border'
          style={{ borderColor: "rgba(184,151,90,0.35)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.62, duration: 0.7, ease }}
        >
          <span
            className='text-[0.58rem] tracking-[0.38em] uppercase'
            style={{ color: "var(--color-gold)" }}
          >
            December 19, 2026
          </span>
          <span style={{ color: "rgba(184,151,90,0.4)" }}>·</span>
          <span
            className='text-[0.58rem] tracking-[0.28em] uppercase'
            style={{ color: "rgba(255,255,255,0.38)" }}
          >
            Los Angeles, California
          </span>
        </motion.div>

        {/* Bottom micro line */}
        <motion.div
          className='flex items-center justify-center gap-2'
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.75, duration: 0.8 }}
        >
          <span
            className='block h-px w-8'
            style={{ backgroundColor: "rgba(184,151,90,0.25)" }}
          />
          <p
            className='text-[0.58rem] tracking-[0.3em] uppercase'
            style={{ color: "rgba(255,255,255,0.18)" }}
          >
            Forever
          </p>
          <span
            className='block h-px w-8'
            style={{ backgroundColor: "rgba(184,151,90,0.25)" }}
          />
        </motion.div>
      </div>
    </footer>
  );
}
