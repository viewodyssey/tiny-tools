import React, { PropsWithChildren, useEffect, useState } from 'react'

function createContext<A extends {} | null>(displayName: string) {
	const ctx = React.createContext<A | undefined>(undefined)
	ctx.displayName = displayName
	function useContext() {
		const c = React.useContext(ctx)
		if (c === undefined)
			throw new Error('useContext must be inside a Provider with a value')
		return c
	}
	return [useContext, ctx.Provider] as const
}

interface SearchUpdateItem {
	id: string
	name: string
}
export interface SearchData {
	keyword: string
	ranking: { date: string; items: SearchUpdateItem[] }[]
}

export interface FilterData {
	cumulative_rating: boolean
}

const DEFAULT_SEARCH = { keyword: '', ranking: [] }
const DEFAULT_SETTINGS = { cumulative_rating: false }
export const DEFAULT_SEARCH_TERM = 'tinytools_nothing_set'

interface DataContext {
	searchData: SearchData
	setSearchData: (value: SearchData) => void
	filters: FilterData
	setFilters: (value: FilterData) => void
	searchTerm: string
	setSearchTerm: (value: string) => void
	itemId: string
	setItemId: (value: string) => void
	loading: boolean
	setLoading: (value: boolean) => void
	open: boolean
	setOpen: (value: boolean) => void
}

export const [useDataContext, DataContextProvider] =
	createContext<DataContext>('Data')

export const DataWrapper = ({ children }: PropsWithChildren) => {
	const [searchData, setSearchData] = useState<SearchData>(DEFAULT_SEARCH)
	const [filters, setFilters] = useState<FilterData>(DEFAULT_SETTINGS)
	const [searchTerm, setSearchTerm] = useState(DEFAULT_SEARCH_TERM)
	const [itemId, setItemId] = useState(DEFAULT_SEARCH_TERM)
	const [loading, setLoading] = useState(false)
	const [open, setOpen] = useState(false)

	return (
		<DataContextProvider
			value={{
				searchData,
				setSearchData,
				searchTerm,
				setSearchTerm,
				itemId,
				setItemId,
				loading,
				setLoading,
				filters,
				setFilters,
				open,
				setOpen,
			}}
		>
			{children}
		</DataContextProvider>
	)
}
