"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInViewReveal } from "@/hooks/useInViewReveal";
import SectionHeader from "./SectionHeader";

/* ── Shared input style (object so we can spread it) ── */
const INPUT_STYLE: React.CSSProperties = {
  background: "transparent",
  border: "none",
  borderBottom: "1px solid rgba(255,255,255,0.15)",
  color: "#fff",
  fontFamily: "var(--font-body)",
  fontWeight: 300,
  fontSize: "0.9rem",
  padding: "0.55rem 0",
  outline: "none",
  width: "100%",
  transition: "border-color 0.3s",
};

const OPTION_STYLE: React.CSSProperties = { background: "var(--color-dark)" };

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label
      className="block text-[0.6rem] tracking-[0.32em] uppercase mb-1"
      style={{ color: "var(--color-gold)" }}
    >
      {children}
    </label>
  );
}

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  attendance: string;
  guests: string;
  meal: string;
  message: string;
};

const INIT: FormState = {
  firstName: "", lastName: "",
  email: "", attendance: "",
  guests: "1", meal: "",
  message: "",
};

export default function RSVP() {
  const { ref, inView } = useInViewReveal(0.15);
  const [form, setForm] = useState<FormState>(INIT);
  const [submitted, setSubmitted] = useState(false);

  function onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      id="rsvp"
      className="relative py-28 px-8 overflow-hidden"
      style={{ backgroundColor: "var(--color-dark)" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(201,130,107,0.15), transparent 68%)",
        }}
      />

      <SectionHeader
        tag="Are You Attending?"
        title="Send Your RSVP"
        subtitle="Please reserve your seat before November 30th, 2026. We can't wait to celebrate with you."
        light
      />

      <motion.div
        ref={ref}
        className="relative z-10 max-w-xl mx-auto"
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.85 }}
      >
        <AnimatePresence mode="wait">
          {submitted ? (
            /* ── Success state ── */
            <motion.div
              key="success"
              className="text-center py-16"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p
                className="font-serif text-[2.2rem] italic mb-3"
                style={{ color: "var(--color-blush)" }}
              >
                Thank you!
              </p>
              <div className="h-px w-16 mx-auto mb-4" style={{ backgroundColor: "var(--color-gold)" }} />
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
                We look forward to celebrating with you.
              </p>
            </motion.div>
          ) : (
            /* ── Form ── */
            <motion.form
              key="form"
              onSubmit={onSubmit}
              exit={{ opacity: 0 }}
            >
              {/* Row 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <Label>First Name</Label>
                  <input name="firstName" value={form.firstName} onChange={onChange}
                    placeholder="Your first name" required style={INPUT_STYLE} />
                </div>
                <div>
                  <Label>Last Name</Label>
                  <input name="lastName" value={form.lastName} onChange={onChange}
                    placeholder="Your last name" required style={INPUT_STYLE} />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <Label>Email</Label>
                  <input name="email" type="email" value={form.email} onChange={onChange}
                    placeholder="your@email.com" required style={INPUT_STYLE} />
                </div>
                <div>
                  <Label>Attendance</Label>
                  <select name="attendance" value={form.attendance} onChange={onChange}
                    required style={{ ...INPUT_STYLE, cursor: "pointer" }}>
                    <option value="" style={OPTION_STYLE}>Will you attend?</option>
                    <option value="yes" style={OPTION_STYLE}>Joyfully accepts</option>
                    <option value="no"  style={OPTION_STYLE}>Regretfully declines</option>
                  </select>
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <Label>Number of Guests</Label>
                  <input name="guests" type="number" min={1} max={6}
                    value={form.guests} onChange={onChange} style={INPUT_STYLE} />
                </div>
                <div>
                  <Label>Meal Preference</Label>
                  <select name="meal" value={form.meal} onChange={onChange}
                    style={{ ...INPUT_STYLE, cursor: "pointer" }}>
                    <option value="" style={OPTION_STYLE}>Select preference</option>
                    {["Standard", "Vegetarian", "Vegan", "Gluten-free"].map((m) => (
                      <option key={m} value={m} style={OPTION_STYLE}>{m}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="mb-8">
                <Label>Message for the Couple</Label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  placeholder="Share your warm wishes…"
                  rows={3}
                  style={{ ...INPUT_STYLE, resize: "none" }}
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                className="w-full border text-[0.65rem] tracking-[0.42em] uppercase
                           py-4 cursor-pointer font-light"
                style={{
                  background: "transparent",
                  borderColor: "var(--color-rose)",
                  color: "var(--color-rose)",
                  fontFamily: "var(--font-body)",
                  transition: "background 0.3s, color 0.3s",
                }}
                whileHover={{ backgroundColor: "var(--color-rose)", color: "#fff" } as never}
                whileTap={{ scale: 0.98 }}
              >
                Send RSVP
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
