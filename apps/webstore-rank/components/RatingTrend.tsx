'use client'
import LineChart from './LineChart'

interface RatingTrendProps {
	data: any
	chartProps?: any
}

const RatingTrend = ({ data, chartProps }: RatingTrendProps) => {
	const parseDataToLineChart = (data: any) => {
		const parsedData = [
			{
				id: 'Main',
				data: data.map((d) => {
					return {
						x: new Date(d.date),
						y: d.rating.average || null,
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
				xScale: {
					type: 'time',
					precision: 'day',
				},
				axisBottom: {
					format: '%m-%d',
				},
				...chartProps,
			}}
		/>
	)
}

export default RatingTrend
