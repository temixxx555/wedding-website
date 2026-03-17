"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInViewReveal } from "@/hooks/useInViewReveal";
import SectionHeader from "./SectionHeader";

const EVENTS = [
  {
    id: "rehearsal",
    day: "18",
    month: "Dec",
    isoStart: "20261218T180000",
    isoEnd: "20261218T210000",
    time: "06:00 PM",
    title: "Rehearsal Dinner",
    venue: "The Garden Terrace",
    address: "Foxegan Hotel, West Wing, Los Angeles",
    description:
      "An intimate evening with the wedding party and close family. We'll walk through the ceremony, share a meal, and toast to the day ahead. Smart casual dress — come relaxed and ready to celebrate.",
    icon: "🕯️",
    accent: "var(--color-gold)",
    tag: "Evening Before",
    details: [
      { label: "Dress Code", value: "Smart Casual" },
      { label: "Duration", value: "3 Hours" },
      { label: "Hosted by", value: "The Families" },
    ],
  },
  {
    id: "ceremony",
    day: "19",
    month: "Dec",
    isoStart: "20261218T180000",
    isoEnd: "20261218T210000",
    time: "02:00 PM",
    title: "Wedding Ceremony",
    venue: "The Grand Ballroom",
    address: "Foxegan Hotel & Restaurant, Los Angeles",
    description:
      "The moment we have been waiting for. Please be seated by 1:45 PM. The ceremony will be followed by a champagne reception in the courtyard. Formal attire requested — this is the one.",
    icon: "💍",
    accent: "var(--color-rose)",
    tag: "The Big Day",
    details: [
      { label: "Dress Code", value: "Black Tie" },
      { label: "Duration", value: "45 Minutes" },
      { label: "Seats by", value: "1:45 PM" },
    ],
  },
  {
    id: "reception",
    day: "19",
    month: "Dec",
    isoStart: "20261218T180000",
    isoEnd: "20261218T210000",
    time: "05:00 PM",
    title: "Wedding Reception",
    venue: "The Rooftop Pavilion",
    address: "Foxegan Hotel, Rooftop Level, Los Angeles",
    description:
      "Dinner, dancing, and a night you will never forget. Live band from 7 PM. Open bar all evening. We have arranged shuttles to nearby hotels at midnight and 2 AM.",
    icon: "🥂",
    accent: "var(--color-blush)",
    tag: "Celebration",
    details: [
      { label: "Dress Code", value: "Black Tie" },
      { label: "Live Band", value: "From 7:00 PM" },
      { label: "Shuttle", value: "12 AM & 2 AM" },
    ],
  },
  {
    id: "brunch",
    day: "20",
    month: "Dec",
    isoStart: "20261218T180000",
    isoEnd: "20261218T210000",
    time: "11:00 AM",
    title: "Farewell Brunch",
    venue: "The Sunrise Lounge",
    address: "Foxegan Hotel, Ground Floor, Los Angeles",
    description:
      "A relaxed morning-after gathering for guests staying at the hotel. Coffee, good food, and a chance to relive the memories before we all head home. Casual and warm.",
    icon: "☕",
    accent: "var(--color-gold)",
    tag: "Morning After",
    details: [
      { label: "Dress Code", value: "Casual" },
      { label: "Duration", value: "2 Hours" },
      { label: "For", value: "Hotel Guests" },
    ],
  },
] as const;

/* ── tiny helpers ── */
function Dot({ color }: { color: string }) {
  return (
    <span
      className='inline-block w-[5px] h-[5px] rounded-full flex-shrink-0 mt-[5px]'
      style={{ backgroundColor: color }}
    />
  );
}

