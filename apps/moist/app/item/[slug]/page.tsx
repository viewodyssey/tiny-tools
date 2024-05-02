'use client'
import { BottomMenu } from '@/components/BottomMenu'
import { TopNavigation } from '@/components/TopNavigation'
import Image from 'next/image'
import { findMedia } from '../../../utils/utils'
import WaterIcon from '@/assets/white-moist.svg'
import CharlieImage from '@/assets/charlie.png'
import { Button } from 'ui'
import Link from 'next/link'

export default function Page({ params }: { params: { slug: string } }) {
	const data = findMedia(params.slug)

	if (!data) {
		return null
	}

	const date =
		data.metadata.release_date ??
		data.metadata.first_air_date ??
		data.publishedAt
	const dateSplit = date.split('-')[0].split(',')
	const publishedDateSplit = data.publishedAt.split('-')[0]

	return (
		<div className="h-full w-full">
			<TopNavigation />
			<div className="pb-8">
				<div className="flex gap-8 w-full max-w-[800px] mx-auto py-2 mt-8 px-2">
					<div className="hidden lg:inline-flex lg:max-w-[250px] w-full flex-col gap-4">
						<div
							style={{
								backgroundImage: `url(${
									data.metadata['cover_url'] ??
									`https://image.tmdb.org/t/p/w500/${data.metadata['poster_path']}`
								})`,
							}}
							className="w-full aspect-[2/3] bg-cover rounded-[5%] bg-center h-[200px] lg:h-[250px]"
						>
							<div className="group-hover:bg-black/20 transition-all w-full h-full rounded-[5%]"></div>
						</div>
						<div>
							<Link
								href={`https://www.youtube.com/watch?v=${data.videoId}`}
								target="_blank"
								rel="noopener noreferrer"
							>
								<Button className="w-full">
									Watch Moist Meter
								</Button>
							</Link>

							<div className="flex flex-col mt-2 gap-2">
								{data['analysis']['type'] !== 'game' && (
									<>
										<Link
											href={`https://www.youtube.com/watch?v=${data.videoId}`}
											target="_blank"
											rel="noopener noreferrer"
										>
											<Button
												variant="outline"
												className="w-full"
											>
												IMDB
											</Button>
										</Link>

										<Link
											href={`https://www.youtube.com/watch?v=${data.videoId}`}
											target="_blank"
											rel="noopener noreferrer"
										>
											<Button
												variant="outline"
												className="w-full"
											>
												Rotten Tomatoes
											</Button>
										</Link>
									</>
								)}

								{data['analysis']['type'] === 'game' && (
									<>
										<Link
											href={`https://www.youtube.com/watch?v=${data.videoId}`}
											target="_blank"
											rel="noopener noreferrer"
										>
											<Button
												variant="outline"
												className="w-full"
											>
												Metacritic
											</Button>
										</Link>
										<Link
											href={`https://www.youtube.com/watch?v=${data.videoId}`}
											target="_blank"
											rel="noopener noreferrer"
										>
											<Button
												variant="outline"
												className="w-full"
											>
												Gamespot
											</Button>
										</Link>
									</>
								)}
							</div>
						</div>
					</div>
					<div className="flex-col flex gap-4 items-center">
						<div className="flex-col flex gap-4 items-center lg:flex-row lg:items-start lg:gap-8 w-full lg:hidden">
							<div className="flex-col flex items-center max-w-[150px] lg:max-w-[200px]">
								<div
									style={{
										backgroundImage: `url(${
											data.metadata['cover_url'] ??
											`https://image.tmdb.org/t/p/w500/${data.metadata['poster_path']}`
										})`,
									}}
									className="w-full aspect-[2/3] bg-cover rounded-[5%] bg-center h-[200px] lg:h-[250px]"
								>
									<div className="group-hover:bg-black/20 transition-all w-full h-full rounded-[5%]"></div>
								</div>
								<h4 className="font-semibold mt-4 text-center leading-tight text-lg lg:hidden">
									{data.title}
								</h4>
								<div className="lg:hidden">
									{dateSplit[dateSplit.length - 1]}
								</div>
							</div>
						</div>
						<div className="flex gap-3 items-center lg:hidden">
							<Image
								src={WaterIcon}
								className="h-[36px] w-[18px]"
								alt="water"
							/>
							<span className="text-3xl font-semibold tracking-tight leading-tight">
								{data['analysis']['score']}%
							</span>
						</div>
						<div className="hidden lg:flex gap-8 w-full items-start justify-between">
							<div>
								<h4 className="font-semibold mt-4 leading-tight text-3xl mb-2 max-w-[400px]">
									{data.title}
								</h4>
								<div>{dateSplit[dateSplit.length - 1]}</div>
							</div>
							<div className="bg-moist rounded-lg px-3 py-1 self-center flex items-center gap-2 lg:gap-3">
								<Image
									src={WaterIcon}
									className="h-[36px] w-[18px]"
									alt="water"
								/>
								<span className="text-3xl font-semibold tracking-tight leading-tight text-white">
									{data['analysis']['score']}
								</span>
							</div>
						</div>
						{data['metadata']['overview'] && (
							<p className="hidden lg:block text-sm py-2">
								{data['metadata']['overview']}
							</p>
						)}
						<div className="mt-4 bg-muted w-full rounded p-3 px-4 flex flex-col gap-1">
							<div className="flex gap-2 items-center lg:pb-2 lg:gap-4">
								<Image
									src={CharlieImage}
									alt=""
									className="h-[40px] w-[40px]"
								/>
								<div>
									<div className="font-semibold text-sm lg:text-base">
										Crit1kal Consensus
									</div>
									<div className="text-xs lg:text-sm">
										Reviewed {publishedDateSplit}
									</div>
								</div>
							</div>
							<p className="text-sm">
								{data['analysis']['summary']}
							</p>
						</div>
						{data['metadata']['overview'] && (
							<div className="mt-4 w-full rounded p-2 flex flex-col gap-1 lg:hidden">
								<div className="flex gap-2 items-center">
									<div className="font-semibold text-sm">
										About
									</div>
								</div>
								<p className="text-sm">
									{data['metadata']['overview']}
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
			<BottomMenu />
		</div>
	)
}
