import { SearchData, useDataContext } from "@/hooks/DataContext";
import { sortByDateString, sortByX } from "@/utils/sort";
import { ChevronDown, ChevronUp } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { Button, CardFrame, Skeleton } from "ui";

const ResponsiveBump = dynamic(
  () => import("@nivo/bump").then((m) => m.ResponsiveBump),
  {
    ssr: false,
  }
);

const trimLongNames = (s: string, limit: number) => {
  return s.length > limit ? `${s.slice(0, limit - 2)}...` : s;
};

const parseDataToBumpChart = (
  data: SearchData,
  startIndex: number,
  limit: number
) => {
  const dt = new Date();
  dt.setDate(dt.getDate() - 7);
  const todayDate = dt.toISOString().split("T")[0];
  const nameById = {};
  const rankingById = {};
  const allDates = data.ranking
    .map((data) => data.date)
    .filter((d) => d > todayDate);
  data.ranking.reverse().forEach((entry) => {
    const currentDate = entry.date;
    entry.items
      .slice(startIndex, Math.min(startIndex + limit, entry.items.length))
      .forEach((item, idx) => {
        const { id, name } = item;
        if (Object.hasOwn(rankingById, id)) {
          rankingById[id].push({ x: currentDate, y: startIndex + idx + 1 });
        } else {
          rankingById[id] = [{ x: currentDate, y: startIndex + idx + 1 }];
          nameById[id] = name;
        }
      });
  });
  const parsedData = Object.keys(rankingById).map((key) => {
    const dataForItem = rankingById[key].filter(
      (dataItem) => dataItem.x > todayDate
    );
    if (dataForItem.length < allDates.length) {
      allDates.forEach((date) => {
        if (dataForItem.findIndex((d) => d.x === date) === -1) {
          dataForItem.push({ x: date, y: null });
        }
      });
    }
    dataForItem.sort(sortByX);
    return {
      id: `${nameById[key]} (...${key.slice(-3)})`,
      data: dataForItem.map((item) => {
        const fullDate = String(item.x).split("-");
        return { ...item, x: fullDate.slice(1).join("-") };
      }),
    };
  });
  return parsedData;
};

const LIMIT = 20;

const RankingChart = () => {
  const { searchData, loading } = useDataContext();
  const [range, setRange] = useState(0);

  const parsedData = useMemo(() => {
    return parseDataToBumpChart(searchData, range, LIMIT);
  }, [searchData, range]);

  const [isMobile, setMobile] = useState(false);

  const resize = () => {
    let currentHideNav = window.innerWidth <= 640;
    setMobile(currentHideNav);
  };

  useEffect(() => {
    window.addEventListener("resize", resize);
    resize();

    return () => window.removeEventListener("resize", resize);
  }, []);

  const props = useMemo(
    () => ({
      margin: {
        top: 20,
        right: isMobile ? 80 : 180,
        bottom: 40,
        left: isMobile ? 20 : 40,
      },
      spacing: 8,
      axisTop: null,
    }),
    [isMobile]
  );

  return (
    <CardFrame
      title="Search Ranking"
      controls={
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="icon"
            className="w-8 h-8"
            onClick={() => {
              setRange((prev) => prev - 20);
            }}
            disabled={range <= 0}
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="w-8 h-8"
            onClick={() => {
              setRange((prev) => prev + 20);
            }}
            disabled={
              range + 20 >=
              Math.floor(
                (searchData?.ranking[0]?.items?.length / LIMIT) * LIMIT
              )
            }
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      }
    >
      <div className="w-full h-[400px]">
        {loading ? (
          <div className="py-4 h-full w-full">
            <Skeleton className="h-full w-full" />
          </div>
        ) : (
          <ResponsiveBump
            data={parsedData}
            lineWidth={3}
            activeLineWidth={6}
            inactiveLineWidth={3}
            inactiveOpacity={0.15}
            pointSize={8}
            activePointSize={12}
            inactivePointSize={0}
            pointBorderWidth={3}
            activePointBorderWidth={3}
            pointBorderColor={{ from: "serie.color" }}
            {...props}
          />
        )}
      </div>
    </CardFrame>
  );
};

export default RankingChart;
