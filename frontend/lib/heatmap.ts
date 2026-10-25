export type GithubContributionLevel =
  | "NONE"
  | "FIRST_QUARTILE"
  | "SECOND_QUARTILE"
  | "THIRD_QUARTILE"
  | "FOURTH_QUARTILE";

export type HeatmapWeek = {
  days: Array<{ date: string; count: number; level: number }>;
};

export type HeatmapLayout = {
  orientation: "horizontal" | "vertical";
  cell: number;
  gap: number;
  labelSize: number;
  width: number;
  height: number;
};

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
  const horizontalCellForGap = (gap: number) =>
    Math.floor((safeWidth - 32 - (safeWeekCount - 1) * gap) / safeWeekCount);
  const horizontalGap = horizontalCellForGap(3) < 11 ? 2 : 3;
  const horizontalCell = horizontalCellForGap(horizontalGap);

  if (horizontalCell >= 9) {
    const cell = Math.min(14, Math.max(0, horizontalCell));
    const contentWidth = 32 + safeWeekCount * cell + (safeWeekCount - 1) * horizontalGap;
    const labelOffset = Math.max(0, Math.floor((safeWidth - contentWidth) / 2));

    return {
      orientation: "horizontal",
      cell,
      gap: horizontalGap,
      labelSize: 32 + labelOffset,
      width: safeWidth,
      height: 16 + cell * 7 + horizontalGap * 6,
    };
  }

  const verticalCellForGap = (gap: number) =>
    Math.floor((safeWidth - 34 - 6 * gap) / 7);
  const verticalGap = verticalCellForGap(3) < 11 ? 2 : 3;
  const computedVerticalCell = verticalCellForGap(verticalGap);
  const minimumVerticalGroupWidth = 34 + 7 * 14 + 6 * verticalGap;
  const verticalCell =
    computedVerticalCell >= 14
      ? Math.min(30, computedVerticalCell)
      : minimumVerticalGroupWidth <= safeWidth
        ? 14
        : Math.max(0, computedVerticalCell);
  const contentWidth = 34 + 7 * verticalCell + 6 * verticalGap;
  const labelOffset = Math.max(0, Math.floor((safeWidth - contentWidth) / 2));

  return {
    orientation: "vertical",
    cell: verticalCell,
    gap: verticalGap,
    labelSize: 34 + labelOffset,
    width: safeWidth,
    height: 16 + safeWeekCount * (verticalCell + verticalGap) - verticalGap,
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

export function getMonthLabels(weeks: HeatmapWeek[]) {
  const candidates = weeks
    .map((week, weekIndex) => {
      const firstDay = week.days[0];
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
