import { SearchData, useDataContext } from "@/hooks/DataContext";
import { sortByDateString } from "@/utils/sort";
import dynamic from "next/dynamic";

const ResponsiveBump = dynamic(
  () => import("@nivo/bump").then((m) => m.ResponsiveBump),
  {
    ssr: false,
  }
);

const trimLongNames = (s: string, limit: number) => {
  return s.length > limit ? `${s.slice(0, limit - 2)}...` : s;
};

const parseDataToBumpChart = (data: SearchData) => {
  const nameById = {};
  const rankingById = {};
  data.ranking.reverse().forEach((entry) => {
    const currentDate = entry.date;
    entry.items.slice(0, 20).forEach((item, idx) => {
      const { id, name } = item;
      if (Object.hasOwn(rankingById, id)) {
        rankingById[id].push({ x: currentDate, y: idx + 1 });
      } else {
        rankingById[id] = [{ x: currentDate, y: idx + 1 }];
        nameById[id] = name;
      }
    });
  });
  const parsedData = Object.keys(rankingById).map((key) => {
    return {
      id: nameById[key],
      data: rankingById[key].sort(sortByDateString),
    };
  });
  return parsedData;
};

const props = {
  margin: { top: 40, right: 180, bottom: 40, left: 40 },
  spacing: 8,
};

const RankingChart = () => {
  const { searchData } = useDataContext();
  return (
    <div className="w-full h-[400px]">
      <ResponsiveBump data={parseDataToBumpChart(searchData)} {...props} />
    </div>
  );
};

export default RankingChart;
