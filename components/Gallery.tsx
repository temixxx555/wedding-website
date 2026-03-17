"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useInViewReveal } from "@/hooks/useInViewReveal";
import SectionHeader from "./SectionHeader";

const PHOTOS = [
  {
    src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1200&q=90",
    thumb: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&q=80",
    alt: "Together",
    label: "Our First Portrait",
    wide: true,
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=1200&q=90",
    thumb: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=600&q=80",
    alt: "Proposal",
    label: "The Proposal",
    wide: false,
    tall: true,
  },
  {
    src: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=1200&q=90",
    thumb: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=600&q=80",
    alt: "Rings",
    label: "The Rings",
    wide: false,
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=90",
    thumb: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
    alt: "Venue",
    label: "Our Venue",
    wide: false,
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=90",
    thumb: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
    alt: "Venues",
    label: "Our Venue",
    wide: false,
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=1200&q=90",
    thumb: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=600&q=80",
    alt: "Date night",
    label: "Date Night",
    wide: false,
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200&q=90",
    thumb: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80",
    alt: "Dance",
    label: "First Dance",
    wide: true,
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1547637589-f54c34f5d7a4?w=1200&q=90",
    thumb: "https://images.unsplash.com/photo-1547637589-f54c34f5d7a4?w=600&q=80",
    alt: "Flowers",
    label: "The Florals",
    wide: false,
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=90",
    thumb: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
    alt: "Our first home",
    label: "Our First Home",
    wide: false,
    tall: false,
  },
] as const;

type Photo = (typeof PHOTOS)[number];

