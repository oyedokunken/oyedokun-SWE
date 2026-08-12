"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function ScrollToTop() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
      setVisible(scrollTop > 200);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const size = 52;
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference - progress * circumference;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 flex items-center justify-center"
          style={{ width: size, height: size }}
          aria-label="Scroll to top"
        >
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="absolute inset-0 -rotate-90"
            aria-hidden="true"
          >
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}
              strokeWidth="2"
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={isDark ? "#ffffff" : "#0a0a0a"}
              strokeWidth="2"
              strokeDasharray={circumference}
              strokeDashoffset={strokeOffset}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 0.08s linear" }}
            />
          </svg>
          <div
            className="relative z-10 w-9 h-9 flex items-center justify-center rounded-full group"
            style={{
              background: isDark ? "#ffffff" : "#0a0a0a",
              color: isDark ? "#0a0a0a" : "#ffffff",
            }}
          >
            <ArrowUp
              size={14}
              className="group-hover:-translate-y-0.5 transition-transform duration-200"
            />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
