"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Contributions } from "@/lib/github";
import { formatTooltip, getMonthLabels } from "@/lib/heatmap";

type ContributionGraphProps = {
  initialData: Contributions | null;
};

type ActiveCell = {
  date: string;
  count: number;
  left: number;
  top: number;
};

const CELL_SIZE = 11;
const CELL_GAP = 3;
const COLUMN_STEP = CELL_SIZE + CELL_GAP;
const GRAPH_LEFT = 36;
const GRAPH_TOP = 24;
const GRAPH_WIDTH = 780;
const GRAPH_HEIGHT = 132;

function rangeLabel(range: string) {
  return range === "last" ? "in the last year" : `in ${range}`;
}

function YearOptions({
  years,
  selectedRange,
  onSelect,
  mobile = false,
}: {
  years: number[];
  selectedRange: string;
  onSelect: (range: string) => void;
  mobile?: boolean;
}) {
  const options = ["last", ...years.map(String)];

  return (
    <div className={mobile ? "flex gap-2 overflow-x-auto pb-1 lg:hidden" : "hidden w-24 shrink-0 flex-col gap-1 lg:flex"}>
      {options.map((option) => {
        const selected = selectedRange === option;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={selected}
            onClick={() => onSelect(option)}
            className={`whitespace-nowrap rounded-full border px-3 py-2 text-left text-[11px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text-primary)]/50 ${
              selected
                ? "border-[var(--text-primary)] bg-[var(--text-primary)] text-[var(--bg)]"
                : "border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--text-primary)] hover:text-[var(--text-primary)]"
            }`}
          >
            {option === "last" ? "Last year" : option}
          </button>
        );
      })}
    </div>
  );
}

