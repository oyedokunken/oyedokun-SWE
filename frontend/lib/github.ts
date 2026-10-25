const GITHUB_USERNAME = "oyedokunken";

const contributionLevels = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
} as const;

type ContributionLevel = keyof typeof contributionLevels;

export type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

export type ContributionWeek = {
  days: ContributionDay[];
};

export type Contributions = {
  total: number;
  years: number[];
  weeks: ContributionWeek[];
};

type ContributionRange = "last" | number;

type GithubResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionYears: number[];
        contributionCalendar: {
          totalContributions: number;
          weeks: Array<{
            contributionDays: Array<{
              date: string;
              contributionCount: number;
              contributionLevel: ContributionLevel;
            }>;
          }>;
        };
      };
    };
  };
  errors?: Array<{ message: string }>;
};

const query = `
  query Contributions($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionYears
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
              weekday
            }
          }
        }
      }
    }
  }
`;

function getRangeDates(range: ContributionRange) {
  const now = new Date();

  if (range === "last") {
    const from = new Date(now);
    from.setUTCFullYear(from.getUTCFullYear() - 1);
    return { from, to: now };
  }

  const from = new Date(Date.UTC(range, 0, 1));
  const endOfYear = new Date(Date.UTC(range, 11, 31, 23, 59, 59));
  return { from, to: range === now.getUTCFullYear() ? now : endOfYear };
}

export async function getContributions(range: ContributionRange): Promise<Contributions | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  const { from, to } = getRangeDates(range);

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: {
          login: GITHUB_USERNAME,
          from: from.toISOString(),
          to: to.toISOString(),
        },
      }),
      next: { revalidate: 3600 },
    });

    if (!response.ok) return null;

    const result = (await response.json()) as GithubResponse;
    const collection = result.data?.user?.contributionsCollection;
    if (result.errors?.length || !collection) return null;

    return {
      total: collection.contributionCalendar.totalContributions,
      years: [...collection.contributionYears].sort((a, b) => b - a),
      weeks: collection.contributionCalendar.weeks.map((week) => ({
        days: week.contributionDays.map((day) => ({
          date: day.date,
          count: day.contributionCount,
          level: contributionLevels[day.contributionLevel],
        })),
      })),
    };
  } catch {
    return null;
  }
}
