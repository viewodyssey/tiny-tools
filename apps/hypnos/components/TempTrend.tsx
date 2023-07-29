'use client'
import { sortByDateString } from '../utils/findData'
import BarChart from './BarChart'

interface TempTrendProps {
	data: any
	chartProps?: any
}

const TempTrend = ({ data, chartProps }: TempTrendProps) => {
	const parseDataToBarChart = (data: any) => {
		const parsedData = data.map((d) => {
			return {
				temperature: d.readiness.temperature_deviation || 0,
				day: d.day,
			}
		})
		parsedData.sort(sortByDateString)
		return parsedData
	}
	return (
		<BarChart
			data={parseDataToBarChart(data)}
			chartProps={{
				keys: ['temperature'],
				indexBy: 'day',
				axisBottom: null,
				enableLabel: false,
				...chartProps,
			}}
		/>
	)
}

export default TempTrend
