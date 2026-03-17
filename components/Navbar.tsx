"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMenu } from "./MobileMenu";

const LINKS = [
  { label: "Home",        href: "#hero"    },
  { label: "About",       href: "#couple"  },
  { label: "Our Story",   href: "#story"   },
  { label: "The Wedding", href: "#wedding" },
  { label: "Gallery",     href: "#gallery" },
  { label: "RSVP",        href: "#rsvp"    },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { openMenu } = useMenu();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between transition-all duration-500"
      style={{
        padding: scrolled ? "0.85rem 2.5rem" : "1.4rem 2.5rem",
        background: scrolled ? "rgba(250,246,241,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 1px 24px rgba(44,35,24,0.08)" : "none",
      }}
      initial={{ y: -56, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.8, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Logo */}
      <a
        href="#hero"
        className="font-display text-3xl no-underline transition-colors duration-400"
        style={{ color: scrolled ? "var(--color-rose)" : "#fff" }}
      >
        E &amp; J
      </a>

      {/* Desktop nav */}
      <ul className="hidden md:flex items-center gap-9 list-none">
        {LINKS.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="text-[0.67rem] tracking-[0.25em] uppercase font-light
                         no-underline transition-colors duration-300
                         hover:text-[var(--color-rose)]"
              style={{ color: scrolled ? "var(--color-mid)" : "rgba(255,255,255,0.85)" }}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Hamburger (mobile) */}
      <button
        onClick={openMenu}
        aria-label="Open navigation"
        className="flex md:hidden flex-col gap-[5px] bg-transparent border-none cursor-pointer p-1"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block w-6 transition-colors duration-300"
            style={{
              height: "1.5px",
              backgroundColor: scrolled ? "var(--color-dark)" : "#fff",
            }}
          />
        ))}
      </button>
    </motion.nav>
  );
}