/* ─────────────────────────────────────────
   LIGHTBOX MODAL
───────────────────────────────────────── */
function Lightbox({
  photos,
  startIndex,
  onClose,
}: {
  photos: readonly Photo[];
  startIndex: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(startIndex);
  const [direction, setDirection] = useState(0); // -1 prev, +1 next

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + photos.length) % photos.length);
  }, [photos.length]);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % photos.length);
  }, [photos.length]);

  /* Keyboard navigation */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape")     onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next, onClose]);

  /* Lock body scroll */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:  (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  const photo = photos[current];

  return (
    <motion.div
      className="fixed inset-0 z-[500] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/92 cursor-pointer"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* ── Main image area ── */}
      <div className="relative z-10 flex items-center w-full h-full px-16 md:px-24">

        {/* ── LEFT ARROW ── */}
        <motion.button
          onClick={prev}
          className="absolute left-4 md:left-6 z-20 flex items-center justify-center
                     w-12 h-12 md:w-14 md:h-14 border border-white/20 bg-black/30
                     cursor-pointer backdrop-blur-sm transition-colors duration-300
                     hover:border-[var(--color-gold)] hover:bg-black/50"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Previous photo"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M11 14L6 9l5-5"
              stroke="white" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
        </motion.button>

        {/* ── Image ── */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center px-4"
            >
              {/* Photo frame */}
              <div
                className="relative"
                style={{
                  maxWidth: "min(860px, 85vw)",
                  maxHeight: "75vh",
                  width: "100%",
                  height: "100%",
                }}
              >
                {/* Corner brackets */}
                {[
                  { cls: "top-0 left-0",     bt: true, bl: true  },
                  { cls: "top-0 right-0",    bt: true, br: true  },
                  { cls: "bottom-0 left-0",  bb: true, bl: true  },
                  { cls: "bottom-0 right-0", bb: true, br: true  },
                ].map(({ cls, bt, bl, br, bb }, i) => (
                  <span
                    key={i}
                    className={`absolute w-6 h-6 pointer-events-none z-10 ${cls}`}
                    style={{
                      borderTop:    bt ? "1.5px solid var(--color-gold)" : "none",
                      borderBottom: bb ? "1.5px solid var(--color-gold)" : "none",
                      borderLeft:   bl ? "1.5px solid var(--color-gold)" : "none",
                      borderRight:  br ? "1.5px solid var(--color-gold)" : "none",
                    }}
                  />
                ))}

                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="860px"
                  className="object-contain"
                  priority
                />
              </div>

              {/* Caption */}
              <motion.div
                className="mt-5 text-center"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.4 }}
              >
                <p
                  className="font-serif font-light italic text-white/85"
                  style={{ fontSize: "clamp(1rem, 2vw, 1.3rem)" }}
                >
                  {photo.label}
                </p>
                <p
                  className="text-[0.6rem] tracking-[0.35em] uppercase mt-1"
                  style={{ color: "var(--color-gold)" }}
                >
                  {current + 1} / {photos.length}
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── RIGHT ARROW ── */}
        <motion.button
          onClick={next}
          className="absolute right-4 md:right-6 z-20 flex items-center justify-center
                     w-12 h-12 md:w-14 md:h-14 border border-white/20 bg-black/30
                     cursor-pointer backdrop-blur-sm transition-colors duration-300
                     hover:border-[var(--color-gold)] hover:bg-black/50"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Next photo"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M7 4l5 5-5 5"
              stroke="white" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      </div>

      {/* ── Close button ── */}
      <motion.button
        onClick={onClose}
        className="absolute top-5 right-5 z-20 flex items-center justify-center
                   w-10 h-10 border border-white/20 bg-black/30
                   cursor-pointer backdrop-blur-sm"
        whileHover={{ scale: 1.1, borderColor: "var(--color-rose)" }}
        whileTap={{ scale: 0.95 }}
        aria-label="Close"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M1 1l12 12M13 1L1 13"
            stroke="white" strokeWidth="1.5" strokeLinecap="round"
          />
        </svg>
      </motion.button>

      {/* ── Thumbnail strip ── */}
      <div className="absolute bottom-5 left-0 right-0 z-20 flex justify-center gap-2 px-4">
        {photos.map((p, i) => (
          <motion.button
            key={i}
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
            className="relative flex-shrink-0 overflow-hidden cursor-pointer border-2
                       transition-all duration-300"
            style={{
              width: 48, height: 36,
              borderColor: i === current ? "var(--color-gold)" : "transparent",
              opacity: i === current ? 1 : 0.45,
            }}
            whileHover={{ opacity: 1, scale: 1.05 }}
          >
            <Image
              src={p.thumb}
              alt={p.alt}
              fill
              sizes="48px"
              className="object-cover"
            />
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   GALLERY GRID ITEM
───────────────────────────────────────── */
function GalleryItem({
  photo,
  index,
  onOpen,
}: {
  photo: Photo;
  index: number;
  onOpen: (i: number) => void;
}) {
  const { ref, inView } = useInViewReveal(0.08);
  const [hovered, setHovered] = useState(false);

  const colSpan = photo.wide ? "col-span-2" : "col-span-1";
  const rowSpan = photo.tall ? "row-span-2" : "row-span-1";

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden group cursor-pointer ${colSpan} ${rowSpan}`}
      style={{ minHeight: 220 }}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.07, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(index)}
    >
      {/* Photo */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: hovered ? 1.07 : 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={photo.thumb}
          alt={photo.alt}
          fill
          sizes="(max-width:768px) 50vw, 25vw"
          className="object-cover"
          style={{
            filter: hovered
              ? "sepia(0%) brightness(0.5)"
              : "sepia(18%) brightness(0.88)",
            transition: "filter 0.6s ease",
          }}
        />
      </motion.div>

      {/* Corner brackets */}
      {[
        { cls: "top-2 left-2",    bt: true, bl: true  },
        { cls: "top-2 right-2",   bt: true, br: true  },
        { cls: "bottom-2 left-2", bb: true, bl: true  },
        { cls: "bottom-2 right-2",bb: true, br: true  },
      ].map(({ cls, bt, bl, br, bb }, i) => (
        <span
          key={i}
          className={`absolute w-4 h-4 z-10 pointer-events-none transition-all duration-400 ${cls}`}
          style={{
            borderTop:    bt ? "1.5px solid var(--color-gold)" : "none",
            borderBottom: bb ? "1.5px solid var(--color-gold)" : "none",
            borderLeft:   bl ? "1.5px solid var(--color-gold)" : "none",
            borderRight:  br ? "1.5px solid var(--color-gold)" : "none",
            opacity:    hovered ? 1 : 0,
            transform:  hovered ? "scale(1)" : "scale(0.7)",
          }}
        />
      ))}

      {/* Hover label overlay */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Scrim */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(26,16,10,0.92) 0%, rgba(26,16,10,0.45) 60%, rgba(26,16,10,0.1) 100%)",
              }}
            />

            <div className="relative z-10 text-center px-4">
              {/* View icon */}
              <motion.div
                className="flex items-center justify-center w-10 h-10 rounded-full
                           border border-white/40 mx-auto mb-3"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="3" stroke="white" strokeWidth="1.3" />
                  <path
                    d="M1 8C2.5 4.5 5 2.5 8 2.5S13.5 4.5 15 8c-1.5 3.5-4 5.5-7 5.5S2.5 11.5 1 8z"
                    stroke="white" strokeWidth="1.3"
                  />
                </svg>
              </motion.div>

              {/* Label */}
              <motion.p
                className="font-serif font-light italic text-white leading-tight"
                style={{ fontSize: "clamp(0.85rem, 1.8vw, 1.1rem)" }}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.06, duration: 0.35 }}
              >
                {photo.label}
              </motion.p>

              {/* Gold line */}
              <motion.div
                className="h-px mx-auto mt-2"
                style={{ backgroundColor: "var(--color-gold)" }}
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   MAIN GALLERY SECTION
───────────────────────────────────────── */
export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section
      id="gallery"
      className="pt-28 pb-0 px-8"
      style={{ backgroundColor: "var(--color-cream)" }}
    >
      <SectionHeader
        tag="Memories"
        title="Our Gallery"
        subtitle="Click any photo to view it in full — and explore the rest of our favourite moments."
      />

      {/* ── Masonry grid ── */}
     <div
  className="
    max-w-5xl mx-auto
    flex flex-col gap-3
    sm:grid
    sm:grid-cols-2
    lg:grid-cols-4
    sm:auto-rows-[220px]
  "
>
        {PHOTOS.map((p, i) => (
          <GalleryItem
            key={p.alt}
            photo={p}
            index={i}
            onOpen={(idx) => setLightboxIndex(idx)}
          />
        ))}
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            photos={PHOTOS}
            startIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}