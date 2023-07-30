'use client'
import { AppFrame, CardFrame, Skeleton } from 'ui'
import { CommandBarChrome } from '@/components/CommandBarChrome'
import SidebarItems from '@/components/SidebarItems'
import { Hourglass } from 'lucide-react'
import { DEFAULT_SEARCH_TERM, useDataContext } from '../../hooks/DataContext'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import UsersTrend from '../../components/UsersTrend'
import RatingTrend from '../../components/RatingTrend'

export default function Page() {
	const { itemId, setItemId, setLoading, loading } = useDataContext()
	const [itemData, setItemData] = useState<any>({})
	const searchParams = useSearchParams()

	useEffect(() => {
		const item = searchParams.get('id')
		if (item) {
			setItemId(decodeURIComponent(String(item)))
		} else {
			if (!window.location.pathname.includes('?id=')) {
				setItemId('')
			}
		}
	}, [searchParams])

	useEffect(() => {
		const getData = async () => {
			setLoading(true)
			const res = await (
				await fetch(
					`/chrome-extension/api/item/${encodeURIComponent(itemId)}`,
				)
			).json()
			setItemData(res.data)
			setLoading(false)
		}
		if (itemId.length > 0 && itemId !== DEFAULT_SEARCH_TERM) {
			getData()
		}
	}, [itemId])

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
				<CardFrame className="w-full">
					<div className="flex flex-col items-center justify-center gap-2 w-full h-full">
						<div className="bg-gray-200 w-12 h-12 rounded flex items-center justify-center">
							<Hourglass size={24} className="text-gray-500" />
						</div>
						<div className="max-w-[420px] text-textSecondary text-center">
							This feature is in the works. Thanks for being
							patient!
						</div>
					</div>
				</CardFrame>
			</div>
		</AppFrame>
	)
}
