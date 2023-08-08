'use client'
import { useEffect, useState } from 'react'
import {
	DEFAULT_SEARCH_TERM,
	GUEST_USER,
	NO_USER,
	useDataContext,
} from '../../hooks/DataContext'
import RankingChart from '@/components/RankingChart'
import {
	AppFrame,
	Button,
	CardFrame,
	Dialog,
	DialogTrigger,
	Skeleton,
	useToast,
} from 'ui'
import UsersChart from '@/components/UsersChart'
import RatingChart from '@/components/RatingChart'
import TopResultsTable from '@/components/TopResultsTable'
import { CommandBarChrome } from '@/components/CommandBarChrome'
import { ChartFilterMenu } from '@/components/ChartFilterMenu'
import SidebarItems from '@/components/SidebarItems'
import { useSearchParams } from 'next/navigation'
import LoginModal from '../../components/LoginModal/LoginModal'
import { addSegment } from '../../utils/service'
import AppTopRight from '../../components/AppTopRight'

export default function Page() {
	const {
		searchData,
		setSearchData,
		searchTerm,
		setSearchTerm,
		setLoading,
		loading,
		userAccount,
		setUserAccount,
	} = useDataContext()
	const [itemsData, setItemsData] = useState([])
	const searchParams = useSearchParams()
	const { toast } = useToast()

	useEffect(() => {
		const keyword = searchParams.get('keyword')
		if (keyword) {
			setSearchTerm(decodeURIComponent(String(keyword)))
		} else {
			if (!window.location.pathname.includes('?keyword=')) {
				setSearchTerm('')
			}
		}
	}, [searchParams, setSearchTerm])

	useEffect(() => {
		const getData = async () => {
			setLoading(true)
			const res = await (
				await fetch(
					`/chrome-extension/api/search/${encodeURIComponent(
						searchTerm,
					)}`,
				)
			).json()
			setSearchData(res.searchData)
			setItemsData(res.items)
			setLoading(false)
		}
		if (searchTerm.length > 2 && searchTerm !== DEFAULT_SEARCH_TERM) {
			getData()
		}
	}, [searchTerm, setSearchData, setLoading])

	const trackKeyword = async () => {
		try {
			const updatedUser = await addSegment({
				accountId: userAccount.id,
				segment: { id: searchTerm, type: 'keyword', name: searchTerm },
			})
			toast({
				title: 'Saved item!',
				description: `Now tracking '${searchTerm}'`,
			})
			setUserAccount(updatedUser)
		} catch (e) {
			console.error(e)
			toast({
				title: 'Uh oh! Something went wrong.',
				description:
					'There was a problem with your request. Please try again',
			})
		}
	}

	return (
		<AppFrame
			sidebarChildren={<SidebarItems />}
			topbarChildren={<CommandBarChrome />}
			topRightChildren={<AppTopRight />}
		>
			<div className="flex flex-col md:flex-row md:justify-between md:items-center w-full pb-4">
				<div className="pt-2 pb-4 px-2 flex flex-col gap-1">
					<div className="uppercase text-xs">Search trends for</div>
					<h3 className="font-semibold text-xl">
						{loading ? (
							<Skeleton className="h-6 w-12" />
						) : (
							searchData.keyword
						)}
					</h3>
				</div>
				<div className="flex gap-2">
					<ChartFilterMenu />
					{userAccount.id !== NO_USER.id &&
					userAccount.id !== GUEST_USER.id ? (
						<Button onClick={trackKeyword}>Track Keyword</Button>
					) : (
						<Dialog>
							<DialogTrigger asChild>
								<Button>Track Keyword</Button>
							</DialogTrigger>
							<LoginModal />
						</Dialog>
					)}
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
	)
}
