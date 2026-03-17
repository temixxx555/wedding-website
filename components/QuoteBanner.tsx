"use client";

import { motion } from "framer-motion";
import { useInViewReveal } from "@/hooks/useInViewReveal";

export default function QuoteBanner() {
  const { ref, inView } = useInViewReveal(0.4);

  return (
    <div
      ref={ref}
      className="relative py-24 px-8 text-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #2c1f14 0%, #3d2a1e 100%)" }}
    >
      {/* Giant decorative quote */}
      <span
        className="absolute top-0 left-1/2 -translate-x-1/2 select-none pointer-events-none
                   font-serif leading-none"
        style={{ fontSize: "13rem", color: "rgba(255,255,255,0.025)" }}
      >
        ❝
      </span>

      <motion.p
        className="font-serif font-light italic max-w-2xl mx-auto mb-5 leading-relaxed"
        style={{
          fontSize: "clamp(1.3rem, 3vw, 2.2rem)",
          color: "rgba(255,255,255,0.85)",
        }}
        initial={{ opacity: 0, y: 26 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      >
        &ldquo;Whatever our souls are made of, his and mine are the same.&rdquo;
      </motion.p>

      <motion.p
        className="text-[0.62rem] tracking-[0.42em] uppercase"
        style={{ color: "var(--color-gold)" }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.35, duration: 0.7 }}
      >
        — Emily Brontë
      </motion.p>
    </div>
  );
}
