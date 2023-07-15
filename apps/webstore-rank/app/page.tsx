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
    <>
      <Header text="Docs" />
      <Button>Test Button</Button>
      <div>test2</div>
      {/* <RankingChart /> */}
    </>
  );
}
