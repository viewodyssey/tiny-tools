import { useDataContext } from "@/hooks/DataContext";
import { getSubstringOccurences } from "@/utils/findkeyword";
import { useMemo } from "react";

interface TopResultsTableProps {
  data: any[];
}

const TopResultsTable = ({ data }: TopResultsTableProps) => {
  const { searchData } = useDataContext();

  const dataWithKeywordFrequency = useMemo(() => {
    const searchKeywords = searchData.keyword.split(" ");
    const parsedData = data.map((d) => {
      let totalFrequency = 0;
      searchKeywords.forEach((keyword) => {
        totalFrequency += getSubstringOccurences(
          `${d.name} ${d.title}`,
          keyword
        );
      });
      return { ...d, keywordFrequency: totalFrequency };
    });
    return parsedData;
  }, [searchData.keyword]);

  return (
    <div className="overflow-auto max-h-[400px] h-full w-full">
      {dataWithKeywordFrequency.map((row) => (
        <div className="flex w-full">
          <div
            className="w-full truncate"
            style={{ maxWidth: "calc(100% - 20px)" }}
          >
            {row.name}
          </div>
          <div className="basis-[20px] flex-grow-0">{row.keywordFrequency}</div>
        </div>
      ))}
    </div>
  );
};

export default TopResultsTable;
