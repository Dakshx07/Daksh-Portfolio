import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// In-memory fallback if external tracker is unreachable
let localCount = 1;

export async function GET() {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(
      "https://visitor-badge.laobi.icu/badge?page_id=daksh-hiran.vercel.app",
      {
        headers: { "User-Agent": "Mozilla/5.0" },
        cache: "no-store",
        signal: controller.signal,
      }
    ).finally(() => clearTimeout(timeout));

    if (res.ok) {
      const svg = await res.text();
      const matches = svg.match(/>([0-9,]+)</g);
      if (matches && matches.length > 0) {
        // The last matched number in the badge SVG is the visit count
        const rawNum = matches[matches.length - 1].replace(/[><,]/g, "");
        const count = parseInt(rawNum, 10);
        if (!isNaN(count) && count > 0) {
          localCount = count;
          return NextResponse.json({ count });
        }
      }
    }
  } catch {
    // Fall back to localCount
  }

  localCount += 1;
  return NextResponse.json({ count: localCount });
}

export async function POST() {
  return GET();
}

