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

export interface FilterData {
  cumulative_rating: boolean;
}

const DEFAULT_SEARCH = { keyword: "", ranking: [] };
const DEFAULT_SETTINGS = { cumulative_rating: false };

interface DataContext {
  searchData: SearchData;
  setSearchData: (value: SearchData) => void;
  filters: FilterData;
  setFilters: (value: FilterData) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
}

export const [useDataContext, DataContextProvider] =
  createContext<DataContext>("Data");

export const DataWrapper = ({ children }: PropsWithChildren) => {
  const [searchData, setSearchData] = useState<SearchData>(DEFAULT_SEARCH);
  const [filters, setFilters] = useState<FilterData>(DEFAULT_SETTINGS);
  const [searchTerm, setSearchTerm] = useState("youtube summary");
  const [loading, setLoading] = useState(true);

  return (
    <DataContextProvider
      value={{
        searchData,
        setSearchData,
        searchTerm,
        setSearchTerm,
        loading,
        setLoading,
        filters,
        setFilters,
      }}
    >
      {children}
    </DataContextProvider>
  );
};
