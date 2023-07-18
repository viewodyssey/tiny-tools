import React, { PropsWithChildren, useEffect, useState } from "react";

function createContext<A extends {} | null>(displayName: string) {
  const ctx = React.createContext<A | undefined>(undefined);
  ctx.displayName = displayName;
  function useContext() {
    const c = React.useContext(ctx);
    if (c === undefined)
      throw new Error("useContext must be inside a Provider with a value");
    return c;
  }
  return [useContext, ctx.Provider] as const;
}

interface SearchUpdateItem {
  id: string;
  name: string;
}
export interface SearchData {
  keyword: string;
  ranking: { date: string; items: SearchUpdateItem[] }[];
}

const DEFAULT_SEARCH = { keyword: "", ranking: [] };

interface DataContext {
  searchData: SearchData;
  setSearchData: (value: SearchData) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export const [useDataContext, DataContextProvider] =
  createContext<DataContext>("Data");

export const DataWrapper = ({ children }: PropsWithChildren) => {
  const [searchData, setSearchData] = useState<SearchData>(DEFAULT_SEARCH);
  const [searchTerm, setSearchTerm] = useState("youtube summary");

  return (
    <DataContextProvider
      value={{
        searchData,
        setSearchData,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </DataContextProvider>
  );
};
