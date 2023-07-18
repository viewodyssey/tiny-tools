import { useDataContext } from "@/hooks/DataContext";
import { getSubstringOccurences } from "@/utils/findkeyword";
import { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "ui";

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
  }, [searchData.keyword, data]);

  return (
    <div className="overflow-auto max-h-[400px] h-full w-full">
      <div className="flex w-full py-2 px-4 font-medium text-sm text-gray-400">
        <div
          className="w-full truncate"
          style={{ maxWidth: "calc(100% - 80px)" }}
        >
          Name
        </div>
        <div className="basis-[80px] flex-grow-0 text-right">Keywords</div>
      </div>
      {dataWithKeywordFrequency.map((row, i) => (
        <div
          className="flex w-full px-4 border-t-border border-t py-2 items-center"
          key={i}
        >
          <div className="basis-[40px] flex-grow-0">
            <img
              src={row.images["26x26"]}
              alt="Icon"
              className="w-6 h-6"
              referrerPolicy="no-referrer"
            />
          </div>
          <div
            className="w-full truncate text-sm"
            style={{ maxWidth: "calc(100% - 120px)" }}
          >
            {row.name}
          </div>
          <div className="basis-[80px] flex-grow-0 text-right pr-2 text-sm">
            {row.keywordFrequency}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopResultsTable;
