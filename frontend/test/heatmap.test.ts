import { describe, expect, it } from "vitest";
import {
  formatTooltip,
  computeLayout,
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

describe("heatmap helpers", () => {
  it("chooses a responsive horizontal or vertical layout", () => {
    expect(computeLayout(1200, 53)).toMatchObject({
      orientation: "horizontal",
      cell: 14,
    });
    expect(computeLayout(760, 53).orientation).toBe("horizontal");
    expect(computeLayout(640, 53).orientation).toBe("vertical");
    expect(computeLayout(600, 53).orientation).toBe("vertical");
    expect(computeLayout(768, 53).orientation).toBe("horizontal");
    expect(computeLayout(360, 53)).toMatchObject({ orientation: "vertical" });
    expect(computeLayout(360, 53).cell).toBeGreaterThanOrEqual(14);
    expect(computeLayout(360, 53).cell).toBeLessThanOrEqual(22);
    expect(computeLayout(320, 53).orientation).toBe("vertical");
  });

  it("never sizes the graph wider than its container", () => {
    for (const width of [280, 320, 360, 390, 430, 600, 768, 1024, 1440]) {
      expect(computeLayout(width, 53).width).toBeLessThanOrEqual(width);
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
