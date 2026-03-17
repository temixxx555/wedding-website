"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useInViewReveal } from "@/hooks/useInViewReveal";
import SectionHeader from "./SectionHeader";
import { slideLeft, slideRight } from "@/lib/variants";

const PEOPLE = [
  {
    role: "The Groom",
    name: "Gerrard Leandro",
    bio: "An adventurous soul with a passion for architecture and old films. Gerrard fell in love with Dianne during a rainy afternoon in a Parisian bookshop — and never looked back.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=90",
    href: "/about/groom",
    accent: "var(--color-gold)",
    details: [
      { label: "Hometown", value: "Milan, Italy" },
      { label: "Passion", value: "Architecture" },
      { label: "Favourite", value: "Old French Films" },
    ],
    variant: slideLeft,
  },
  {
    role: "The Bride",
    name: "Dianne Anna",
    bio: "A free spirit with a love for music, travel, and warm evenings by the sea. Dianne knew from the moment she met Gerrard that she had found something rare and irreplaceable.",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=90",
    href: "/about/bride",
    accent: "var(--color-rose)",
    details: [
      { label: "Hometown", value: "Lisbon, Portugal" },
      { label: "Passion", value: "Music & Travel" },
      { label: "Favourite", value: "Seaside Evenings" },
    ],
    variant: slideRight,
  },
] as const;

function Pip({ color }: { color: string }) {
  return (
    <span
      className='inline-block w-[5px] h-[5px] rounded-full flex-shrink-0'
      style={{ backgroundColor: color }}
    />
  );
}