/* ── ICS file generator ── */
function makeICSUrl(event: {
  title: string;
  address: string;
  description: string;
  isoStart: string; // e.g. "20261218T180000"
  isoEnd: string; // e.g. "20261218T210000"
}) {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding//EN",
    "BEGIN:VEVENT",
    `DTSTART:${event.isoStart}`,
    `DTEND:${event.isoEnd}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description.replace(/\n/g, "\\n")}`,
    `LOCATION:${event.address}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
}

function AddToCalendar({
  title,
  accent,
  icsUrl,
}: {
  title: string;
  accent: string;
  icsUrl: string;
}) {
  return (
    <motion.a
      href={icsUrl}
      download={`${title.replace(/\s+/g, "-")}.ics`}
      className='inline-flex items-center gap-2 text-[0.58rem] tracking-[0.32em]
                 uppercase border px-4 py-2 no-underline transition-colors duration-300'
      style={{ borderColor: accent, color: accent }}
      whileHover={{ backgroundColor: accent, color: "#fff" } as never}
    >
      <svg width='11' height='11' viewBox='0 0 11 11' fill='none'>
        <rect
          x='1'
          y='2'
          width='9'
          height='8'
          rx='1'
          stroke='currentColor'
          strokeWidth='1.1'
        />
        <path
          d='M1 5h9M4 1v2M7 1v2'
          stroke='currentColor'
          strokeWidth='1.1'
          strokeLinecap='round'
        />
      </svg>
      Add to Calendar
    </motion.a>
  );
}

/* ── Single event card ── */
function EventCard({
  event,
  index,
  isOpen,
  onToggle,
}: {
  event: (typeof EVENTS)[number];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const { ref, inView } = useInViewReveal(0.15);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.12,
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
      }}
      className='relative'
    >
      {/* Vertical timeline line (except last) */}
      {index < EVENTS.length - 1 && (
        <div
          className='absolute left-[39px] top-[88px] bottom-0 w-px z-0'
          style={{ backgroundColor: "rgba(184,151,90,0.18)" }}
        />
      )}

      <div className='relative z-10 flex gap-6 md:gap-10 items-start'>
        {/* ── Date badge ── */}
        <motion.div
          className='flex-shrink-0 flex flex-col items-center justify-center text-center
                     border z-10 bg-white'
          style={{
            width: 80,
            height: 80,
            borderColor: event.accent,
          }}
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.3 }}
        >
          <span
            className='text-[0.52rem] tracking-[0.3em] uppercase leading-none mb-[3px]'
            style={{ color: event.accent }}
          >
            {event.month}
          </span>
          <span
            className='font-serif font-light leading-none'
            style={{ fontSize: "2.2rem", color: "var(--color-dark)" }}
          >
            {event.day}
          </span>
          <span
            className='text-[0.48rem] tracking-[0.2em] uppercase mt-[2px]'
            style={{ color: "var(--color-light-mid)" }}
          >
            2026
          </span>
        </motion.div>

        {/* ── Card body ── */}
        <div className='flex-1 min-w-0'>
          <motion.div
            className='border bg-white cursor-pointer overflow-hidden'
            style={{
              borderColor: isOpen ? event.accent : "rgba(184,151,90,0.15)",
            }}
            animate={{
              borderColor: isOpen ? event.accent : "rgba(184,151,90,0.15)",
            }}
            transition={{ duration: 0.4 }}
            onClick={onToggle}
          >
            {/* Card header */}
            <div className='flex items-start justify-between gap-4 p-6'>
              <div className='flex-1 min-w-0'>
                {/* Tag */}
                <div className='flex items-center gap-2 mb-2'>
                  <span className='text-lg'>{event.icon}</span>
                  <span
                    className='text-[0.54rem] tracking-[0.38em] uppercase'
                    style={{ color: event.accent }}
                  >
                    {event.tag}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className='font-serif font-light leading-tight mb-1'
                  style={{
                    fontSize: "clamp(1.2rem, 2.5vw, 1.65rem)",
                    color: "var(--color-dark)",
                  }}
                >
                  {event.title}
                </h3>

                {/* Time + venue */}
                <div className='flex flex-wrap items-center gap-x-3 gap-y-1 mt-2'>
                  <span
                    className='flex items-center gap-1 text-[0.7rem]'
                    style={{ color: event.accent }}
                  >
                    <svg width='10' height='10' viewBox='0 0 10 10' fill='none'>
                      <circle
                        cx='5'
                        cy='5'
                        r='4'
                        stroke='currentColor'
                        strokeWidth='1'
                      />
                      <path
                        d='M5 3v2l1.5 1.5'
                        stroke='currentColor'
                        strokeWidth='1'
                        strokeLinecap='round'
                      />
                    </svg>
                    {event.time}
                  </span>
                  <span style={{ color: "var(--color-blush)" }}>·</span>
                  <span
                    className='text-[0.7rem] truncate'
                    style={{ color: "var(--color-mid)" }}
                  >
                    {event.venue}
                  </span>
                </div>
              </div>

              {/* Expand chevron */}
              <motion.div
                className='flex-shrink-0 mt-1'
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 16 16'
                  fill='none'
                  style={{ color: event.accent }}
                >
                  <path
                    d='M3 6l5 5 5-5'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </motion.div>
            </div>

            {/* Accent top border that fills in when open */}
            <motion.div
              className='h-[2px] w-full'
              style={{ backgroundColor: event.accent, transformOrigin: "left" }}
              animate={{ scaleX: isOpen ? 1 : 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* ── Expandable body ── */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key='body'
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className='overflow-hidden'
                >
                  <div className='px-6 pb-7 pt-4'>
                    {/* Description */}
                    <p
                      className='text-sm leading-relaxed mb-6'
                      style={{ color: "var(--color-mid)" }}
                    >
                      {event.description}
                    </p>

                    {/* Detail rows */}
                    <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6'>
                      {event.details.map((d, di) => (
                        <motion.div
                          key={d.label}
                          className='flex flex-col gap-[3px]'
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: di * 0.07, duration: 0.4 }}
                        >
                          <span
                            className='text-[0.54rem] tracking-[0.3em] uppercase'
                            style={{ color: event.accent }}
                          >
                            {d.label}
                          </span>
                          <span
                            className='text-[0.8rem]'
                            style={{ color: "var(--color-dark)" }}
                          >
                            {d.value}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Address row */}
                    <div
                      className='flex items-start gap-2 text-[0.72rem] mb-6 pb-6 border-b'
                      style={{
                        color: "var(--color-mid)",
                        borderColor: "rgba(184,151,90,0.12)",
                      }}
                    >
                      <svg
                        className='flex-shrink-0 mt-[2px]'
                        width='11'
                        height='11'
                        viewBox='0 0 11 11'
                        fill='none'
                        style={{ color: event.accent }}
                      >
                        <path
                          d='M5.5 1C3.567 1 2 2.567 2 4.5c0 2.7 3.5 5.5 3.5 5.5s3.5-2.8 3.5-5.5C9 2.567 7.433 1 5.5 1zm0 4.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z'
                          fill='currentColor'
                        />
                      </svg>
                      {event.address}
                    </div>

                    {/* Actions */}
                    <div className='flex flex-wrap items-center gap-4'>
                      <AddToCalendar
                        title={event.title}
                        accent={event.accent}
                        icsUrl={makeICSUrl({
                          title: event.title,
                          address: event.address,
                          description: event.description,
                          isoStart: event.isoStart,
                          isoEnd: event.isoEnd,
                        })}
                      />
                      <motion.a
                        href={`https://maps.google.com?q=${encodeURIComponent(event.address)}`}
                        target='_blank'
                        rel='noreferrer'
                        className='inline-flex items-center gap-2 text-[0.58rem] tracking-[0.28em]
                                   uppercase no-underline transition-colors duration-300'
                        style={{ color: "var(--color-mid)" }}
                        whileHover={{ color: event.accent } as never}
                      >
                        <svg
                          width='10'
                          height='10'
                          viewBox='0 0 10 10'
                          fill='none'
                        >
                          <path
                            d='M1 9l8-8M3 1h6v6'
                            stroke='currentColor'
                            strokeWidth='1.2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                        Get Directions
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Spacer between cards */}
      {index < EVENTS.length - 1 && <div className='h-6' />}
    </motion.div>
  );
}

