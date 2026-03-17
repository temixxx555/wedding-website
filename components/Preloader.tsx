"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 2600);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ backgroundColor: "var(--color-dark)" }}
          exit={{ opacity: 0, transition: { duration: 0.9, ease: "easeInOut" } }}
        >
          <motion.p
            className="font-display text-7xl"
            style={{ color: "var(--color-blush)", lineHeight: 1 }}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            E &amp; J
          </motion.p>

          <motion.div
            className="h-px w-16 my-4"
            style={{ backgroundColor: "var(--color-gold)", transformOrigin: "left" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.1, duration: 0.7, ease: "easeOut" }}
          />

          <motion.p
            className="text-[0.6rem] tracking-[0.5em] uppercase"
            style={{ color: "var(--color-light-mid)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.7 }}
          >
            Forever
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
