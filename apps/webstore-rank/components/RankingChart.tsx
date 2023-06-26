import { SearchData, useDataContext } from "@/hooks/DataContext";
import { sortByDateString } from "@/utils/sort";
import dynamic from "next/dynamic";

const ResponsiveBump = dynamic(
  () => import("@nivo/bump").then((m) => m.ResponsiveBump),
  {
    ssr: false,
  }
);

const parseDataToBumpChart = (data: SearchData) => {
  const rankingById = {};
  data.ranking.reverse().forEach((entry, entryNumber) => {
    entry.items.slice(0, 30).forEach((id, idx) => {
      if (Object.hasOwn(rankingById, id)) {
        rankingById[id].push({ x: entryNumber, y: idx + 1 });
      } else {
        rankingById[id] = [{ x: entryNumber, y: idx + 1 }];
      }
    });
  });
  const parsedData = Object.keys(rankingById).map((key) => {
    return { id: key, data: rankingById[key].sort(sortByDateString) };
  });
  console.log(parsedData);
  return parsedData;
};

const RankingChart = () => {
  const { searchData } = useDataContext();
  return (
    <div className="w-full h-[300px]">
      <ResponsiveBump data={parseDataToBumpChart(searchData)} />
    </div>
  );
};

export default RankingChart;
