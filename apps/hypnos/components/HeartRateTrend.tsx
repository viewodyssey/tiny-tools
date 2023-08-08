'use client'
import LineChart from './LineChart'

interface HeartRateProps {
	data: any
	chartProps?: any
}

const HeartRateTrend = ({ data, chartProps }: HeartRateProps) => {
	const parseDataToLineChart = (data: any) => {
		const parsedData = [
			{
				id: 'Main',
				data: data.map((d) => {
					return {
						x: new Date(d.bedtime_start),
						y: d.value || null,
					}
				}),
			},
		]
		console.debug(parsedData)
		return parsedData
	}
	return (
		<LineChart
			data={parseDataToLineChart(data)}
			chartProps={{
				xScale: {
					type: 'time',
					precision: 'millisecond',
				},
				axisBottom: {
					format: '%m-%d',
					legend: 'Day',
					legendOffset: -12,
				},
				...chartProps,
			}}
		/>
	)
}

export default HeartRateTrend
