"use client";

import { motion } from "framer-motion";
import { useInViewReveal } from "@/hooks/useInViewReveal";
import Ornament from "./Ornament";

interface Props {
  tag: string;
  title: string;
  subtitle?: string;
  light?: boolean;
}

export default function SectionHeader({ tag, title, subtitle, light }: Props) {
  const { ref, inView } = useInViewReveal(0.35);

  const textColor = light ? "#fff"                   : "var(--color-dark)";
  const tagColor  = light ? "var(--color-blush)"     : "var(--color-rose)";
  const subColor  = light ? "rgba(255,255,255,0.45)" : "var(--color-mid)";

  const base = { initial: { opacity: 0, y: 18 }, animate: inView ? { opacity: 1, y: 0 } : {} };

  return (
    <div ref={ref} className="text-center w-full mb-14">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.55 }}
      >
        <Ornament light={light} />
      </motion.div>

      <motion.p
        className="text-[0.62rem] tracking-[0.45em] uppercase mb-2"
        style={{ color: tagColor }}
        {...base}
        transition={{ delay: 0.08, duration: 0.65 }}
      >
        {tag}
      </motion.p>

      <motion.h2
        className="font-serif font-light leading-tight "
        style={{ fontSize: "clamp(2rem,4vw,3rem)", color: textColor }}
        {...base}
        transition={{ delay: 0.16, duration: 0.75 }}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          className="   mb-14 mt-3 text-sm leading-relaxed"
          style={{ color: subColor ,padding:"11px"}}
          {...base}
          transition={{ delay: 0.26, duration: 0.7 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
