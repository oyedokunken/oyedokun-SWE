import { NextResponse } from "next/server";
import { getContributions } from "@/lib/github";
import { parseYearParam } from "@/lib/heatmap";

export async function GET(request: Request) {
  const rangeParam = new URL(request.url).searchParams.get("range");
  const range = rangeParam === "last" ? "last" : parseYearParam(rangeParam);

  if (range === null) {
    return NextResponse.json({ error: "Invalid contribution range." }, { status: 400 });
  }

  const contributions = await getContributions(range);
  if (!contributions) {
    return NextResponse.json({ error: "GitHub contributions are unavailable." }, { status: 502 });
  }

  return NextResponse.json(contributions, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
