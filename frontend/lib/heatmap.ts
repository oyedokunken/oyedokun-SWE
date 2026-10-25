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
  const safeWidth = Math.max(0, containerWidth);
  const safeWeekCount = Math.max(1, weekCount);
  const horizontalCellWithThreeGap =
    Math.floor((safeWidth - 32) / safeWeekCount) - 3;
  const horizontalGap = horizontalCellWithThreeGap < 11 ? 2 : 3;
  const horizontalCell = Math.min(
    14,
    Math.floor((safeWidth - 32) / safeWeekCount) - horizontalGap,
  );

  if (horizontalCell >= 10) {
    return {
      orientation: "horizontal",
      cell: horizontalCell,
      gap: horizontalGap,
      labelSize: 32,
      width: safeWidth,
      height: 16 + horizontalCell * 7 + horizontalGap * 6,
    };
  }

  const verticalCellWithThreeGap = Math.floor((safeWidth - 34) / 7) - 3;
  const verticalGap = verticalCellWithThreeGap < 11 ? 2 : 3;
  const verticalCell = Math.max(
    14,
    Math.min(22, Math.floor((safeWidth - 34) / 7) - verticalGap),
  );

  return {
    orientation: "vertical",
    cell: verticalCell,
    gap: verticalGap,
    labelSize: 34,
    width: safeWidth,
    height: 16 + verticalCell * safeWeekCount + verticalGap * Math.max(0, safeWeekCount - 1),
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
