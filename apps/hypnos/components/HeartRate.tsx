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
			className="!h-[200px]"
			chartProps={{
				xScale: {
					type: 'time',
					precision: 'millisecond',
				},
				yScale: {
					type: 'linear',
					min:
						Math.min(...data.items.filter((n: any) => n != null)) -
						5,
				},
				axisBottom: {
					format: '%I %p',
					tickValues: 'every 2 hour',
					tickSize: 0,
				},
				colors: ['#e63946'],
				axisLeft: {
					tickSize: 0,
				},
				enablePoints: false,
			}}
		/>
	)
}

export default HeartRate
