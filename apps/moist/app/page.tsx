'use client'
import { BottomMenu } from '@/components/BottomMenu'
import { TopNavigation } from '@/components/TopNavigation'
import PosterItem from '../components/PosterItem'
import { filterValidMedia } from '../utils/utils'

export default function Page() {
	return (
		<div className="h-full w-full">
			<TopNavigation />
			<div className="flex flex-wrap max-w-[800px] mx-auto">
				{filterValidMedia({}).map((video) => {
					return <PosterItem video={video} />
				})}
			</div>
			<BottomMenu />
		</div>
	)
}
