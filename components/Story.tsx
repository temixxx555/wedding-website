"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInViewReveal } from "@/hooks/useInViewReveal";
import SectionHeader from "./SectionHeader";
import { slideLeft, slideRight } from "@/lib/variants";

const EVENTS = [
  {
    year: "Spring 2012",
    title: "First Meeting",
    body: "A chance encounter in a Parisian bookshop during a sudden downpour. We both reached for the same worn copy of Camus — and somehow never let go.",
    img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&q=80",
    alt: "Paris bookshop",
    flip: false,
  },
  {
    year: "Summer 2013",
    title: "First Date",
    body: "A late summer dinner under the stars, a good bottle of wine, and a conversation that stretched until dawn. We knew, quietly, that night.",
    img: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=700&q=80",
    alt: "Romantic dinner",
    flip: true,
  },
  {
    year: "Autumn 2014",
    title: "Moving In Together",
    body: "A small apartment with big windows overlooking the city. We filled it with books, records, and the kind of ordinary magic that makes a home.",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=700&q=80",
    alt: "Our first home",
    flip: false,
  },
  {
    year: "Winter 2015",
    title: "The Proposal",
    body: "On a snowy evening in Central Park, Gerrard got down on one knee. Dianne said yes before he had finished the question.",
    img: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=700&q=80",
    alt: "The proposal",
    flip: true,
  },
] as const;

function TimelineItem({ event, index }: { event: (typeof EVENTS)[number]; index: number }) {
  const { ref, inView } = useInViewReveal(0.2);

  const textV = event.flip ? slideRight : slideLeft;
  const imgV  = event.flip ? slideLeft  : slideRight;

  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center mb-20 last:mb-0
                  ${event.flip ? "md:[direction:rtl]" : ""}`}
    >
      {/* Text */}
      <motion.div
        className="md:[direction:ltr]"
        variants={textV}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        transition={{ delay: 0.05 }}
      >
        {/* Year pill */}
        <span
          className="inline-block text-[0.58rem] tracking-[0.38em] uppercase mb-3 px-3 py-1 border"
          style={{ color: "var(--color-gold)", borderColor: "var(--color-gold)" }}
        >
          {event.year}
        </span>
        <h4
          className="font-serif text-[1.65rem] font-normal mb-3"
          style={{ color: "var(--color-dark)" }}
        >
          {event.title}
        </h4>
        <div className="h-px w-12 mb-4" style={{ backgroundColor: "var(--color-blush)" }} />
        <p className="text-sm leading-loose" style={{ color: "var(--color-mid)" }}>
          {event.body}
        </p>
      </motion.div>

      {/* Image */}
      <motion.div
        className="relative h-60 md:h-72 overflow-hidden md:[direction:ltr]"
        variants={imgV}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        transition={{ delay: 0.18 }}
        whileHover={{ scale: 1.025 }}
      >
        <Image
          src={event.img}
          alt={event.alt}
          fill
          sizes="(max-width:768px) 100vw, 50vw"
          className="object-cover transition-[filter] duration-500 hover:filter-none"
          style={{ filter: "sepia(18%)" }}
        />
      </motion.div>
    </div>
  );
}

export default function Story() {
  return (
    <section id="story" className="py-28 px-8" style={{ backgroundColor: "#fff" }}>
      <SectionHeader
        tag="Our Journey"
        title="The Story So Far"
        subtitle="Every love story is beautiful, but ours is our favourite. Here are the chapters that led us here."
      />

      {/* Vertical spine (desktop only) */}
      <div className="relative max-w-3xl mx-auto">
        <div
          className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
          style={{ backgroundColor: "var(--color-blush)" }}
        />
        {EVENTS.map((e, i) => (
          <TimelineItem key={e.title} event={e} index={i} />
        ))}
      </div>
    </section>
  );
}
