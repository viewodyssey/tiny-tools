"use client";
import { useEffect, useState } from "react";
import { useDataContext } from "../hooks/DataContext";
import RankingChart from "@/components/RankingChart";
import AppFrame from "ui/components/AppFrame/AppFrame";
import CardFrame from "ui/components/CardFrame/CardFrame";
import UsersChart from "@/components/UsersChart";
import RatingChart from "@/components/RatingChart";
import TopResultsTable from "@/components/TopResultsTable";

export default function Page() {
  const { searchData, setSearchData } = useDataContext();
  const [itemsData, setItemsData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await (
        await fetch(`/api/search/${encodeURIComponent("youtube summary")}`)
      ).json();
      setSearchData(res.searchData);
      setItemsData(res.items);
      console.log(res);
    };
    getData();
  }, []);

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
    <AppFrame>
      <div className="pt-2 pb-4 px-2 flex flex-col gap-1">
        <div className="uppercase text-xs">Search trends for</div>
        <h3 className="font-semibold text-xl">{searchData.keyword}</h3>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex gap-4 w-full relative pr-4">
          <div className="basis-2/3 flex-grow-0 ">
            <CardFrame title="Search Ranking">
              <RankingChart />
            </CardFrame>
          </div>
          <div className="basis-1/3 flex-grow-0 overflow-auto">
            <CardFrame title="Top Results">
              <TopResultsTable data={itemsData} />
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
