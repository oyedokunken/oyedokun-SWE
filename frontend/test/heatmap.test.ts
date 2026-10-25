import { describe, expect, it } from "vitest";
import {
  formatTooltip,
  computeLayout,
  computeRecentLayout,
  getRecentSlice,
  getMonthLabels,
  levelFromGithub,
  positionTooltip,
  parseYearParam,
} from "@/lib/heatmap";

function weeksFromDates(dates: string[]) {
  return dates.map((date) => ({
    days: [{ date, count: 0, level: 0 }],
  }));
}

function contributionData(start: string, end: string) {
  const days = [];
  for (const cursor = new Date(`${start}T00:00:00Z`); cursor <= new Date(`${end}T00:00:00Z`); cursor.setUTCDate(cursor.getUTCDate() + 1)) {
    days.push({
      date: cursor.toISOString().slice(0, 10),
      count: 1,
      level: 1,
    });
  }
  const weeks = [];
  for (let index = 0; index < days.length; index += 7) {
    weeks.push({ days: days.slice(index, index + 7) });
  }
  return { total: days.length, years: [], weeks };
}

describe("heatmap helpers", () => {
  it("chooses a responsive horizontal or vertical layout", () => {
    expect(computeLayout(1200, 53)).toMatchObject({ orientation: "horizontal", cell: 14 });
    expect(computeLayout(559, 53).orientation).toBe("vertical");
    expect(computeLayout(560, 53).orientation).toBe("horizontal");
    expect(computeLayout(600, 53).orientation).toBe("horizontal");
    expect(computeLayout(768, 53).orientation).toBe("horizontal");
    expect(computeLayout(390, 53)).toMatchObject({ orientation: "vertical", gridX: 36 });
  });

  it("fills vertical layouts and balances horizontal layouts", () => {
    for (const width of [280, 320, 360, 390, 430, 480, 520, 559]) {
      const layout = computeLayout(width, 53);
      const gridRight =
        layout.gridX +
        layout.columnWidths.reduce((sum, columnWidth) => sum + columnWidth, 0) +
        6 * layout.gapX;
      expect(layout.gridX).toBe(36);
      expect(gridRight).toBeGreaterThanOrEqual(width - 1);
      expect(gridRight).toBeLessThanOrEqual(width);
      expect(layout.width).toBe(width);
      expect(layout.cellH).toBeGreaterThanOrEqual(14);
      expect(layout.cellH).toBeLessThanOrEqual(34);
    }

    const rectangular = computeLayout(520, 53);
    expect(rectangular.cellW).toBeGreaterThan(rectangular.cellH);
    expect(rectangular.columnWidths.reduce((sum, width) => sum + width, 0) + 6 * rectangular.gapX + rectangular.gridX)
      .toBeGreaterThanOrEqual(519);

    expect(computeLayout(430, 53).height).toBeLessThan(2400);

    for (const width of [560, 600, 700, 768, 1024, 1440]) {
      const layout = computeLayout(width, 53);
      const contentWidth =
        layout.gridX +
        layout.columnWidths.reduce((sum, columnWidth) => sum + columnWidth, 0) +
        (layout.columnWidths.length - 1) * layout.gapX;
      const leftGap = layout.labelSize - 32;
      const rightGap = width - contentWidth;
      expect(layout.cell).toBeGreaterThanOrEqual(8);
      expect(layout.cell).toBeLessThanOrEqual(14);
      expect(Math.abs(leftGap - rightGap)).toBeLessThanOrEqual(2);
      expect(layout.width).toBeLessThanOrEqual(width);
    }
  });

  it("builds a rolling UTC past-month slice", () => {
    const slice = getRecentSlice(contributionData("2025-01-01", "2025-03-01"));
    expect(slice.startDate).toBe("2025-01-31");
    expect(slice.endDate).toBe("2025-03-01");
    expect(slice.total).toBe(30);
    expect(slice.rows.length).toBe(5);
    expect(slice.rows[0].slice(0, 5).every((day) => day === null)).toBe(true);
    const midweek = getRecentSlice(contributionData("2025-01-01", "2025-02-26"));
    expect(midweek.rows.at(-1)?.slice(4).every((day) => day === null)).toBe(true);

    const firstOfMonth = getRecentSlice(contributionData("2025-01-01", "2025-02-01"));
    expect(firstOfMonth.startDate).toBe("2025-01-03");
    expect(firstOfMonth.total).toBe(30);

    const yearBoundary = getRecentSlice(contributionData("2024-12-01", "2025-01-05"));
    expect(yearBoundary.startDate).toBe("2024-12-07");
    expect(yearBoundary.total).toBe(30);

    expect(getRecentSlice(contributionData("2025-01-01", "2025-01-10")).total).toBe(10);
    expect(getRecentSlice({ weeks: [] })).toEqual({
      rows: [],
      total: 0,
      startDate: null,
      endDate: null,
    });
  });

  it("sizes the past-month grid to the full container", () => {
    for (const width of [280, 320, 360, 390, 430, 480, 520, 559]) {
      for (const rowCount of [5, 6]) {
        const layout = computeRecentLayout(width, rowCount);
        expect(layout.width).toBe(width);
        expect(layout.cell).toBeGreaterThanOrEqual(26);
        expect(layout.cell).toBeLessThanOrEqual(48);
        expect(layout.cell).toBe(layout.cell);
        expect(6 * layout.pitchX + layout.cell).toBeCloseTo(width, 0);
        expect(layout.height).toBe(16 + rowCount * (layout.cell + layout.gapY) - layout.gapY);
      }
    }
  });

  it("positions tooltips within the viewport", () => {
    expect(
      positionTooltip(
        { left: 200, top: 300, right: 212, bottom: 312 },
        { width: 120, height: 32 },
        { width: 800, height: 600 },
      ),
    ).toEqual({ left: 146, top: 260, placement: "above", arrowLeft: 60 });
    expect(
      positionTooltip(
        { left: 200, top: 10, right: 212, bottom: 22 },
        { width: 120, height: 32 },
        { width: 800, height: 600 },
      ).placement,
    ).toBe("below");
    expect(
      positionTooltip(
        { left: 4, top: 300, right: 16, bottom: 312 },
        { width: 120, height: 32 },
        { width: 800, height: 600 },
      ).left,
    ).toBe(8);
    expect(
      positionTooltip(
        { left: 790, top: 300, right: 802, bottom: 312 },
        { width: 120, height: 32 },
        { width: 800, height: 600 },
      ).left,
    ).toBe(672);
      expect(
        positionTooltip(
          { left: 400, top: 100, right: 412, bottom: 112 },
          { width: 120, height: 32 },
          { width: 800, height: 600 },
        ).left,
      ).toBe(346);
      const leftEdge = positionTooltip(
        { left: 4, top: 300, right: 16, bottom: 312 },
        { width: 120, height: 32 },
        { width: 800, height: 600 },
      );
      expect(leftEdge.arrowLeft).toBeGreaterThanOrEqual(12);
      expect(leftEdge.arrowLeft).toBeLessThanOrEqual(108);
    const wide = positionTooltip(
      { left: 10, top: 300, right: 20, bottom: 310 },
      { width: 900, height: 32 },
      { width: 800, height: 600 },
    );
    expect(wide.left).toBe(8);
    expect(wide.arrowLeft).toBeGreaterThanOrEqual(12);
    expect(wide.arrowLeft).toBeLessThanOrEqual(888);
  });

  it("maps GitHub contribution levels", () => {
    expect(levelFromGithub("NONE")).toBe(0);
    expect(levelFromGithub("FIRST_QUARTILE")).toBe(1);
    expect(levelFromGithub("SECOND_QUARTILE")).toBe(2);
    expect(levelFromGithub("THIRD_QUARTILE")).toBe(3);
    expect(levelFromGithub("FOURTH_QUARTILE")).toBe(4);
  });

  it("creates month labels without overlap", () => {
    const dates = [
      "2025-01-01",
      "2025-01-08",
      "2025-01-15",
      "2025-01-22",
      "2025-01-29",
      "2025-02-01",
      "2025-02-08",
      "2025-02-15",
      "2025-02-22",
      "2025-03-01",
    ];
    const labels = getMonthLabels(weeksFromDates(dates));
    expect(labels.map((label) => label.label)).toEqual(["Jan", "Feb", "Mar"]);
    expect(labels[1].weekIndex - labels[0].weekIndex).toBeGreaterThanOrEqual(3);
    expect(labels[2].weekIndex - labels[1].weekIndex).toBeGreaterThanOrEqual(3);
  });

  it("skips a partial first month when the next month starts too soon", () => {
    const labels = getMonthLabels(
      weeksFromDates(["2025-01-30", "2025-02-01", "2025-02-08", "2025-02-15"]),
    );
    expect(labels).toEqual([{ weekIndex: 1, label: "Feb" }]);
  });

  it("formats zero, singular, plural and ordinal dates", () => {
    expect(formatTooltip("2025-03-14", 0)).toBe("No contributions on March 14th.");
    expect(formatTooltip("2025-03-01", 1)).toBe("1 contribution on March 1st.");
    expect(formatTooltip("2025-03-02", 12)).toBe("12 contributions on March 2nd.");
    expect(formatTooltip("2025-03-03", 2)).toBe("2 contributions on March 3rd.");
    expect(formatTooltip("2025-03-11", 11)).toBe("11 contributions on March 11th.");
    expect(formatTooltip("2025-03-12", 12)).toBe("12 contributions on March 12th.");
    expect(formatTooltip("2025-03-13", 13)).toBe("13 contributions on March 13th.");
    expect(formatTooltip("2025-03-21", 21)).toBe("21 contributions on March 21st.");
    expect(formatTooltip("2025-03-22", 22)).toBe("22 contributions on March 22nd.");
    expect(formatTooltip("2025-03-23", 23)).toBe("23 contributions on March 23rd.");
  });

  it("parses valid, old, future and nonnumeric years", () => {
    const currentYear = new Date().getUTCFullYear();
    expect(parseYearParam(String(currentYear))).toBe(currentYear);
    expect(parseYearParam("2007")).toBeNull();
    expect(parseYearParam(String(currentYear + 1))).toBeNull();
    expect(parseYearParam("twenty-twenty")).toBeNull();
    expect(parseYearParam(null)).toBeNull();
  });
});
