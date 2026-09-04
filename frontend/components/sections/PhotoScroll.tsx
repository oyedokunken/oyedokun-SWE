"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const photos = [
  "/shoot/oyedokun-1.png",
  "/shoot/oyedokun-2.png",
  "/shoot/oyedokun-3.png",
  "/shoot/oyedokun-4.png",
  "/shoot/oyedokun-5.png",
  "/shoot/oyedokun-6.png",
  "/shoot/oyedokun-7.png",
  "/shoot/oyedokun-8.png",
  "/shoot/oyedokun-9.png",
  "/shoot/oyedokun-10.png",
  "/shoot/oyedokun-11.png",
  "/shoot/oyedokun-13.png",
  "/shoot/oyedokun-14.png",
  "/shoot/oyedokun-15.png",
  "/shoot/oyedokun-16.jpg",
  "/shoot/oyedokun-slide-1.jpg",
  "/shoot/oyedokun-slide-2.jpg",
  "/shoot/oyedokun-slide-3.jpg",
  "/shoot/oyedokun-slide-4.jpg",
  "/shoot/oyedokun-slide-5.png",
  "/shoot/oyedokunken.jpg",
  "/shoot/oyedokun-slide-6.jpg",
  "/shoot/oyedokun-17.jpg",
  "/shoot/oyedokun-18.jpg",
  "/shoot/oyedokun-19.jpg",
  "/shoot/oyedokun-20.jpg",
  "/shoot/oyedokun-21.jpg",
  "/shoot/oyedokun-22.jpg",
  "/shoot/oyedokun-23.jpg",
  "/shoot/oyedokun-24.jpg",
  "/shoot/oyedokun-25.jpg",
  "/shoot/oyedokun-26.jpg",
  "/shoot/oyedokun-27.jpg",
  "/shoot/oyedokun-28.jpg",
  "/shoot/oyedokun-29.jpg",
  "/shoot/oyedokun-30.jpg",
  "/shoot/oyedokun-31.jpg",
  "/shoot/oyedokun-32.jpg",
  "/shoot/oyedokun-2.png",
  "/shoot/oyedokunken.jpg",
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
