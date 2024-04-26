import VIDEOS from '@/data/videoData.json'

export const filterValidMedia = ({
	type,
	sort = 'uploadDate',
}: {
	type?: 'movie' | 'tv' | 'game'
	sort?: 'uploadDate' | 'releaseDate' | 'score'
}) => {
	const nonEmptyData = VIDEOS.videos
		.filter(
			(video) =>
				Object.keys(video.metadata).length > 0 &&
				video.analysis.score &&
				video.videoId,
		)
		.filter(
			(video) => video.metadata.poster_path || video.metadata.cover_url,
		)
	if (sort === 'uploadDate') {
		nonEmptyData.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
	} else if (sort === 'releaseDate') {
		nonEmptyData.sort((a, b) =>
			!a.metadata.release_date
				? 1
				: !b.metadata.release_date
				? -1
				: new Date(a.metadata.release_date) <
				  new Date(b.metadata.release_date)
				? 1
				: -1,
		)
	} else {
		nonEmptyData.sort((a, b) =>
			a.analysis.score < b.analysis.score ? 1 : -1,
		)
	}

	return type
		? nonEmptyData.filter((video) => video.analysis.type === type)
		: nonEmptyData
}

export const findMedia = (videoId: string) => {
	return filterValidMedia({}).find((item) => item.videoId === videoId)
}
