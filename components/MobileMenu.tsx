"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Context ─── */
type Ctx = { openMenu: () => void };
const MenuCtx = createContext<Ctx>({ openMenu: () => {} });
export function useMenu() {
  const context = useContext(MenuCtx);
  if (!context) {
    throw new Error("useMenu must be used within MobileMenu Provider");
  }
  return context;
}

const NAV = [
  { label: "Home",        href: "#hero"    },
  { label: "About",       href: "#couple"  },
  { label: "Our Story",   href: "#story"   },
  { label: "The Wedding", href: "#wedding" },
  { label: "Gallery",     href: "#gallery" },
  { label: "RSVP",        href: "#rsvp"    },
];

export default function MobileMenu({ children }: { children?: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <MenuCtx.Provider value={{ openMenu: () => setOpen(true) }}>
      {children}

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-[300] flex flex-col items-center justify-center gap-8"
            style={{ backgroundColor: "var(--color-dark)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.35 } }}
          >
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="absolute top-6 right-7 text-[2.5rem] leading-none cursor-pointer bg-transparent border-none"
              style={{ color: "var(--color-blush)" }}
            >
              ×
            </button>

            {NAV.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="font-serif text-4xl no-underline"
                style={{ color: "#fff" }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ color: "var(--color-rose)" } as never}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </MenuCtx.Provider>
  );
}
