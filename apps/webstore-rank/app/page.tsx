"use client";
import { useEffect } from "react";
import { Button, Header } from "ui";
import { useDataContext } from "../hooks/DataContext";
import RankingChart from "@/components/RankingChart";
import Sidebar from "ui/components/Sidebar/Sidebar";
import AppFrame from "ui/components/AppFrame/AppFrame";
import CardFrame from "ui/components/CardFrame/CardFrame";

export default function Page() {
  const { setSearchData } = useDataContext();
  useEffect(() => {
    const getData = async () => {
      const res = await (
        await fetch(`/api/search/${encodeURIComponent("youtube summary")}`)
      ).json();
      setSearchData(res.searchData);
      console.log(res.searchData);
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
      <Button>Test Button</Button>
      <CardFrame>
        <RankingChart />
      </CardFrame>
    </AppFrame>
  );
}
