import React, { PropsWithChildren, useEffect, useState } from 'react'
import { getAccount } from '../utils/service'

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
	time_frame: number
}

export interface UserAccount {
	id: string
	email: string
	firstName: string
	lastName: string
	segments?: Segment[]
}

export interface Segment {
	type: 'keyword' | 'item'
	id: string
	name: string
}

const DEFAULT_SEARCH = { keyword: '', ranking: [] }
const DEFAULT_SETTINGS = { cumulative_rating: false, time_frame: 7 }
export const DEFAULT_SEARCH_TERM = 'tinytools_nothing_set'
export const NO_USER: UserAccount = {
	id: '',
	email: '',
	firstName: 'N',
	lastName: '',
}
export const GUEST_USER: UserAccount = {
	id: 'guest',
	email: '',
	firstName: 'Guest',
	lastName: '',
}

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
	userAccount: UserAccount
	setUserAccount: (value: UserAccount) => void
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
	const [userAccount, setUserAccount] = useState<UserAccount>(NO_USER)

	useEffect(() => {
		const getUser = async () => {
			const userId = localStorage.getItem('id')
			if (userId) {
				const userObject = await getAccount(userId)
				setUserAccount(userObject)
			} else {
				setUserAccount(GUEST_USER)
			}
		}
		if (userAccount.id === NO_USER.id) {
			getUser()
		}
	}, [setUserAccount, userAccount.id])

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
				userAccount,
				setUserAccount,
			}}
		>
			{children}
		</DataContextProvider>
	)
}
