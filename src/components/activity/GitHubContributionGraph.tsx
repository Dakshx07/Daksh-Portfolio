"use client";

import { useEffect, useState, useMemo, useRef } from "react";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface GitHubApiResponse {
  total: {
    lastYear?: number;
    [year: string]: number | undefined;
  };
  contributions: ContributionDay[];
}

interface GitHubContributionGraphProps {
  username?: string;
}

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

// Exact Akoder Blue Heatmap Palette
const LEVEL_COLORS: Record<number, string> = {
  0: "bg-[#27272a] hover:bg-[#3f3f46]", // Empty / no activity
  1: "bg-[#1d4ed8] hover:bg-[#2563eb]", // Level 1
  2: "bg-[#2563eb] hover:bg-[#3b82f6]", // Level 2
  3: "bg-[#3b82f6] hover:bg-[#60a5fa]", // Level 3
  4: "bg-[#60a5fa] hover:bg-[#93c5fd]", // Level 4 (Highest)
};

export default function GitHubContributionGraph({
  username = "Dakshx07",
}: GitHubContributionGraphProps) {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [totalCount, setTotalCount] = useState<number>(1503);
  const [isLoading, setIsLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [hoveredDay, setHoveredDay] = useState<{
    date: string;
    count: number;
    x: number;
    y: number;
  } | null>(null);

  // Auto-scroll to rightmost end on mount / load so latest activity is immediately visible!
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
    }
  }, [contributions]);

  useEffect(() => {
    let isMounted = true;

    async function fetchContributions() {
      try {
        setIsLoading(true);
        // Real-time live GitHub contributions fetch for username
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
        );
        if (!res.ok) throw new Error("Failed to fetch contribution data");
        const json: GitHubApiResponse = await res.json();

        if (isMounted && json.contributions && json.contributions.length > 0) {
          setContributions(json.contributions);
          const total =
            json.total?.lastYear ??
            json.contributions.reduce((acc, cur) => acc + cur.count, 0);
          setTotalCount(total);
        }
      } catch (err) {
        console.warn("Using offline / fallback GitHub contributions:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchContributions();
    return () => {
      isMounted = false;
    };
  }, [username]);

  // Group contributions into 52–53 weeks (columns), each containing up to 7 days
  const { weeks, monthLabels } = useMemo(() => {
    if (!contributions.length) {
      // Fallback: generate a realistic 52-week skeleton while loading
      const mockDays: ContributionDay[] = [];
      const now = new Date();
      for (let i = 364; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        const rand = Math.random();
        const level =
          rand > 0.85 ? 4 : rand > 0.65 ? 3 : rand > 0.4 ? 2 : rand > 0.25 ? 1 : 0;
        mockDays.push({
          date: d.toISOString().split("T")[0],
          count: level * 3,
          level,
        });
      }
      return processWeeks(mockDays);
    }
    return processWeeks(contributions);
  }, [contributions]);

  function processWeeks(days: ContributionDay[]) {
    const weeksArr: ContributionDay[][] = [];
    let currentWeek: ContributionDay[] = [];

    const firstDate = new Date(days[0].date);
    const startDayOfWeek = firstDate.getDay();

    for (let i = 0; i < startDayOfWeek; i++) {
      currentWeek.push({ date: "", count: 0, level: -1 });
    }

    days.forEach((day) => {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weeksArr.push(currentWeek);
        currentWeek = [];
      }
    });

    if (currentWeek.length > 0) {
      weeksArr.push(currentWeek);
    }

    const labels: { month: string; colIndex: number }[] = [];
    let lastMonth = -1;

    weeksArr.forEach((week, colIdx) => {
      const validDay = week.find((d) => d.date);
      if (validDay) {
        const d = new Date(validDay.date);
        const m = d.getMonth();
        if (m !== lastMonth) {
          labels.push({ month: MONTH_NAMES[m], colIndex: colIdx });
          lastMonth = m;
        }
      }
    });

    return { weeks: weeksArr, monthLabels: labels };
  }

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return "";
    const [y, m, d] = dateStr.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section className="relative w-full py-12 select-none">
      {/* Top Dashed Hairline Border (Matching Akoder Screenshot) */}

      <div className="relative mx-auto w-full max-w-[760px] px-4 sm:px-6">
        {/* Scrollable Heatmap Viewport (Auto-scrolled to latest end on mobile, fits width on desktop) */}
        <div
          ref={scrollContainerRef}
          className="relative overflow-x-auto pb-4 scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="min-w-[680px] w-full flex flex-col items-center">
            {/* Top Month Labels */}
            <div className="relative h-5 mb-2.5 w-full font-mono text-[11px] text-zinc-400">
              {monthLabels.map(({ month, colIndex }) => (
                <span
                  key={`${month}-${colIndex}`}
                  className="absolute transform -translate-x-1"
                  style={{ left: `${(colIndex / weeks.length) * 100}%` }}
                >
                  {month}
                </span>
              ))}
            </div>

            {/* 7-Row x 52-Column Grid of Circular Dots */}
            <div className="flex gap-[3.5px] sm:gap-[3.8px] justify-between w-full">
              {weeks.map((week, weekIdx) => (
                <div key={weekIdx} className="flex flex-col gap-[3.5px] sm:gap-[3.8px]">
                  {week.map((day, dayIdx) => {
                    if (day.level === -1) {
                      return (
                        <div
                          key={`pad-${dayIdx}`}
                          className="w-2.5 h-2.5 sm:w-[11px] sm:h-[11px] rounded-full opacity-0 pointer-events-none"
                        />
                      );
                    }

                    const colorClass = LEVEL_COLORS[day.level] || LEVEL_COLORS[0];

                    return (
                      <div
                        key={day.date || dayIdx}
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setHoveredDay({
                            date: day.date,
                            count: day.count,
                            x: rect.left + rect.width / 2,
                            y: rect.top - 8,
                          });
                        }}
                        onMouseLeave={() => setHoveredDay(null)}
                        className={`w-2.5 h-2.5 sm:w-[11px] sm:h-[11px] rounded-full cursor-pointer transition-transform duration-150 hover:scale-140 hover:z-20 ${colorClass} ${
                          isLoading ? "animate-pulse" : ""
                        }`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Bottom Legend (Matching Akoder Screenshot) */}
            <div className="flex items-center justify-center gap-2 mt-7 font-mono text-[11.5px] text-zinc-400">
              <span>Less</span>
              <div className="flex items-center gap-1.5 mx-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#27272a]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#1d4ed8]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#2563eb]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#3b82f6]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#60a5fa]" />
              </div>
              <span>More</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Micro-Pill Tooltip */}
      {hoveredDay && (
        <div
          className="fixed z-50 pointer-events-none -translate-x-1/2 -translate-y-full px-2.5 py-1 rounded-md bg-zinc-900 text-white font-mono text-[10.5px] border border-zinc-700 shadow-[0_4px_16px_rgba(0,0,0,0.6)] whitespace-nowrap"
          style={{
            left: `${hoveredDay.x}px`,
            top: `${hoveredDay.y}px`,
          }}
        >
          <span className="text-blue-400 font-semibold">
            {hoveredDay.count} contribution{hoveredDay.count === 1 ? "" : "s"}
          </span>
          <span className="text-zinc-400 ml-1.5">
            on {formatDisplayDate(hoveredDay.date)}
          </span>
        </div>
      )}
    </section>
  );
}

