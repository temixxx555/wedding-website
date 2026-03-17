"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInViewReveal } from "@/hooks/useInViewReveal";
import SectionHeader from "./SectionHeader";

const CARDS = [
  {
    title: "Location",
    icon: "📍",
    img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=700&q=80",
    body: "Foxegan Hotel & Restaurant\n1423 Sunset Boulevard\nLos Angeles, California",
    cta: "Get Directions",
    href: "https://maps.google.com",
    external: true,
  },
  {
    title: "Gift Registry",
    icon: "🎁",
    img: "https://images.unsplash.com/photo-1548438294-1ad5d5f4f063?w=700&q=80",
    body: "Your presence is the greatest gift. However, if you'd like to bless us with something, we have a small wish list prepared with love.",
    cta: "View Registry",
    href: "#rsvp",
    external: false,
  },
  {
    title: "Accommodation",
    icon: "🏨",
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&q=80",
    body: "We've reserved a block of rooms at Foxegan Hotel for our guests. Book before November 1st to receive our special rate.",
    cta: "Book a Room",
    href: "#rsvp",
    external: false,
  },
] as const;

function Card({ card, delay }: { card: (typeof CARDS)[number]; delay: number }) {
  const { ref, inView } = useInViewReveal(0.18);

  return (
    <motion.article
      ref={ref}
      className="group bg-white overflow-hidden"
      style={{ boxShadow: "0 2px 20px rgba(44,35,24,0.06)" }}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -7, boxShadow: "0 22px 52px rgba(44,35,24,0.13)" }}
    >
      {/* Photo */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={card.img}
          alt={card.title}
          fill
          sizes="(max-width:768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ filter: "sepia(12%)" }}
        />
      </div>

      {/* Body */}
      <div className="p-8 text-center">
        <div className="text-2xl mb-3">{card.icon}</div>
        <h3
          className="font-serif text-[1.4rem] font-normal mb-3"
          style={{ color: "var(--color-dark)" }}
        >
          {card.title}
        </h3>
        <p
          className="text-sm leading-relaxed mb-6 whitespace-pre-line"
          style={{ color: "var(--color-mid)" }}
        >
          {card.body}
        </p>

        <motion.a
          href={card.href}
          target={card.external ? "_blank" : undefined}
          rel={card.external ? "noreferrer" : undefined}
          className="inline-block text-[0.6rem] tracking-[0.32em] uppercase border px-6 py-2
                     no-underline transition-colors duration-300"
          style={{ color: "var(--color-rose)", borderColor: "var(--color-rose)" }}
          whileHover={{ backgroundColor: "var(--color-rose)", color: "#fff" } as never}
        >
          {card.cta}
        </motion.a>
      </div>
    </motion.article>
  );
}

export default function WeddingInfo() {
  return (
    <section
      id="wedding"
      className="py-28 px-8"
      style={{ backgroundColor: "var(--color-cream)" }}
    >
      <SectionHeader
        tag="Plan Your Visit"
        title="The Wedding"
        subtitle="Everything you need to know to join us on our special day."
      />

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {CARDS.map((c, i) => (
          <Card key={c.title} card={c} delay={i * 0.12} />
        ))}
      </div>
    </section>
  );
}
