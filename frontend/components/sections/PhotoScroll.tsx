"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const photos = [
  "/shoot/oyedokun-1.webp",
  "/shoot/oyedokun-2.webp",
  "/shoot/oyedokun-3.webp",
  "/shoot/oyedokun-4.webp",
  "/shoot/oyedokun-5.webp",
  "/shoot/oyedokun-6.webp",
  "/shoot/oyedokun-43.webp",
  "/shoot/oyedokun-7.webp",
  "/shoot/oyedokun-8.webp",
  "/shoot/oyedokun-9.webp",
  "/shoot/oyedokun-10.webp",
  "/shoot/oyedokun-11.webp",
  "/shoot/oyedokun-13.webp",
  "/shoot/oyedokun-14.webp",
  "/shoot/oyedokun-15.webp",
  "/shoot/oyedokun-44.webp",
  "/shoot/oyedokun-16.webp",
  "/shoot/oyedokun-slide-1.webp",
  "/shoot/oyedokun-slide-2.webp",
  "/shoot/oyedokun-slide-3.webp",
  "/shoot/oyedokun-slide-4.webp",
  "/shoot/oyedokun-slide-5.webp",
  "/shoot/oyedokun-45.webp",
  "/shoot/oyedokunken.webp",
  "/shoot/oyedokun-slide-6.webp",
  "/shoot/oyedokun-17.webp",
  "/shoot/oyedokun-18.webp",
  "/shoot/oyedokun-19.webp",
  "/shoot/oyedokun-20.webp",
  "/shoot/oyedokun-21.webp",
  "/shoot/oyedokun-22.webp",
  "/shoot/oyedokun-23.webp",
  "/shoot/oyedokun-24.webp",
  "/shoot/oyedokun-46.webp",
  "/shoot/oyedokun-25.webp",
  "/shoot/oyedokun-26.webp",
  "/shoot/oyedokun-27.webp",
  "/shoot/oyedokun-28.webp",
  "/shoot/oyedokun-29.webp",
  "/shoot/oyedokun-30.webp",
  "/shoot/oyedokun-47.webp",
  "/shoot/oyedokun-31.webp",
  "/shoot/oyedokun-32.webp",
  "/shoot/oyedokun-2.webp",
  "/shoot/oyedokunken.webp",
  "/shoot/oyedokun-48.webp",
  "/shoot/oyedokun-33.webp",
  "/shoot/oyedokun-34.webp",
  "/shoot/oyedokun-35.webp",
  "/shoot/oyedokun-36.webp",
  "/shoot/oyedokun-49.webp",
  "/shoot/oyedokun-37.webp",
  "/shoot/oyedokun-38.webp",
  "/shoot/oyedokun-39.webp",
  "/shoot/oyedokun-40.webp",
  "/shoot/oyedokun-50.webp",
  "/shoot/oyedokun-41.webp",
  "/shoot/oyedokun-42.webp",
];

const evens = photos.filter((_, i) => i % 2 === 0);
const odds  = photos.filter((_, i) => i % 2 === 1);
const row1 = [...evens, ...evens, ...evens];
const row2 = [...odds,  ...odds,  ...odds];

function PhotoStrip({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const [paused, setPaused] = useState(false);
  return (
    <div className="flex overflow-hidden">
      <div
        className="flex gap-3 flex-shrink-0"
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onPointerCancel={() => setPaused(false)}
        style={{
          width: "max-content",
          animation: `${reverse ? "marquee-scroll-reverse" : "marquee-scroll"} 35s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {items.map((src, i) => (
          <div
            key={i}
            className="relative w-[200px] h-[200px] flex-shrink-0 rounded-xl overflow-hidden border border-[var(--border-color)] group"
          >
            <Image
              src={src}
              alt={src.split('/').pop() || 'Oyedokun'}
              fill
              className="object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              sizes="200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PhotoScroll() {
  return (
    <section className="py-20 overflow-hidden bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-12">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-label block mb-4"
        >
          Behind the Screen
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-bold tracking-tight"
        >
          The person behind the code.
        </motion.h2>
      </div>

      <div className="space-y-3">
        <PhotoStrip items={row1} />
        <PhotoStrip items={row2} reverse />
      </div>
    </section>
  );
}
