"use client";

const items = [
  "React", "TypeScript", "Node.js", "Next.js", "PostgreSQL",
  "Express", "Prisma", "Supabase", "Docker", "GraphQL",
  "REST APIs", "System Design", "MongoDB", "Redis", "Tailwind CSS",
];

function StarSep() {
  return (
    <span className="mx-5 inline-flex items-center justify-center">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7 0L8.47 5.18L13.66 3.73L9.9 7L13.66 10.27L8.47 8.82L7 14L5.53 8.82L0.34 10.27L4.1 7L0.34 3.73L5.53 5.18L7 0Z"
          fill="currentColor"
          className="text-[var(--text-muted)]"
        />
      </svg>
    </span>
  );
}

export default function MarqueeSection() {
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className="py-7 border-y border-[var(--border-color)] overflow-hidden bg-[var(--bg-secondary)] relative">
      <div className="flex whitespace-nowrap animate-marquee will-change-transform">
        {repeated.map((item, i) => (
          <span key={i} className="inline-flex items-center">
            <span className="text-[13px] font-semibold tracking-[2px] uppercase text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-default select-none">
              {item}
            </span>
            <StarSep />
          </span>
        ))}
      </div>
    </div>
  );
}
