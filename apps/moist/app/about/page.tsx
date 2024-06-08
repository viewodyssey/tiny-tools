'use client'
import { BottomMenu } from '@/components/BottomMenu'
import WaterIcon from '@/assets/white-moist.svg'
import SplashImage from '@/assets/extensionSplash.jpg'
import { TopNavigation } from '@/components/TopNavigation'
import Image from 'next/image'
import { Film, Gamepad, Tv } from 'lucide-react'
import {
	filterValidMedia,
	getScoreRangeData,
	getUploadYearCategoryData,
	getUploadYearData,
} from '../../utils/utils'
import BarChart from '../../components/BarChart'
import Link from 'next/link'
import { Button } from 'ui'

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
	console.log('pepe', getUploadYearCategoryData())
	return (
		<div className="h-full w-full">
			<TopNavigation />
			<div className="pb-8 max-w-[800px] mx-auto">
				<div className="text-[30px] lg:text-[44px] font-semibold tracking-tight leading-[1.1] flex flex-col gap-10 w-full pt-12 px-2">
					<p>
						<span className="inline-block w-6 h-6 lg:w-8 lg:h-8 bg-moist rounded mr-1 lg:mr-4">
							<Image
								src={WaterIcon}
								className="h-[12px] lg:h-[20px] w-[14px] mx-auto my-[6px]"
								alt="water"
							/>
						</span>
						One man takes on the movie and gaming industry, one
						review at a time.{' '}
						<span className="text-gray-400">
							The Moist Meter documents content creator
							penguinz0’s David vs. Goliath journey.
						</span>
					</p>
					{/* <p className="text-gray-400">
						Each piece of media he consumes is rated on a scale
						known as the Moist Meter. These ratings are revered, as
						professionals wait in baited breath for their creations
						to be reviewed.{' '}
					</p> */}
					<p className="text-gray-400">
						With too much time on my hands, I (
						<Link
							href="https://x.com/yihonganthony"
							target="_blank"
							rel="noopener noreferrer"
							className="underline hover:text-blue-500"
						>
							@eightants
						</Link>
						) decided to document each Moist Meter on a Rotten
						Tomatoes-like site to discover trends.{' '}
					</p>
					<p>
						<span className="text-gray-400">
							I also built the Moist Meter extension, which brings
							the scores to you on the web:{' '}
						</span>
						the ratings everyone deserves.{' '}
					</p>

					<div className="flex flex-col lg:flex-row gap-8 items-center w-full">
						<div className="w-full lg:w-1/2 flex flex-col gap-2">
							<h4 className="text-[30px] lg:text-[44px] font-semibold tracking-tight leading-[1.1]">
								Get the extension
							</h4>
							<p className="text-base font-normal tracking-tight text-gray-600">
								Add the coveted Moist Meter ratings on Google,
								Rotten Tomatoes, and IMDB.
							</p>
							<div className="w-full lg:w-auto">
								<Link
									href="https://chromewebstore.google.com/detail/moist-meter/fkjclkbcfieknijloglaflnkdekgccna"
									target="_blank"
									rel="noopener noreferrer"
								>
									<Button className="w-full lg:w-auto">
										Install
									</Button>
								</Link>
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

					<div>
						<p>To date, there has been: </p>
						<div className="text-sm font-medium tracking-normal pl-1 pt-2">
							LAST UPDATED 05-05-2024
						</div>
					</div>
				</div>
			</div>

			<div className="flex bg-muted rounded-[20px] p-4 mt-6 max-w-[1000px] mx-auto flex-wrap">
				<div className="lg:w-[40%] w-full p-1">
					<div className="rounded-[20px] p-4 bg-background w-full ">
						<div className="flex flex-col items-start gap-2 h-[300px]">
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
				<div className="lg:w-[60%] w-full  p-1">
					<div className="rounded-[20px] p-4 bg-background w-full ">
						<div className="w-full h-[300px]">
							<div className="font-semibold text-lg pl-2">
								Number of Moist Meters over the years
							</div>
							<BarChart
								data={getUploadYearData()}
								keys={['score']}
								indexBy={'year'}
							/>
						</div>
					</div>
				</div>

				<div className=" w-full  p-1">
					<div className="rounded-[20px] p-4 bg-background w-full ">
						<div className="w-full h-[300px]">
							<div className="font-semibold text-lg pl-2">
								Moist Meter Scores
							</div>
							<BarChart
								data={getScoreRangeData()}
								keys={['score']}
							/>
						</div>
					</div>
				</div>
			</div>

			<div className="py-8 max-w-[800px] mx-auto">
				<div className="w-full lg:w-1/2 flex flex-col gap-2">
					<h4>How it works</h4>
					<p className="text-base font-normal tracking-tight text-gray-600">
						Data about the Moist Meter videos were obtained from the
						penguinz0 YouTube channel. The titles for each review
						were cross referenced with The Movie Database and Moby
						Games to get metadata about the media.
					</p>
					<p className="text-base font-normal tracking-tight text-gray-600">
						{`Charlie's rating and review from the video was extracted
						through AI and summarized to provide quick information
						at a glance.`}
					</p>
					<div className="w-full lg:w-auto pt-4">
						<Button className="w-full lg:w-auto">
							View on Github
						</Button>
					</div>
				</div>
			</div>
			<BottomMenu />
		</div>
	)
}
