export type GithubContributionLevel =
  | "NONE"
  | "FIRST_QUARTILE"
  | "SECOND_QUARTILE"
  | "THIRD_QUARTILE"
  | "FOURTH_QUARTILE";

export type HeatmapWeek = {
  days: Array<{ date: string; count: number; level: number }>;
};

export type HeatmapDay = HeatmapWeek["days"][number];
export type HeatmapRow = Array<HeatmapDay | null>;

export type RecentSlice = {
  rows: HeatmapRow[];
  total: number;
  startDate: string | null;
  endDate: string | null;
};

export type HeatmapLayout = {
  orientation: "horizontal" | "vertical";
  cell: number;
  gap: number;
  labelSize: number;
  width: number;
  height: number;
  gridX: number;
  cellW: number;
  cellH: number;
  gapX: number;
  gapY: number;
  columnWidths: number[];
};

export type RecentLayout = {
  cell: number;
  gapX: number;
  gapY: number;
  rx: number;
  pitchX: number;
  pitchY: number;
  topRow: number;
  width: number;
  height: number;
};

export const MOBILE_MAX_WIDTH = 560;

export const MOBILE_RANGES = [
  { key: "1m", pillLabel: "Past 1 month", ariaLabel: "Past 1 month", headerPhrase: "in the past month", days: 30 },
  { key: "2m", pillLabel: "2M", ariaLabel: "Past 2 months", headerPhrase: "in the past 2 months", days: 60 },
  { key: "3m", pillLabel: "3M", ariaLabel: "Past 3 months", headerPhrase: "in the past 3 months", days: 90 },
  { key: "6m", pillLabel: "6M", ariaLabel: "Past 6 months", headerPhrase: "in the past 6 months", days: 180 },
  { key: "1y", pillLabel: "1Y", ariaLabel: "Past year", headerPhrase: "in the last year", days: null },
] as const;

export type MobileRangeKey = typeof MOBILE_RANGES[number]["key"];

export function pickMobileLayout(key: MobileRangeKey) {
  return key === "1m" ? "calendar" : "compact";
}

type RectLike = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

type SizeLike = {
  width: number;
  height: number;
};

export type TooltipPosition = {
  left: number;
  top: number;
  placement: "above" | "below";
  arrowLeft: number;
};

const levelMap: Record<GithubContributionLevel, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

export function levelFromGithub(level: GithubContributionLevel) {
  return levelMap[level];
}

export function computeLayout(containerWidth: number, weekCount: number): HeatmapLayout {
  const safeWidth = Math.max(0, Math.floor(containerWidth));
  const safeWeekCount = Math.max(1, weekCount);
  if (safeWidth >= MOBILE_MAX_WIDTH) {
    const horizontalCellForGap = (gap: number) =>
      Math.floor((safeWidth - 32 - (safeWeekCount - 1) * gap) / safeWeekCount);
    const rawCell = horizontalCellForGap(3);
    const horizontalGap = rawCell < 11 ? 2 : 3;
    const cell = Math.min(14, Math.max(8, horizontalCellForGap(horizontalGap)));
    const contentWidth = 32 + safeWeekCount * cell + (safeWeekCount - 1) * horizontalGap;
    const labelOffset = Math.max(0, Math.floor((safeWidth - contentWidth) / 2));

    return {
      orientation: "horizontal",
      cell,
      gap: horizontalGap,
      labelSize: 32 + labelOffset,
      width: safeWidth,
      height: 16 + cell * 7 + horizontalGap * 6,
      gridX: 32 + labelOffset,
      cellW: cell,
      cellH: cell,
      gapX: horizontalGap,
      gapY: horizontalGap,
      columnWidths: Array.from({ length: safeWeekCount }, () => cell),
    };
  }

  const gridX = 36;
  const verticalCellWidth = (gap: number) =>
    Math.floor((safeWidth - gridX - 6 * gap) / 7);
  const gapX = verticalCellWidth(3) < 14 ? 2 : 3;
  const cellW = Math.max(0, verticalCellWidth(gapX));
  const cellH = Math.max(14, Math.min(cellW, 34));
  const remainder = Math.max(
    0,
    safeWidth - gridX - 6 * gapX - 7 * cellW,
  );
  const columnWidths = Array.from({ length: 7 }, (_, index) =>
    cellW + (index >= 7 - remainder ? 1 : 0),
  );

  return {
    orientation: "vertical",
    cell: cellW,
    gap: gapX,
    labelSize: 30,
    width: safeWidth,
    height: 16 + safeWeekCount * (cellH + gapX) - gapX,
    gridX,
    cellW,
    cellH,
    gapX,
    gapY: gapX,
    columnWidths,
  };
}

function dateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function getRecentSlice(data: { weeks: HeatmapWeek[] }, days = 30): RecentSlice {
  const allDays = data.weeks.flatMap((week) => week.days).sort((a, b) => a.date.localeCompare(b.date));
  const latestDay = allDays[allDays.length - 1];
  if (!latestDay || days <= 0) {
    return { rows: [], total: 0, startDate: null, endDate: null };
  }

  const latest = new Date(`${latestDay.date}T00:00:00Z`);
  const windowStart = new Date(latest);
  windowStart.setUTCDate(windowStart.getUTCDate() - (days - 1));
  const startDate = dateKey(windowStart);
  const endDate = latestDay.date;
  const inWindow = allDays.filter((day) => day.date >= startDate && day.date <= endDate);
  if (inWindow.length === 0) {
    return { rows: [], total: 0, startDate, endDate };
  }

  const byDate = new Map(inWindow.map((day) => [day.date, day]));
  const firstWeek = new Date(`${startDate}T00:00:00Z`);
  firstWeek.setUTCDate(firstWeek.getUTCDate() - firstWeek.getUTCDay());
  const lastWeek = new Date(`${endDate}T00:00:00Z`);
  lastWeek.setUTCDate(lastWeek.getUTCDate() - lastWeek.getUTCDay());
  const rows: RecentSlice["rows"] = [];

  for (const cursor = new Date(firstWeek); cursor <= lastWeek; cursor.setUTCDate(cursor.getUTCDate() + 7)) {
    const row: RecentSlice["rows"][number] = [];
    for (let dayIndex = 0; dayIndex < 7; dayIndex += 1) {
      const date = new Date(cursor);
      date.setUTCDate(date.getUTCDate() + dayIndex);
      row.push(byDate.get(dateKey(date)) ?? null);
    }

    rows.push(row);
  }

  return {
    rows,
    total: inWindow.reduce((sum, day) => sum + day.count, 0),
    startDate,
    endDate,
  };
}

export function toRows(data: { weeks: HeatmapWeek[] }): HeatmapRow[] {
  return data.weeks.map((week) => {
    const row: HeatmapRow = Array.from({ length: 7 }, () => null);
    for (const day of week.days) {
      const weekday = new Date(`${day.date}T00:00:00Z`).getUTCDay();
      row[weekday] = day;
    }
    return row;
  });
}

export function computeRecentLayout(containerWidth: number, rowCount: number): RecentLayout {
  const width = Math.max(0, Math.floor(containerWidth));
  const preferredCell = Math.floor((width / 7) * 0.8);
  const cell = Math.max(
    18,
    Math.min(48, Math.min(preferredCell, Math.floor((width - 6 * 5) / 7))),
  );
  const gapX = Math.max(0, (width - 7 * cell) / 6);
  const gapY = Math.max(5, Math.min(12, Math.round(gapX)));
  const topRow = 16;
  const pitchX = cell + gapX;
  const pitchY = cell + gapY;

  return {
    cell,
    gapX,
    gapY,
    rx: 6,
    pitchX,
    pitchY,
    topRow,
    width,
    height: rowCount > 0 ? topRow + rowCount * pitchY - gapY : topRow,
  };
}

export function positionTooltip(
  anchorRect: RectLike,
  tipSize: SizeLike,
  viewport: SizeLike,
  margin = 8,
): TooltipPosition {
  const anchorCenter = (anchorRect.left + anchorRect.right) / 2;
  const availableWidth = Math.max(0, viewport.width - margin * 2 - tipSize.width);
  const left = Math.min(
    Math.max(margin, anchorCenter - tipSize.width / 2),
    margin + availableWidth,
  );
  const canPlaceAbove = anchorRect.top - margin - tipSize.height >= margin;
  const top = canPlaceAbove
    ? anchorRect.top - margin - tipSize.height
    : anchorRect.bottom + margin;
  const cornerPadding = Math.min(12, tipSize.width / 2);

  return {
    left,
    top,
    placement: canPlaceAbove ? "above" : "below",
    arrowLeft: Math.min(
      Math.max(cornerPadding, anchorCenter - left),
      Math.max(cornerPadding, tipSize.width - cornerPadding),
    ),
  };
}

export function getMonthLabels(rows: HeatmapRow[]) {
  const candidates = rows
    .map((row, weekIndex) => {
      const firstDay = row.find((day) => day !== null);
      if (!firstDay) return null;
      const date = new Date(`${firstDay.date}T00:00:00Z`);
      return {
        weekIndex,
        month: date.getUTCMonth(),
        label: date.toLocaleString("en-US", { month: "short", timeZone: "UTC" }),
      };
    })
    .filter((candidate): candidate is NonNullable<typeof candidate> => candidate !== null)
    .filter((candidate, index, all) => index === 0 || candidate.month !== all[index - 1].month);

  if (candidates.length > 1 && candidates[0].weekIndex === 0 && candidates[1].weekIndex < 3) {
    candidates.shift();
  }

  const labels: Array<{ weekIndex: number; label: string }> = [];
  for (const candidate of candidates) {
    const previous = labels[labels.length - 1];
    if (!previous || candidate.weekIndex - previous.weekIndex >= 3) {
      labels.push({ weekIndex: candidate.weekIndex, label: candidate.label });
    }
  }

  return labels;
}

function ordinal(day: number) {
  if (day % 100 >= 11 && day % 100 <= 13) return `${day}th`;
  if (day % 10 === 1) return `${day}st`;
  if (day % 10 === 2) return `${day}nd`;
  if (day % 10 === 3) return `${day}rd`;
  return `${day}th`;
}

export function formatTooltip(date: string, count: number) {
  const parsed = new Date(`${date}T00:00:00Z`);
  const formattedDate = parsed.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
  const contributionText = count === 1 ? "1 contribution" : `${count} contributions`;
  const day = ordinal(parsed.getUTCDate());
  return `${count === 0 ? "No contributions" : contributionText} on ${formattedDate.replace(
    String(parsed.getUTCDate()),
    day,
  )}.`;
}

export function parseYearParam(value: string | null) {
  if (!value || !/^\d{4}$/.test(value)) return null;

  const year = Number(value);
  const currentYear = new Date().getUTCFullYear();
  return year >= 2008 && year <= currentYear ? year : null;
}
