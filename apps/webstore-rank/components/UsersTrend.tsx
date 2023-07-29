'use client'
import LineChart from './LineChart'

interface UsersTrendProps {
	data: any
	chartProps?: any
}

const UsersTrend = ({ data, chartProps }: UsersTrendProps) => {
	const parseDataToLineChart = (data: any) => {
		const parsedData = [
			{
				id: 'Main',
				data: data.map((d) => {
					return {
						x: new Date(d.date),
						y: d.users || null,
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

export default UsersTrend
