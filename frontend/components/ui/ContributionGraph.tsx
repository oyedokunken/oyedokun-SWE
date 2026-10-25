"use client";

import { createPortal } from "react-dom";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Contributions } from "@/lib/github";
import {
  computeRecentLayout,
  computeLayout,
  formatTooltip,
  getRecentSlice,
  getMonthLabels,
  MOBILE_MAX_WIDTH,
  MOBILE_RANGES,
  pickMobileLayout,
  positionTooltip,
  toRows,
  type HeatmapLayout,
  type HeatmapRow,
  type RecentLayout,
  type RecentSlice,
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
  if (range === "last") return "in the last 1 year";
  const mobileRange = MOBILE_RANGES.find((item) => item.key === range);
  return mobileRange?.headerPhrase ?? `in ${range}`;
}

function YearOptions({
  years,
  selectedRange,
  onSelect,
  mobile,
}: {
  years: number[];
  selectedRange: string;
  onSelect: (range: string) => void;
  mobile: boolean;
}) {
  const options = mobile
    ? MOBILE_RANGES.map((range) => ({
        key: range.key,
        label: range.pillLabel,
        ariaLabel: range.ariaLabel,
      }))
    : ["last", ...years.map(String)].map((range) => ({
        key: range,
        label: range === "last" ? "Last 1 year" : range,
        ariaLabel: range === "last" ? "Last 1 year" : range,
      }));

  return (
    <div className="flex flex-wrap gap-2 pb-1">
      {options.map((option) => {
        const selected = selectedRange === option.key;
        return (
          <button
            key={option.key}
            type="button"
            aria-pressed={selected}
            aria-label={option.ariaLabel}
            onClick={() => onSelect(option.key)}
            className={`whitespace-nowrap rounded-full border px-3 py-2 text-left text-[11px] transition-colors max-[480px]:px-2 max-[480px]:py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text-primary)]/50 ${
              selected
                ? "border-[var(--text-primary)] bg-[var(--text-primary)] text-[var(--bg)]"
                : "border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--text-primary)] hover:text-[var(--text-primary)]"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function Cell({
  x,
  y,
  cellW,
  cellH,
  rx,
  level,
  date,
  count,
  active,
}: {
  x: number;
  y: number;
  cellW: number;
  cellH: number;
  rx: number;
  level: number;
  date: string;
  count: number;
  active: boolean;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={cellW}
      height={cellH}
      rx={rx}
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
  const stepY = layout.cellH + layout.gapY;
  const monthLabels = getMonthLabels(toRows(data));
  const columnX = (index: number) =>
    layout.gridX +
    layout.columnWidths.slice(0, index).reduce((sum, width) => sum + width, 0) +
    index * layout.gapX;

  return (
    <>
      {monthLabels.map(({ weekIndex, label }) => (
        <text
          key={`${weekIndex}-${label}`}
          x={columnX(weekIndex)}
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
          y={16 + (index * 2 + 1) * stepY + layout.cellH * 0.75}
          className="fill-[var(--text-muted)] text-[10px]"
        >
          {label}
        </text>
      ))}
      {data.weeks.map((week, weekIndex) =>
        week.days.map((day, dayIndex) => (
          <Cell
            key={day.date}
            x={columnX(weekIndex)}
            y={16 + dayIndex * stepY}
            cellW={layout.columnWidths[weekIndex]}
            cellH={layout.cellH}
            rx={Math.min(2, layout.cellW / 4)}
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
  rows: HeatmapRow[],
  layout: HeatmapLayout,
  activeDate: string | null,
) {
  const stepY = layout.cellH + layout.gapY;
  const monthLabels = getMonthLabels(rows);
  const weekdayLabels = ["S", "M", "T", "W", "T", "F", "S"];
  const columnX = (index: number) =>
    layout.gridX +
    layout.columnWidths.slice(0, index).reduce((sum, width) => sum + width, 0) +
    index * layout.gapX;

  return (
    <>
      {weekdayLabels.map((label, dayIndex) => (
        <text
          key={`${label}-${dayIndex}`}
          x={columnX(dayIndex) + layout.columnWidths[dayIndex] / 2}
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
          y={16 + weekIndex * stepY + layout.cellH * 0.75}
          className="fill-[var(--text-muted)] text-[10px]"
        >
          {label}
        </text>
      ))}
      {rows.map((row, rowIndex) =>
        row.map((day, dayIndex) =>
          day ? (
            <Cell
              key={day.date}
              x={columnX(dayIndex)}
              y={16 + rowIndex * stepY}
              cellW={layout.columnWidths[dayIndex]}
              cellH={layout.cellH}
              rx={layout.cellW < 24 ? 3 : 4}
              level={day.level}
              date={day.date}
              count={day.count}
              active={activeDate === day.date}
            />
          ) : null,
        ),
      )}
    </>
  );
}

function renderRecentGraph(
  slice: RecentSlice,
  layout: RecentLayout,
  activeDate: string | null,
) {
  const weekdayLabels = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <>
      {weekdayLabels.map((label, dayIndex) => (
        <text
          key={`${label}-${dayIndex}`}
          x={dayIndex * layout.pitchX + layout.cell / 2}
          y="11"
          textAnchor="middle"
          className="fill-[var(--text-muted)] text-[10px]"
        >
          {label}
        </text>
      ))}
      {slice.rows.map((row, rowIndex) =>
        row.map((day, dayIndex) =>
          day ? (
            <Cell
              key={day.date}
              x={dayIndex * layout.pitchX}
              y={layout.topRow + rowIndex * layout.pitchY}
              cellW={layout.cell}
              cellH={layout.cell}
              rx={layout.rx}
              level={day.level}
              date={day.date}
              count={day.count}
              active={activeDate === day.date}
            />
          ) : null,
        ),
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
  const [lastData, setLastData] = useState<Contributions | null>(initialData);
  const cache = useRef(new Map<string, Contributions>());
  const requestId = useRef(0);
  const userPickedRef = useRef(false);
  const graphRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (initialData) {
      cache.current.set("last", initialData);
    }
  }, [initialData]);

  useLayoutEffect(() => {
    const graph = graphRef.current;
    if (!graph) return;

    const updateWidth = () => {
      const width = graph.clientWidth;
      setContainerWidth(width);
      setSelectedRange((current) => {
        const mobile = width < MOBILE_MAX_WIDTH;
        const isMobileRange = MOBILE_RANGES.some((range) => range.key === current);
        if (mobile) return isMobileRange ? current : "1m";
        return isMobileRange ? "last" : current;
      });
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
        setLastData(result);
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

  const isMobile = containerWidth > 0 && containerWidth < MOBILE_MAX_WIDTH;
  const selectedMobileRange = MOBILE_RANGES.find((range) => range.key === selectedRange);
  const responsiveRange = containerWidth === 0
    ? selectedRange
    : isMobile
      ? selectedMobileRange?.key ?? "1m"
      : selectedMobileRange
        ? "last"
        : selectedRange;
  const mobileRange = MOBILE_RANGES.find((range) => range.key === responsiveRange);
  const mobileData = mobileRange ? lastData : null;
  const mobileSlice = mobileRange && mobileRange.days
    ? mobileData ? getRecentSlice(mobileData, mobileRange.days) : null
    : null;
  const mobileRows = mobileRange && mobileData
    ? mobileRange.key === "1y"
      ? toRows(mobileData)
      : mobileSlice?.rows ?? []
    : null;
  const useCalendarLayout = mobileRange
    ? pickMobileLayout(mobileRange.key) === "calendar"
    : false;
  const layoutData = mobileRange ? mobileData : data;
  const layout = layoutData && containerWidth > 0 && !useCalendarLayout
    ? computeLayout(containerWidth, mobileRows?.length ?? layoutData.weeks.length)
    : null;
  const recentLayout = mobileRange && useCalendarLayout && mobileSlice && containerWidth > 0
    ? computeRecentLayout(containerWidth, mobileSlice.rows.length)
    : null;
  const displayTotal = mobileRange
    ? mobileRange.key === "1y" ? mobileData?.total : mobileSlice?.total
    : data?.total;
  const graphLabel = mobileRange && (mobileRange.key === "1y" ? mobileData : mobileSlice)
    ? mobileRange.key === "1y"
      ? `GitHub contribution graph, ${mobileData?.total.toLocaleString("en-US")} contributions ${mobileRange.headerPhrase}`
      : `GitHub contribution graph, ${mobileSlice?.total.toLocaleString("en-US")} contributions from ${new Date(`${mobileSlice?.startDate}T00:00:00Z`).toLocaleString("en-US", { month: "short", day: "numeric", timeZone: "UTC" })} to ${new Date(`${mobileSlice?.endDate}T00:00:00Z`).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })}`
    : data
    ? `GitHub contribution graph, ${data.total.toLocaleString("en-US")} contributions ${rangeLabel(responsiveRange)}`
    : "GitHub contribution graph";
  const reservedHeight = (mobileRange ? recentLayout?.height ?? layout?.height : layout?.height) ?? 180;

  async function selectRange(range: string) {
    userPickedRef.current = true;
    setSelectedRange(range);
    setActiveCell(null);
    setTooltipPosition(null);

    const requestedCacheKey = MOBILE_RANGES.some((item) => item.key === range) ? "last" : range;
    const cached = cache.current.get(requestedCacheKey);
    if (cached) {
      setData(cached);
      if (requestedCacheKey === "last") setLastData(cached);
      setYears(cached.years);
      setError(false);
      return;
    }

    const currentRequest = ++requestId.current;
    setLoading(true);
    setError(false);

    try {
      const response = await fetch(`/api/github/contributions/?range=${encodeURIComponent(requestedCacheKey)}`);
      if (!response.ok) throw new Error("Unable to load contributions");
      const result = (await response.json()) as Contributions;
      if (currentRequest !== requestId.current) return;
      cache.current.set(requestedCacheKey, result);
      if (requestedCacheKey === "last") setLastData(result);
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
            {displayTotal !== undefined
              ? `${displayTotal.toLocaleString("en-US")} ${displayTotal === 1 ? "contribution" : "contributions"} ${rangeLabel(responsiveRange)}`
              : "GitHub contributions"}
          </p>
          {loading && <span className="shrink-0 text-[11px] text-[var(--text-muted)]">Updating</span>}
        </div>
        <YearOptions
          years={years}
          selectedRange={responsiveRange}
          onSelect={selectRange}
          mobile={isMobile}
        />
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
          {((mobileRange && mobileRows && (recentLayout || layout)) || (!mobileRange && layout && data)) && (
            <svg
              role="img"
              aria-label={graphLabel}
              width={mobileRange && recentLayout ? recentLayout.width : layout?.width}
              height={mobileRange && recentLayout ? recentLayout.height : layout?.height}
              className={`block max-w-full ${loading ? "opacity-50" : "opacity-100"}`}
              onPointerMove={handlePointerMove}
              onPointerDown={handlePointerDown}
              onPointerLeave={handlePointerLeave}
            >
              {mobileRange && useCalendarLayout && mobileSlice && recentLayout
                ? renderRecentGraph(mobileSlice, recentLayout, activeCell?.date ?? null)
                : mobileRange && mobileRows && layout
                  ? renderVerticalGraph(mobileRows, layout, activeCell?.date ?? null)
                  : layout && data && (layout.orientation === "horizontal"
                    ? renderHorizontalGraph(data, layout, activeCell?.date ?? null)
                    : renderVerticalGraph(toRows(data), layout, activeCell?.date ?? null))}
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
