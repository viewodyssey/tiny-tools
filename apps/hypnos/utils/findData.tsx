export const findMostRecentSleep = (data: any[]) => {
	return data
		.sort(sortByDateString)
		.reverse()
		.find((d) => d.type === 'long_sleep')
}

export const toHoursAndMinutes = (totalSeconds) => {
	const totalMinutes = Math.floor(totalSeconds / 60)

	const hours = Math.floor(totalMinutes / 60)
	const minutes = totalMinutes % 60

	return `${hours}h ${minutes}m`
}

export function sortByDateString(a, b) {
	if (a.day < b.day) {
		return -1
	}
	if (a.day > b.day) {
		return 1
	}
	return 0
}
