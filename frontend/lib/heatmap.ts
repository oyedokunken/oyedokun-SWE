export type GithubContributionLevel =
  | "NONE"
  | "FIRST_QUARTILE"
  | "SECOND_QUARTILE"
  | "THIRD_QUARTILE"
  | "FOURTH_QUARTILE";

export type HeatmapWeek = {
  days: Array<{ date: string; count: number; level: number }>;
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
