'use client'
import { BottomMenu } from '@/components/BottomMenu'
import WaterIcon from '@/assets/white-moist.svg'
import { TopNavigation } from '@/components/TopNavigation'
import Image from 'next/image'
import { Film, Gamepad, Tv } from 'lucide-react'
import { filterValidMedia } from '../../utils/utils'
import BarChart from '../../components/BarChart'

export default function Page() {
	const mediaItem = filterValidMedia({})

	const numMovies = mediaItem.filter(
		(item) => item.analysis.type === 'movie',
	).length
	const numTv = mediaItem.filter((item) => item.analysis.type === 'tv').length
	const numGames = mediaItem.filter(
		(item) => item.analysis.type === 'game',
	).length
	const maxNum = Math.max(numMovies, numGames, numTv)

	return (
		<div className="h-full w-full">
			<TopNavigation />
			<div className="pb-8 max-w-[800px] mx-auto">
				<div className="text-[44px] font-semibold tracking-tight leading-[1.1] flex flex-col gap-10 w-full pt-12 px-2">
					<p>
						<span className="inline-block w-8 h-8 bg-moist rounded mr-4">
							<Image
								src={WaterIcon}
								className="h-[20px] w-[14px] mx-auto my-[6px]"
								alt="water"
							/>
						</span>
						One man takes on the movie and gaming industry, one
						review at a time.{' '}
						<span className="opacity-50">
							The Moist Meter documents content creator
							penguinz0’s David vs. Goliath journey.
						</span>
					</p>
					{/* <p className="opacity-50">
						Each piece of media he consumes is rated on a scale
						known as the Moist Meter. These ratings are revered, as
						professionals wait in baited breath for their creations
						to be reviewed.{' '}
					</p> */}
					<p className="opacity-50">
						With too much time on my hands, I (@eightants) decided
						to document each Moist Meter on a Rotten Tomatoes-like
						site to discover trends.{' '}
					</p>
					<p>
						<span className="opacity-50">
							I also built the Moist Meter extension, which brings
							the scores to you on the web:{' '}
						</span>
						the ratings everyone deserves.{' '}
					</p>

					<div>
						<p>To date, there has been: </p>
						<div className="text-sm font-medium tracking-normal pl-1 pt-2">
							LAST UPDATED 05-05-2024
						</div>
					</div>
				</div>
			</div>

			<div className="flex bg-muted rounded-[20px] p-4 mt-6 max-w-[1000px] mx-auto flex-wrap">
				<div className="w-[40%] p-1">
					<div className="rounded-[20px] p-4 bg-background w-full ">
						<div className="flex flex-col items-start gap-2">
							<div
								className="rounded-full bg-red-600 flex gap-3 p-2 px-6 items-center justify-end"
								style={{
									width: `calc(60% + ${
										(35 * numMovies) / maxNum
									}%)`,
								}}
							>
								<Film className="text-white h-[42px] w-[42px]" />
								<div className="text-[48px] text-white font-bold tracking-tight">
									{
										mediaItem.filter(
											(item) =>
												item.analysis.type === 'movie',
										).length
									}
								</div>
							</div>
							<div
								className="rounded-full bg-blue-600 flex gap-3 p-2 px-6 items-center justify-end"
								style={{
									width: `calc(60% + ${
										(35 * numTv) / maxNum
									}%)`,
								}}
							>
								<Tv className="text-white h-[42px] w-[42px]" />
								<div className="text-[48px] text-white font-bold tracking-tight">
									{
										mediaItem.filter(
											(item) =>
												item.analysis.type === 'tv',
										).length
									}
								</div>
							</div>
							<div
								className="rounded-full bg-green-600 flex gap-3 p-2 px-6 items-center justify-end"
								style={{
									width: `calc(60% + ${
										(35 * numGames) / maxNum
									}%)`,
								}}
							>
								<Gamepad className="text-white h-[42px] w-[42px]" />
								<div className="text-[48px] text-white font-bold tracking-tight">
									{
										mediaItem.filter(
											(item) =>
												item.analysis.type === 'game',
										).length
									}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="w-[60%]  p-1">
					<div className="rounded-[20px] p-4 bg-background w-full ">
						<div className="w-full h-[200px]">
							<BarChart data={[]} />
						</div>
					</div>
				</div>
			</div>
			<BottomMenu />
		</div>
	)
}
