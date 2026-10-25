import { NextResponse } from "next/server";
import { getContributionsWithReason } from "@/lib/github";
import { parseYearParam } from "@/lib/heatmap";

export async function GET(request: Request) {
  const rangeParam = new URL(request.url).searchParams.get("range");
  const range = rangeParam === "last" ? "last" : parseYearParam(rangeParam);

  if (range === null) {
    return NextResponse.json({ error: "Invalid contribution range." }, { status: 400 });
  }

  const result = await getContributionsWithReason(range);
  if (!result.data) {
    return NextResponse.json(
      { error: `GitHub contributions unavailable: ${result.error ?? "github request failed"}.` },
      { status: 502 },
    );
  }

  return NextResponse.json(result.data, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