function Card({
  person,
  delay = 0,
}: {
  person: (typeof PEOPLE)[number];
  delay?: number;
}) {
  const { ref, inView } = useInViewReveal(0.2);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      variants={person.variant}
      initial='hidden'
      animate={inView ? "visible" : "hidden"}
      transition={{ delay }}
      className='relative'
    >
      <Link href={person.href} className='block no-underline'>
        {/* ── Photo container ── */}
        <div
          className='relative overflow-hidden cursor-pointer'
          style={{ aspectRatio: "3/4" }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Photo with subtle zoom */}
          <motion.div
            className='absolute inset-0'
            animate={{ scale: hovered ? 1.09 : 1 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={person.img}
              alt={person.name}
              fill
              sizes='(max-width:768px) 100vw, 50vw'
              className='object-cover'
              style={{
                filter: hovered
                  ? "sepia(0%) contrast(1) brightness(0.5)"
                  : "sepia(20%) contrast(0.94) brightness(0.9)",
                transition: "filter 0.75s ease",
              }}
            />
          </motion.div>

          {/* Corner bracket decorations */}
          {(
            [
              {
                pos: "top-3 left-3",
                bTop: true,
                bLeft: true,
                bRight: false,
                bBot: false,
              },
              {
                pos: "top-3 right-3",
                bTop: true,
                bRight: true,
                bLeft: false,
                bBot: false,
              },
              {
                pos: "bottom-3 left-3",
                bBot: true,
                bLeft: true,
                bTop: false,
                bRight: false,
              },
              {
                pos: "bottom-3 right-3",
                bBot: true,
                bRight: true,
                bTop: false,
                bLeft: false,
              },
            ] as const
          ).map(({ pos, bTop, bLeft, bRight, bBot }, i) => (
            <span
              key={i}
              className={`absolute w-[18px] h-[18px] pointer-events-none transition-all duration-500 ${pos}`}
              style={{
                borderTop: bTop ? `1.5px solid ${person.accent}` : "none",
                borderBottom: bBot ? `1.5px solid ${person.accent}` : "none",
                borderLeft: bLeft ? `1.5px solid ${person.accent}` : "none",
                borderRight: bRight ? `1.5px solid ${person.accent}` : "none",
                opacity: hovered ? 1 : 0.35,
                transform: hovered ? "scale(1)" : "scale(0.85)",
              }}
            />
          ))}

          {/* ── Hover overlay panel ── */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                className='absolute inset-0 flex flex-col justify-end z-10'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Gradient scrim */}
                <div
                  className='absolute inset-0'
                  style={{
                    background:
                      "linear-gradient(to top, rgba(26,16,10,0.97) 0%, rgba(26,16,10,0.7) 45%, rgba(26,16,10,0.05) 100%)",
                  }}
                />

                {/* Sliding up content */}
                <motion.div
                  className='relative z-10 p-7'
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 16, opacity: 0 }}
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Role */}
                  <p
                    className='text-[0.56rem] tracking-[0.42em] uppercase mb-1'
                    style={{ color: person.accent }}
                  >
                    {person.role}
                  </p>

                  {/* Name */}
                  <h3
                    className='font-serif font-light italic text-white leading-tight mb-3'
                    style={{ fontSize: "clamp(1.35rem, 2.4vw, 1.85rem)" }}
                  >
                    {person.name}
                  </h3>

                  {/* Expanding divider line */}
                  <motion.div
                    className='mb-3 h-px'
                    style={{ backgroundColor: person.accent }}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
                  />

                  {/* Bio */}
                  <p
                    className='text-[0.77rem] leading-relaxed mb-5'
                    style={{ color: "rgba(255,255,255,0.68)" }}
                  >
                    {person.bio}
                  </p>

                  {/* Details */}
                  <div className='flex flex-col gap-[7px] mb-6'>
                    {person.details.map((d, di) => (
                      <motion.div
                        key={d.label}
                        className='flex items-center gap-2'
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + di * 0.06, duration: 0.35 }}
                      >
                        <Pip color={person.accent} />
                        <span
                          className='text-[0.58rem] tracking-[0.28em] uppercase'
                          style={{ color: person.accent }}
                        >
                          {d.label}
                        </span>
                        <span
                          className='text-[0.72rem]'
                          style={{ color: "rgba(255,255,255,0.6)" }}
                        >
                          — {d.value}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA */}
                  <motion.div
                    className='inline-flex items-center gap-2 text-[0.58rem] tracking-[0.35em]
                               uppercase border px-5 py-[9px] transition-colors duration-300'
                    style={{ borderColor: person.accent, color: person.accent }}
                    whileHover={
                      {
                        backgroundColor: person.accent,
                        color: "#fff",
                      } as never
                    }
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.32 }}
                  >
                    Read more
                    <motion.svg
                      width='10'
                      height='10'
                      viewBox='0 0 10 10'
                      fill='none'
                      animate={{ x: hovered ? 2 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <path
                        d='M1 5h8M5 1l4 4-4 4'
                        stroke='currentColor'
                        strokeWidth='1.2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </motion.svg>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Link>

      {/* ── Below-card label (always visible) ── */}
      <motion.div
        className='mt-5 text-center'
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: delay + 0.3, duration: 0.6 }}
      >
        <p
          className='text-[0.57rem] tracking-[0.42em] uppercase mb-1'
          style={{ color: person.accent }}
        >
          {person.role}
        </p>
        <h3
          className='font-serif font-normal italic'
          style={{
            fontSize: "clamp(1.35rem, 1.8vw, 1.65rem)",
            color: "var(--color-dark)",
          }}
        >
          {person.name}
        </h3>

        {/* Animated underline that widens on hover */}
        <div className='flex justify-center mt-2 overflow-hidden'>
          <motion.div
            className='h-px'
            style={{ backgroundColor: person.accent }}
            animate={{ width: hovered ? "80px" : "32px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Couple() {
  return (
    <section
      id='couple'
      className='py-28 px-8'
      style={{ backgroundColor: "#fff" }}
    >
      <SectionHeader
        tag='The Happy Couple'
        title='A Love Story Begins'
        subtitle='Two hearts, one destiny. We are overjoyed to share this celebration of love and commitment with our dearest family and friends.'
      />
      <div className='max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-start'>
        {PEOPLE.map((p, i) => (
          <Card key={p.name} person={p} delay={i * 0.14} />
        ))}
      </div>
    </section>
  );
}
