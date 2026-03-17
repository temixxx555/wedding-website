"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

/** Returns ref + boolean — component animates in once when it enters the viewport. */
export function useInViewReveal(amount = 0.18) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount });
  return { ref, inView };
}
