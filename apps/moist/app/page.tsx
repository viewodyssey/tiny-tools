'use client'
import { BottomMenu } from '@/components/BottomMenu'
import { TopNavigation } from '@/components/TopNavigation'
import SplashImage from '@/assets/extensionSplash.jpg'
import Image from 'next/image'
import { useState } from 'react'
import { Button } from 'ui'
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
				<div className="max-w-[800px] mx-auto py-4 flex flex-col lg:flex-row gap-8 items-center w-full">
					<div className="w-full lg:w-1/2 flex flex-col gap-2">
						<h4 className="text-[30px] lg:text-[44px] font-semibold tracking-tight leading-[1.1]">
							Get the extension
						</h4>
						<p className="text-base font-normal tracking-tight text-gray-600">
							Add the coveted Moist Meter ratings on Google,
							Rotten Tomatoes, and IMDB.
						</p>
						<div className="w-full lg:w-auto">
							<Button className="w-full lg:w-auto">
								Install
							</Button>
						</div>
					</div>
					<div className="w-full lg:w-1/2">
						<Image
							src={SplashImage}
							alt=""
							className="rounded w-full"
						/>
					</div>
				</div>
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
						return <PosterItem key={video.id} video={video} />
					})}
				</div>
			</div>
			<BottomMenu />
		</div>
	)
}
