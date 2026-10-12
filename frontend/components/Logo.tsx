"use client";

import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export default function Logo({ className, size = 36, showText = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Oyedokun logo"
      >
        <rect width="40" height="40" rx="6" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1"/>
        <circle cx="20" cy="20" r="7" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path
          d="M25 15 L32 15 L32 22 L26 28"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="20" cy="20" r="2.5" fill="currentColor"/>
      </svg>
      {showText && (
        <span
          style={{ fontFamily: "var(--font-urbanist), sans-serif", letterSpacing: "-0.5px" }}
          className="text-[15px] font-bold text-[var(--text-primary)]"
        >
          oyedokun<span className="opacity-40">.dev</span>
        </span>
      )}
    </div>
  );
}
