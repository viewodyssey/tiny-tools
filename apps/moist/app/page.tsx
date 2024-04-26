'use client'
import { BottomMenu } from '@/components/BottomMenu'
import { TopNavigation } from '@/components/TopNavigation'
import { useState } from 'react'
import PosterItem from '../components/PosterItem'
import Tabs from '../components/Tabs'
import { SORT_ITEMS } from '../constants'
import { filterValidMedia } from '../utils/utils'

export default function Page() {
	const [sort, setSort] = useState(SORT_ITEMS[0].value)
	const mediaItem = filterValidMedia({ sort: sort as any })

	return (
		<div className="h-full w-full">
			<TopNavigation />
			<div className="pb-8">
				<div className="w-full mt-2">
					<Tabs
						items={SORT_ITEMS}
						value={sort}
						onChange={(value) => {
							setSort(value)
						}}
					/>
				</div>
				<div className="flex flex-wrap max-w-[800px] mx-auto">
					{mediaItem.map((video) => {
						return <PosterItem video={video} />
					})}
				</div>
			</div>
			<BottomMenu />
		</div>
	)
}
