'use client'
import {
	AppFrame,
	Button,
	CardFrame,
	Dialog,
	DialogTrigger,
	Skeleton,
	useToast,
} from 'ui'
import { CommandBarChrome } from '@/components/CommandBarChrome'
import SidebarItems from '@/components/SidebarItems'
import {
	DEFAULT_SEARCH_TERM,
	GUEST_USER,
	NO_USER,
	useDataContext,
} from '../../hooks/DataContext'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import UsersTrend from '../../components/UsersTrend'
import RatingTrend from '../../components/RatingTrend'
import KeywordRankingTable from '../../components/KeywordRankingTable'
import { ItemFilterMenu } from '../../components/ItemFilterMenu'
import LoginModal from '../../components/LoginModal/LoginModal'
import { addSegment } from '../../utils/service'
import AppTopRight from '../../components/AppTopRight'
import { Download, Loader2 } from 'lucide-react'

export default function Page() {
	const {
		itemId,
		setItemId,
		setLoading,
		loading,
		userAccount,
		setUserAccount,
	} = useDataContext()
	const [itemData, setItemData] = useState<any>({})
	const [rankingData, setRankingData] = useState<any>([])
	const [trackLoading, setTrackLoading] = useState(false)
	const searchParams = useSearchParams()
	const { toast } = useToast()

	useEffect(() => {
		const item = searchParams.get('id')
		if (item) {
			setItemId(decodeURIComponent(String(item)))
		} else {
			if (!window.location.pathname.includes('?id=')) {
				setItemId('')
			}
		}
	}, [searchParams, setItemId])

	useEffect(() => {
		const getData = async () => {
			setLoading(true)
			const res = await (
				await fetch(
					`/chrome-extension/api/item/${encodeURIComponent(itemId)}`,
				)
			).json()
			setItemData(res.data)
			setRankingData(res.rankings ?? [])
			setLoading(false)
		}
		if (itemId.length > 0 && itemId !== DEFAULT_SEARCH_TERM) {
			getData()
		}
	}, [itemId, setLoading])

	const trackItem = async () => {
		setTrackLoading(true)
		try {
			const updatedUser = await addSegment({
				accountId: userAccount.id,
				segment: { id: itemId, type: 'item', name: itemData.name },
			})
			toast({
				title: 'Saved item!',
				description: `Now tracking '${itemData.name}'`,
			})
			setUserAccount(updatedUser)
			setTrackLoading(false)
		} catch (e) {
			console.error(e)
			toast({
				title: 'Uh oh! Something went wrong.',
				description:
					'There was a problem with your request. Please try again',
			})
			setTrackLoading(false)
		}
	}

	const mostRecentUserData = useMemo(() => {
		const items = itemData.users || []
		return items[items.length - 1] || {}
	}, [itemData])

	const mostRecentRatingData = useMemo(() => {
		const items = itemData.rating || []
		return items[items.length - 1] || {}
	}, [itemData])

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
							itemData.name
						)}
					</h3>
				</div>
				<div className="flex gap-2">
					<ItemFilterMenu />
					{userAccount.id !== NO_USER.id &&
					userAccount.id !== GUEST_USER.id ? (
						<Button onClick={trackItem}>
							{trackLoading ? (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							) : (
								<Download className="mr-2 h-4 w-4" />
							)}
							Track Extension
						</Button>
					) : (
						<Dialog>
							<DialogTrigger asChild>
								<Button>
									<Download className="mr-2 h-4 w-4" />
									Track Extension
								</Button>
							</DialogTrigger>
							<LoginModal />
						</Dialog>
					)}
				</div>
			</div>
			<div className="flex flex-col gap-4 w-full">
				<div className="flex flex-col md:flex-row gap-4 w-full relative">
					<div className="md:w-[calc(50%-0.5rem)] flex-grow-0 ">
						<CardFrame
							header={
								<div>
									<h4>Users</h4>
									<div className="text-3xl font-semibold">
										{mostRecentUserData?.users}
									</div>
								</div>
							}
						>
							<div className="pt-4 h-full">
								<UsersTrend data={itemData.users || []} />
							</div>
						</CardFrame>
					</div>
					<div className="md:w-[calc(50%-0.5rem)] flex-grow-0">
						<CardFrame
							header={
								<div>
									<h4>Rating</h4>
									<div className="text-3xl font-semibold">
										{mostRecentRatingData?.rating?.average.toFixed(
											2,
										)}
									</div>
								</div>
							}
						>
							<div className="pt-4 h-full">
								<RatingTrend data={itemData.rating || []} />
							</div>
						</CardFrame>
					</div>
				</div>
				<CardFrame
					className="w-full !px-0 !pb-0"
					titleClassName="px-4"
					title="Search Rankings"
				>
					<div className="pt-4">
						<KeywordRankingTable data={rankingData} />
					</div>
				</CardFrame>
			</div>
		</AppFrame>
	)
}
