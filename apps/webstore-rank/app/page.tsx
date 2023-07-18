"use client";
import { useEffect, useState } from "react";
import { useDataContext } from "../hooks/DataContext";
import RankingChart from "@/components/RankingChart";
import { AppFrame, Button, CardFrame } from "ui";
import UsersChart from "@/components/UsersChart";
import RatingChart from "@/components/RatingChart";
import TopResultsTable from "@/components/TopResultsTable";
import {
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  TextCursorInput,
} from "lucide-react";
import { CommandBarChrome } from "@/components/CommandBarChrome";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const { searchData, setSearchData, searchTerm, setSearchTerm } =
    useDataContext();
  const [itemsData, setItemsData] = useState([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const keyword = searchParams.get("keyword");
    if (keyword) {
      setSearchTerm(decodeURIComponent(String(keyword)));
    }
  }, [searchParams]);

  useEffect(() => {
    const getData = async () => {
      const res = await (
        await fetch(`/api/search/${encodeURIComponent(searchTerm)}`)
      ).json();
      setSearchData(res.searchData);
      setItemsData(res.items);
      console.log(res);
    };
    getData();
  }, [searchTerm]);

  // useEffect(() => {
  //   const getData = async () => {
  //     const res = await (
  //       await fetch(`/api/item/jfkjbfhcfaoldhgbnkekkoheganchiea`)
  //     ).json();
  //     console.log("pepee", res);
  //   };
  //   getData();
  // }, []);

  // useEffect(() => {
  //   const getData = async () => {
  //     const res = await (await fetch(`/api/search/update`)).json();
  //     console.log("pepee", res);
  //   };
  //   getData();
  // }, []);

  return (
    <AppFrame
      sidebarChildren={
        <div className="mt-16">
          <div className="flex flex-col">
            <Button variant="ghost" className="justify-start px-2">
              <TextCursorInput size={16} className="mr-2" /> Search Terms
            </Button>
            <Button variant="ghost" className="justify-start px-2">
              <ShoppingBag size={16} className="mr-2" />
              Extension
            </Button>
          </div>
        </div>
      }
      topbarChildren={<CommandBarChrome />}
    >
      <div className="flex justify-between items-center w-full">
        <div className="pt-2 pb-4 px-2 flex flex-col gap-1">
          <div className="uppercase text-xs">Search trends for</div>
          <h3 className="font-semibold text-xl">{searchData.keyword}</h3>
        </div>
        <div className="flex">
          <Button variant="outline">Filter</Button>
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex gap-4 w-full relative">
          <div className="basis-2/3 flex-grow-0 ">
            <RankingChart />
          </div>
          <div className="basis-1/3 flex-grow-0 overflow-auto">
            <CardFrame
              title="Top Results"
              className="!px-0"
              titleClassName="px-4"
            >
              <div className="pt-4 h-full max-h-[400px]">
                <TopResultsTable data={itemsData} />
              </div>
            </CardFrame>
          </div>
        </div>
        <div className="flex gap-4 w-full">
          <div className="basis-1/2 flex-shrink-0 flex-grow-0 ">
            <CardFrame title="Users">
              <UsersChart data={itemsData} />
            </CardFrame>
          </div>
          <div className="w-full">
            <CardFrame title="Rating">
              <RatingChart data={itemsData} />
            </CardFrame>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}
