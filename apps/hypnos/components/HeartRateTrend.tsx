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
						x: d.bedtime_start.split('T')[0],
						y: d.value || null,
					}
				}),
			},
		]
		console.log(parsedData)
		return parsedData
	}
	return (
		<LineChart
			data={parseDataToLineChart(data)}
			chartProps={{
				colors: ['#457b9d', '#a8dadc'],
				xScale: {
					format: '%Y-%m-%d',
					type: 'time',
					precision: 'day',
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
