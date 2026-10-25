"use client";

import { createPortal } from "react-dom";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Contributions } from "@/lib/github";
import {
  computeLayout,
  formatTooltip,
  getMonthLabels,
  positionTooltip,
  type HeatmapLayout,
  type TooltipPosition,
} from "@/lib/heatmap";

type ContributionGraphProps = {
  initialData: Contributions | null;
};

type ActiveCell = {
  date: string;
  count: number;
  anchor: { left: number; top: number; right: number; bottom: number };
};

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
    <div
      className={
        mobile
          ? "flex flex-wrap gap-2 pb-1 lg:hidden"
          : "hidden w-24 shrink-0 flex-col gap-1 lg:flex"
      }
    >
      {options.map((option) => {
        const selected = selectedRange === option;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={selected}
            onClick={() => onSelect(option)}
            className={`whitespace-nowrap rounded-full border px-3 py-2 text-left text-[11px] transition-colors max-[480px]:px-2 max-[480px]:py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text-primary)]/50 ${
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

function Cell({
  x,
  y,
  cell,
  level,
  date,
  count,
  active,
}: {
  x: number;
  y: number;
  cell: number;
  level: number;
  date: string;
  count: number;
  active: boolean;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={cell}
      height={cell}
      rx={Math.min(2, cell / 4)}
      fill={`var(--gh-l${Math.max(0, Math.min(level, 4))})`}
      stroke="var(--border-color)"
      strokeOpacity={level === 0 ? 0.35 : active ? 0.9 : 0}
      strokeWidth={active ? 1.5 : 1}
      className="cursor-pointer"
      data-date={date}
      data-count={count}
    />
  );
}

function renderHorizontalGraph(
  data: Contributions,
  layout: HeatmapLayout,
  activeDate: string | null,
) {
  const step = layout.cell + layout.gap;
  const monthLabels = getMonthLabels(data.weeks);

  return (
    <>
      {monthLabels.map(({ weekIndex, label }) => (
        <text
          key={`${weekIndex}-${label}`}
          x={layout.labelSize + weekIndex * step}
          y="11"
          className="fill-[var(--text-muted)] text-[10px]"
        >
          {label}
        </text>
      ))}
      {["Mon", "Wed", "Fri"].map((label, index) => (
        <text
          key={label}
          x="0"
          y={16 + (index * 2 + 1) * step + layout.cell * 0.75}
          className="fill-[var(--text-muted)] text-[10px]"
        >
          {label}
        </text>
      ))}
      {data.weeks.map((week, weekIndex) =>
        week.days.map((day, dayIndex) => (
          <Cell
            key={day.date}
            x={layout.labelSize + weekIndex * step}
            y={16 + dayIndex * step}
            cell={layout.cell}
            level={day.level}
            date={day.date}
            count={day.count}
            active={activeDate === day.date}
          />
        )),
      )}
    </>
  );
}

function renderVerticalGraph(
  data: Contributions,
  layout: HeatmapLayout,
  activeDate: string | null,
) {
  const step = layout.cell + layout.gap;
  const monthLabels = getMonthLabels(data.weeks);
  const weekdayLabels = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <>
      {weekdayLabels.map((label, dayIndex) => (
        <text
          key={`${label}-${dayIndex}`}
          x={layout.labelSize + dayIndex * step + layout.cell / 2}
          y="11"
          textAnchor="middle"
          className="fill-[var(--text-muted)] text-[10px]"
        >
          {label}
        </text>
      ))}
      {monthLabels.map(({ weekIndex, label }) => (
        <text
          key={`${weekIndex}-${label}`}
          x="0"
          y={16 + weekIndex * step + layout.cell * 0.75}
          className="fill-[var(--text-muted)] text-[10px]"
        >
          {label}
        </text>
      ))}
      {data.weeks.map((week, weekIndex) =>
        week.days.map((day, dayIndex) => (
          <Cell
            key={day.date}
            x={layout.labelSize + dayIndex * step}
            y={16 + weekIndex * step}
            cell={layout.cell}
            level={day.level}
            date={day.date}
            count={day.count}
            active={activeDate === day.date}
          />
        )),
      )}
    </>
  );
}

export default function ContributionGraph({ initialData }: ContributionGraphProps) {
  const [data, setData] = useState<Contributions | null>(initialData);
  const [selectedRange, setSelectedRange] = useState("last");
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState(!initialData);
  const [activeCell, setActiveCell] = useState<ActiveCell | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition | null>(null);
  const [years, setYears] = useState(initialData?.years ?? []);
  const [containerWidth, setContainerWidth] = useState(0);
  const cache = useRef(new Map<string, Contributions>());
  const requestId = useRef(0);
  const graphRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (initialData) cache.current.set("last", initialData);
  }, [initialData]);

  useLayoutEffect(() => {
    const graph = graphRef.current;
    if (!graph) return;

    const updateWidth = () => {
      setContainerWidth(graph.clientWidth);
      setActiveCell(null);
      setTooltipPosition(null);
    };
    const observer = new ResizeObserver(updateWidth);
    observer.observe(graph);
    updateWidth();
    window.addEventListener("orientationchange", updateWidth);

    return () => {
      observer.disconnect();
      window.removeEventListener("orientationchange", updateWidth);
    };
  }, []);

  useLayoutEffect(() => {
    if (!activeCell || !tooltipRef.current) return;
    const rect = tooltipRef.current.getBoundingClientRect();
    setTooltipPosition(
      positionTooltip(
        activeCell.anchor,
        { width: rect.width, height: rect.height },
        { width: window.innerWidth, height: window.innerHeight },
      ),
    );
  }, [activeCell]);

  useEffect(() => {
    if (!activeCell) return;

    const closeFromOutside = (event: PointerEvent) => {
      if (!graphRef.current?.contains(event.target as Node)) setActiveCell(null);
    };
    const closeOnScroll = () => setActiveCell(null);
    document.addEventListener("pointerdown", closeFromOutside);
    document.addEventListener("scroll", closeOnScroll, true);

    return () => {
      document.removeEventListener("pointerdown", closeFromOutside);
      document.removeEventListener("scroll", closeOnScroll, true);
    };
  }, [activeCell]);

  useEffect(() => {
    if (initialData) return;

    let cancelled = false;
    fetch("/api/github/contributions/?range=last")
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

  const layout = data && containerWidth > 0
    ? computeLayout(containerWidth, data.weeks.length)
    : null;
  const graphLabel = data
    ? `GitHub contribution graph, ${data.total.toLocaleString("en-US")} contributions ${rangeLabel(selectedRange)}`
    : "GitHub contribution graph";
  const reservedHeight = layout?.height ?? 180;

  async function selectRange(range: string) {
    setSelectedRange(range);
    setActiveCell(null);
    setTooltipPosition(null);

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
      const response = await fetch(`/api/github/contributions/?range=${encodeURIComponent(range)}`);
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

  function setCellFromEvent(event: ReactPointerEvent<SVGSVGElement>) {
    const target = (event.target as Element).closest<SVGRectElement>("rect[data-date]");
    if (!target) return;
    const rect = target.getBoundingClientRect();
    setActiveCell({
      date: target.dataset.date ?? "",
      count: Number(target.dataset.count ?? 0),
      anchor: { left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom },
    });
  }

  function handlePointerMove(event: ReactPointerEvent<SVGSVGElement>) {
    if (event.pointerType === "touch") return;
    setCellFromEvent(event);
  }

  function handlePointerDown(event: ReactPointerEvent<SVGSVGElement>) {
    setCellFromEvent(event);
  }

  function handlePointerLeave(event: ReactPointerEvent<SVGSVGElement>) {
    if (event.pointerType !== "touch") setActiveCell(null);
  }

  const graphMotion = reduceMotion ? {} : { opacity: 1, y: 0 };

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={graphMotion}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="min-w-0 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-elevated)] p-5 sm:p-6"
    >
      <div className="mb-5 flex min-w-0 flex-col gap-4">
        <div className="flex min-w-0 items-center justify-between gap-4">
          <p className="min-w-0 text-sm font-medium text-[var(--text-primary)]">
            {data
              ? `${data.total.toLocaleString("en-US")} contributions ${rangeLabel(selectedRange)}`
              : "GitHub contributions"}
          </p>
          {loading && <span className="shrink-0 text-[11px] text-[var(--text-muted)]">Updating</span>}
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
        <div
          ref={graphRef}
          className="relative block min-h-[180px] min-w-0 w-full transition-opacity duration-200"
          style={{ minHeight: `${reservedHeight}px` }}
        >
          {layout && data && (
            <svg
              role="img"
              aria-label={graphLabel}
              width={layout.width}
              height={layout.height}
              className={`block max-w-full ${loading ? "opacity-50" : "opacity-100"}`}
              onPointerMove={handlePointerMove}
              onPointerDown={handlePointerDown}
              onPointerLeave={handlePointerLeave}
            >
              {layout.orientation === "horizontal"
                ? renderHorizontalGraph(data, layout, activeCell?.date ?? null)
                : renderVerticalGraph(data, layout, activeCell?.date ?? null)}
            </svg>
          )}
        </div>
      )}

      <div className="mt-5 flex min-w-0 flex-col gap-4 text-[11px] text-[var(--text-muted)] min-[480px]:flex-row min-[480px]:items-center min-[480px]:justify-between">
        <a
          href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/viewing-contributions-on-your-profile"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 hover:text-[var(--text-primary)]"
        >
          Learn how GitHub counts contributions
        </a>
        <div className="flex flex-wrap items-center justify-center gap-1.5 min-[480px]:justify-end">
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

      {activeCell &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={tooltipRef}
            role="status"
            className={`pointer-events-none fixed z-[100] max-w-[min(280px,calc(100vw-16px))] whitespace-normal break-normal rounded-md border border-[var(--border-color)] bg-[var(--bg)] px-2.5 py-1.5 text-[11px] text-[var(--text-primary)] shadow-lg ${
              tooltipPosition?.placement === "below"
                ? "after:bottom-full after:border-b-[var(--border-color)]"
                : "after:top-full after:border-t-[var(--border-color)]"
            } after:absolute after:left-[var(--tooltip-arrow-left)] after:-translate-x-1/2 after:border-4 after:border-transparent`}
            style={{
              left: tooltipPosition?.left ?? activeCell.anchor.left,
              top: tooltipPosition?.top ?? activeCell.anchor.top,
              visibility: tooltipPosition ? "visible" : "hidden",
              ["--tooltip-arrow-left" as string]: `${tooltipPosition?.arrowLeft ?? 12}px`,
            }}
          >
            {formatTooltip(activeCell.date, activeCell.count)}
          </div>,
          document.body,
        )}
    </motion.div>
  );
}
