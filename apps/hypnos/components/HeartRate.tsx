'use client'
import LineChart from './LineChart'

interface HeartRateProps {
	data: any
}

const HeartRate = ({ data }: HeartRateProps) => {
	const parseDataToLineChart = (data: any) => {
		const sleepStartTime = new Date(data.timestamp)
		const parsedData = [
			{
				id: 'Main',
				data: data.items.map((d, idx) => {
					return {
						x: new Date(
							sleepStartTime.getTime() +
								idx * data.interval * 1000,
						),
						y: d,
					}
				}),
			},
		]
		return parsedData
	}
	return (
		<LineChart
			data={parseDataToLineChart(data)}
			chartProps={{
				colors: ['#457b9d', '#a8dadc'],
				xScale: {
					type: 'time',
					precision: 'millisecond',
				},
				axisBottom: {
					format: '%H:%M',
					legend: 'Time',
					legendOffset: -12,
					// tickValues: 'every 15 minutes',
				},
			}}
		/>
	)
}

export default HeartRate