export default function Events() {
  const [openId, setOpenId] = useState<string>("ceremony");

  return (
    <section
      id='events'
      className='py-28 px-8'
      style={{ backgroundColor: "#fff" }}
    >
      <SectionHeader
        tag='Schedule'
        title='Wedding Events'
        subtitle='All the moments that make up our celebration. Mark your calendar and join us for as many as you can.'
      />

      {/* Timeline legend */}
      <div className='max-w-2xl mx-auto mb-12 flex flex-wrap justify-center gap-6'>
        {EVENTS.map((e) => (
          <button
            key={e.id}
            onClick={() => setOpenId(openId === e.id ? "" : e.id)}
            className='flex items-center gap-2 text-[0.58rem] tracking-[0.28em] uppercase
                       bg-transparent border-none cursor-pointer transition-opacity duration-300'
            style={{
              color: openId === e.id ? e.accent : "var(--color-light-mid)",
              opacity: openId === e.id ? 1 : 0.6,
            }}
          >
            <span>{e.icon}</span>
            {e.title}
          </button>
        ))}
      </div>

      {/* Event cards */}
      <div className='max-w-2xl mx-auto'>
        {EVENTS.map((event, i) => (
          <EventCard
            key={event.id}
            event={event}
            index={i}
            isOpen={openId === event.id}
            onToggle={() => setOpenId(openId === event.id ? "" : event.id)}
          />
        ))}
      </div>
    </section>
  );
}
