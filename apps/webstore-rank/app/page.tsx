"use client";
import { useEffect, useState } from "react";
import { useDataContext } from "../hooks/DataContext";
import RankingChart from "@/components/RankingChart";
import { AppFrame, Button, CardFrame, Skeleton } from "ui";
import UsersChart from "@/components/UsersChart";
import RatingChart from "@/components/RatingChart";
import TopResultsTable from "@/components/TopResultsTable";
import { ShoppingBag, TextCursorInput } from "lucide-react";
import { CommandBarChrome } from "@/components/CommandBarChrome";
import { useSearchParams } from "next/navigation";
import { ChartFilterMenu } from "@/components/ChartFilterMenu";

export default function Page() {
  const {
    searchData,
    setSearchData,
    searchTerm,
    setSearchTerm,
    setLoading,
    loading,
  } = useDataContext();
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
      setLoading(true);
      const res = await (
        await fetch(
          `/chrome-extension/api/search/${encodeURIComponent(searchTerm)}`
        )
      ).json();
      setSearchData(res.searchData);
      setItemsData(res.items);
      console.log(res);
      setLoading(false);
    };
    if (searchTerm.length > 2) {
      getData();
    }
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
      <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full pb-4">
        <div className="pt-2 pb-4 px-2 flex flex-col gap-1">
          <div className="uppercase text-xs">Search trends for</div>
          <h3 className="font-semibold text-xl">
            {loading ? <Skeleton className="h-6 w-12" /> : searchData.keyword}
          </h3>
        </div>
        <div className="flex">
          <ChartFilterMenu />
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col md:flex-row gap-4 w-full relative">
          <div className="md:w-[calc(66%-0.5rem)] flex-grow-0 ">
            <RankingChart />
          </div>
          <div className="md:w-[calc(34%-0.5rem)] flex-grow-0">
            <CardFrame
              title="Top Results"
              className="!px-0 !h-full !pb-0"
              titleClassName="px-4"
            >
              <div className="pt-4 h-full">
                <TopResultsTable data={itemsData} />
              </div>
            </CardFrame>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full relative">
          <div className="w-full md:w-[calc(50%-0.5rem)]  flex-grow-0 ">
            <CardFrame title="Users">
              <UsersChart data={itemsData} />
            </CardFrame>
          </div>
          <div className="w-full md:w-[calc(50%-0.5rem)] ">
            <CardFrame title="Rating">
              <RatingChart data={itemsData} />
            </CardFrame>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}
