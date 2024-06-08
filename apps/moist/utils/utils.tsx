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

export const getScoreRangeData = () => {
	const scoreRangeStart = new Array(10).fill(0)
	const videos = filterValidMedia({})
	videos.forEach((video) => {
		const index = Math.floor(video.analysis.score / 10)
		scoreRangeStart[index] = scoreRangeStart[index] + 1
	})
	return scoreRangeStart.map((scoreCount, index) => ({
		rating: `${index * 10}-${index * 10 + 9}`,
		score: scoreCount,
	}))
}

export const getScoreRangeCategoryData = () => {
	let scoreToDataMap = new Array(10).fill({})
	const categories = ['tv', 'movie', 'game']
	categories.forEach((category) => {
		const scoreRangeStart = new Array(10).fill(0)
		if (category === 'other') {
			const videos = filterValidMedia({}).filter(
				(item) =>
					item.analysis.type !== 'tv' &&
					item.analysis.type !== 'movie' &&
					item.analysis.type !== 'game',
			)
			videos.forEach((video) => {
				const index = Math.floor(video.analysis.score / 10)
				scoreRangeStart[index] = scoreRangeStart[index] + 1
			})
			scoreToDataMap = scoreToDataMap.map((sData, index) => ({
				...sData,
				rating: `${index * 10}-${index * 10 + 9}`,
				[category]: scoreRangeStart[index],
			}))
		}

		const videos = filterValidMedia({ type: category as any })
		videos.forEach((video) => {
			const index = Math.floor(video.analysis.score / 10)
			scoreRangeStart[index] = scoreRangeStart[index] + 1
		})
		scoreToDataMap = scoreToDataMap.map((sData, index) => ({
			...sData,
			rating: `${index * 10}-${index * 10 + 9}`,
			[category]: scoreRangeStart[index],
		}))
	})

	return scoreToDataMap
}

export const getUploadYearData = () => {
	const uploadYearMap = {}
	const videos = filterValidMedia({})
	videos.forEach((video) => {
		const year = video.publishedAt.slice(0, 4)
		if (Object.keys(uploadYearMap).includes(year)) {
			uploadYearMap[year] += 1
		} else {
			uploadYearMap[year] = 0
		}
	})
	return Object.entries(uploadYearMap).map(([key, value]) => ({
		year: key,
		score: value,
	}))
}

export const getUploadYearCategoryData = () => {
	let yearToDataMap = {}
	const categories = ['tv', 'movie', 'game']
	categories.forEach((category) => {
		const uploadYearMap = {}
		if (category === 'other') {
			const videos = filterValidMedia({}).filter(
				(item) =>
					item.analysis.type !== 'tv' &&
					item.analysis.type !== 'movie' &&
					item.analysis.type !== 'game',
			)
			videos.forEach((video) => {
				const year = video.publishedAt.slice(0, 4)
				if (Object.keys(uploadYearMap).includes(year)) {
					uploadYearMap[year] += 1
				} else {
					uploadYearMap[year] = 0
				}
			})
			Object.entries(uploadYearMap).forEach(([key, value]) => {
				if (yearToDataMap[key]) {
					yearToDataMap[key] = {
						...yearToDataMap[key],
						...uploadYearMap[key],
					}
				} else {
					yearToDataMap[key] = {
						[category]: uploadYearMap[key],
					}
				}
			})
		}

		const videos = filterValidMedia({ type: category as any })
		videos.forEach((video) => {
			const year = video.publishedAt.slice(0, 4)
			if (Object.keys(uploadYearMap).includes(year)) {
				uploadYearMap[year] += 1
			} else {
				uploadYearMap[year] = 0
			}
		})

		Object.entries(uploadYearMap).forEach(([key, value]) => {
			if (yearToDataMap[key]) {
				yearToDataMap[key] = {
					...yearToDataMap[key],
					[category]: uploadYearMap[key],
				}
			} else {
				yearToDataMap[key] = {
					[category]: uploadYearMap[key],
				}
			}
		})
	})

	return Object.entries(yearToDataMap).map(([key, value]) => ({
		year: key,
		...(value as any),
	}))
}
