import Image from 'next/image'
import WaterIcon from '@/assets/water.svg'

const PosterItem = ({ video }: any) => {
	const { metadata } = video
	return (
		<div className="basis-1/2 max-w-1/2 xs:basis-1/3 xs:max-w-1/3 sm:max-w-1/4 sm:basis-1/4 md:basis-[160px] md:max-w-[160px] p-2">
			<div className="flex flex-col cursor-pointer group">
				<div
					style={{
						backgroundImage: `url(${
							metadata['cover_url'] ??
							`https://image.tmdb.org/t/p/w500/${metadata['poster_path']}`
						})`,
					}}
					className="w-full aspect-[2/3] bg-cover rounded-[5%] bg-center"
				>
					<div className="group-hover:bg-black/20 w-full h-full rounded-[5%]"></div>
				</div>
				<div className="pt-2 flex gap-1 items-center">
					<Image
						src={WaterIcon}
						className="h-[24px] w-[12px]"
						alt="water"
					/>
					<span className="font-semibold tracking-tight leading-tight">
						{video['analysis']['score']}%
					</span>
				</div>
				<h5 className="text-sm tracking-tight leading-tight">
					{video['title']}
				</h5>
			</div>
		</div>
	)
}

export default PosterItem
