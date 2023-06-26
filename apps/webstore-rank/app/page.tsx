"use client";
import { useEffect } from "react";
import { Button, Header } from "ui";
import { useDataContext } from "../hooks/DataContext";
import RankingChart from "@/components/RankingChart";

export default function Page() {
  const { setSearchData } = useDataContext();
  useEffect(() => {
    const getData = async () => {
      const res = await (
        await fetch(`/api/search/${encodeURIComponent("youtube summary")}`)
      ).json();
      setSearchData(res.searchData);
    };
    getData();
  }, []);
  return (
    <>
      <Header text="Docs" />
      <Button />
      <div>test</div>
      <RankingChart />
    </>
  );
}