export default function ContributionGraph({ initialData }: ContributionGraphProps) {
  const [data, setData] = useState<Contributions | null>(initialData);
  const [selectedRange, setSelectedRange] = useState("last");
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState(!initialData);
  const [activeCell, setActiveCell] = useState<ActiveCell | null>(null);
  const [years, setYears] = useState(initialData?.years ?? []);
  const cache = useRef(new Map<string, Contributions>());
  const requestId = useRef(0);
  const graphScrollRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (initialData) cache.current.set("last", initialData);
  }, [initialData]);

  useEffect(() => {
    const container = graphScrollRef.current;
    if (container) container.scrollLeft = container.scrollWidth;
  }, [data]);

  useEffect(() => {
    if (initialData) return;

    let cancelled = false;
    fetch("/api/github/contributions?range=last")
      .then(async (response) => {
        if (!response.ok) throw new Error("Unable to load contributions");
        return (await response.json()) as Contributions;
      })
      .then((result) => {
        if (cancelled) return;
        cache.current.set("last", result);
        setData(result);
        setYears(result.years);
        setError(false);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [initialData]);

  const monthLabels = useMemo(() => getMonthLabels(data?.weeks ?? []), [data]);
  const graphLabel = data
    ? `GitHub contribution graph, ${data.total.toLocaleString("en-US")} contributions ${rangeLabel(selectedRange)}`
    : "GitHub contribution graph";

  async function selectRange(range: string) {
    setSelectedRange(range);
    setActiveCell(null);

    const cached = cache.current.get(range);
    if (cached) {
      setData(cached);
      setYears(cached.years);
      setError(false);
      return;
    }

    const currentRequest = ++requestId.current;
    setLoading(true);
    setError(false);

    try {
      const response = await fetch(`/api/github/contributions?range=${encodeURIComponent(range)}`);
      if (!response.ok) throw new Error("Unable to load contributions");
      const result = (await response.json()) as Contributions;
      if (currentRequest !== requestId.current) return;
      cache.current.set(range, result);
      setData(result);
      setYears((existing) => [...new Set([...existing, ...result.years])].sort((a, b) => b - a));
    } catch {
      if (currentRequest === requestId.current) setError(true);
    } finally {
      if (currentRequest === requestId.current) setLoading(false);
    }
  }

  function showCell(event: React.PointerEvent<SVGSVGElement>) {
    const target = (event.target as Element).closest<SVGRectElement>("rect[data-date]");
    if (!target || !graphScrollRef.current) return;

    const containerRect = graphScrollRef.current.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    setActiveCell({
      date: target.dataset.date ?? "",
      count: Number(target.dataset.count ?? 0),
      left: targetRect.left - containerRect.left + targetRect.width / 2,
      top: targetRect.top - containerRect.top,
    });
  }

  function closeCell(event: React.PointerEvent<HTMLDivElement>) {
    if (!(event.target as Element).closest("rect[data-date]")) setActiveCell(null);
  }

  const graphMotion = reduceMotion ? {} : { opacity: 1, y: 0 };

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={graphMotion}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-elevated)] p-5 sm:p-6"
      onPointerDown={closeCell}
    >
      <div className="mb-5 flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-medium text-[var(--text-primary)]">
            {data
              ? `${data.total.toLocaleString("en-US")} contributions ${rangeLabel(selectedRange)}`
              : "GitHub contributions"}
          </p>
          {loading && <span className="text-[11px] text-[var(--text-muted)]">Updating</span>}
        </div>
        <YearOptions years={years} selectedRange={selectedRange} onSelect={selectRange} mobile />
      </div>

      {error && !data ? (
        <div className="flex min-h-[180px] flex-col items-center justify-center gap-3 text-center">
          <p className="text-sm text-[var(--text-secondary)]">
            GitHub activity is temporarily unavailable.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => selectRange("last")}
              className="rounded-full bg-[var(--text-primary)] px-4 py-2 text-[11px] font-medium text-[var(--bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text-primary)]/50"
            >
              Try again
            </button>
            <a
              href="https://github.com/oyedokunken"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-[var(--text-secondary)] underline underline-offset-4 hover:text-[var(--text-primary)]"
            >
              View GitHub profile
            </a>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-5">
          <div
            ref={graphScrollRef}
            className={`relative min-w-0 flex-1 overflow-x-auto transition-opacity duration-200 ${loading ? "opacity-50" : "opacity-100"}`}
          >
            {activeCell && (
              <div
                role="status"
                className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md border border-[var(--border-color)] bg-[var(--bg)] px-2.5 py-1.5 text-[11px] text-[var(--text-primary)] shadow-lg after:absolute after:left-1/2 after:top-full after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-[var(--border-color)]"
                style={{ left: activeCell.left, top: Math.max(activeCell.top - 8, 32) }}
              >
                {formatTooltip(activeCell.date, activeCell.count)}
              </div>
            )}
            <svg
              role="img"
              aria-label={graphLabel}
              viewBox={`0 0 ${GRAPH_WIDTH} ${GRAPH_HEIGHT}`}
              className="block min-w-[780px] w-full"
              onPointerMove={showCell}
              onPointerDown={showCell}
              onPointerLeave={() => setActiveCell(null)}
            >
              {monthLabels.map(({ weekIndex, label }) => (
                <text
                  key={`${weekIndex}-${label}`}
                  x={GRAPH_LEFT + weekIndex * COLUMN_STEP}
                  y="12"
                  className="fill-[var(--text-muted)] text-[10px]"
                >
                  {label}
                </text>
              ))}
              {["Mon", "Wed", "Fri"].map((label, index) => (
                <text
                  key={label}
                  x="0"
                  y={GRAPH_TOP + (index * 2 + 1) * COLUMN_STEP + 9}
                  className="fill-[var(--text-muted)] text-[10px]"
                >
                  {label}
                </text>
              ))}
              {data?.weeks.map((week, weekIndex) =>
                week.days.map((day, dayIndex) => {
                  const active = activeCell?.date === day.date;
                  return (
                    <rect
                      key={day.date}
                      x={GRAPH_LEFT + weekIndex * COLUMN_STEP}
                      y={GRAPH_TOP + dayIndex * COLUMN_STEP}
                      width={CELL_SIZE}
                      height={CELL_SIZE}
                      rx="2"
                      fill={`var(--gh-l${Math.max(0, Math.min(day.level, 4))})`}
                      stroke="var(--border-color)"
                      strokeOpacity={day.level === 0 ? 0.35 : active ? 0.9 : 0}
                      strokeWidth={active ? 1.5 : 1}
                      data-date={day.date}
                      data-count={day.count}
                    />
                  );
                }),
              )}
            </svg>
          </div>
          <YearOptions years={years} selectedRange={selectedRange} onSelect={selectRange} />
        </div>
      )}

      <div className="mt-5 flex flex-col gap-4 text-[11px] text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
        <a
          href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/viewing-contributions-on-your-profile"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 hover:text-[var(--text-primary)]"
        >
          Learn how we count contributions
        </a>
        <div className="flex items-center gap-1.5">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <span
              key={level}
              aria-hidden="true"
              className="h-3 w-3 rounded-[2px] border border-[var(--border-color)]"
              style={{ backgroundColor: `var(--gh-l${level})` }}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </motion.div>
  );
}
