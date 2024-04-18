'use client'
import { BottomMenu } from '@/components/BottomMenu'
import { TopNavigation } from '@/components/TopNavigation'
import PosterItem from '@/components/PosterItem'
import { filterValidMedia } from '@/utils/utils'
import Dropdown from '../../components/Dropdown'
import { SORT_ITEMS } from '../../constants'
import { useState } from 'react'

export default function Page() {
	const [sort, setSort] = useState(SORT_ITEMS[0].value)
	const mediaItem = filterValidMedia({ type: 'game', sort: sort as any })

	return (
		<div className="h-full w-full">
			<TopNavigation />
			<div className="pb-8">
				<div className="px-2 py-2 mt-2 flex justify-between items-center w-full">
					<div className="text-sm pl-2">{mediaItem.length} items</div>
					<Dropdown
						items={SORT_ITEMS}
						value={sort}
						onChange={(value) => {
							setSort(value)
						}}
					/>
				</div>
				<div className="flex flex-wrap max-w-[800px] mx-auto">
					{mediaItem.map((video) => {
						return <PosterItem video={video} key={video.id} />
					})}
				</div>
			</div>
			<BottomMenu />
		</div>
	)
}
