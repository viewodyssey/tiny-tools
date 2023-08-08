'use client'
import { useMemo } from 'react'
import { useDataContext } from '../hooks/DataContext'
import { sortByDateString } from '../utils/sort'
import LineChart from './LineChart'

interface RatingTrendProps {
	data: any
	chartProps?: any
}

const RatingTrend = ({ data, chartProps }: RatingTrendProps) => {
	const { loading, filters } = useDataContext()
	const parsedData = useMemo(() => {
		const startDate = new Date()
		startDate.setDate(startDate.getDate() - filters.time_frame)
		const sortedData = data.sort(sortByDateString).reverse()
		const fillInData = []
		Array.from(Array(filters.time_frame).keys()).map(() => {
			const index = sortedData.findIndex((d) => {
				return new Date(d.date).getTime() < startDate.getTime()
			})
			startDate.setDate(startDate.getDate() + 1)
			if (index !== -1) {
				fillInData.push({
					x: new Date(startDate.getTime()),
					y: data[index]?.rating.average || null,
				})
			}
		})
		const returnData = [
			{
				id: 'Main',
				data: fillInData,
			},
		]
		return returnData
	}, [data, filters.time_frame])

	return (
		<LineChart
			data={parsedData}
			chartProps={{
				xScale: {
					type: 'time',
					precision: 'day',
				},
				axisBottom: {
					format: '%e %b',
					tickValues: 2,
				},
				axisLeft: { tickSize: 0, tickValues: [1, 2, 3, 4, 5] },
				enablePoints: false,
				tooltip: ({ point }) => {
					const dateStringArray = new Date(point.data.xFormatted)
						.toDateString()
						.split(' ')
					return (
						<div className="bg-white px-3 py-2 rounded border-border border w-[160px] max-w-[160px]">
							<h3 className="flex gap-1 items-start text-sm">
								Rating
							</h3>
							<div className="text-sm flex gap-2 justify-between w-full pt-1">
								<div className="flex items-center gap-2 basis-[100px]">
									{`${dateStringArray[1]} ${dateStringArray[2]}`}
								</div>
								<span>
									{Number(point.data.yFormatted).toFixed(2)}
								</span>
							</div>
						</div>
					)
				},
				...chartProps,
			}}
			className="!h-[200px]"
			loading={loading}
		/>
	)
}

export default RatingTrend
