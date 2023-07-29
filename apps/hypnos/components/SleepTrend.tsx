'use client'
import { sortByDateString } from '../utils/findData'
import StreamChart from './StreamChart'

interface SleepTrendProps {
	data: any
	chartProps?: any
}

const SleepTrend = ({ data, chartProps }: SleepTrendProps) => {
	const parseDataToStreamChart = (data: any) => {
		data.sort(sortByDateString)
		const parsedData = data.map((d) => {
			return {
				'Deep Sleep': d.deep_sleep_duration || 0,
				'Light Sleep': d.light_sleep_duration || 0,
				'REM Sleep': d.rem_sleep_duration || 0,
				Awake: d.time_in_bed - d.total_sleep_duration || 0,
			}
		})
		return parsedData
	}
	return (
		<StreamChart
			data={parseDataToStreamChart(data)}
			chartProps={{
				keys: ['Deep Sleep', 'Light Sleep', 'REM Sleep', 'Awake'],
				...chartProps,
			}}
		/>
	)
}

export default SleepTrend
