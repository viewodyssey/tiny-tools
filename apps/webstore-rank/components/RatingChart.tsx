import { useDataContext } from '@/hooks/DataContext'
import ScatterChart from './ScatterChart'
import { Star } from 'lucide-react'

interface RatingChartProps {
	data: any[]
}

const RatingChart = ({ data }: RatingChartProps) => {
	const { loading, filters } = useDataContext()
	const parseDataToScatterChart = (data: any) => {
		const parsedData = [
			{
				id: 'Main',
				data: data.map((d, idx) => {
					return {
						x: idx + 1,
						y: filters.cumulative_rating
							? d.rating.average * d.rating.count
							: d.rating.average,
						name: d.name,
					}
				}),
			},
		]
		return parsedData
	}
	return (
		<ScatterChart
			data={parseDataToScatterChart(data)}
			chartProps={{
				axisBottom: {
					legend: 'Rank',
					legendOffset: 32,
					legendPosition: 'middle',
				},
				colors: ['#457b9d', '#a8dadc'],
				tooltip: ({ node }) => {
					return (
						<div className="bg-white px-3 py-2 rounded border-border border max-w-[240px]">
							<strong className="flex gap-1 items-start">
								<span className="text-textSecondary">{`${node.formattedX}.`}</span>
								<span className="truncate">{`${node.data.name}`}</span>
							</strong>
							<span className="text-sm flex gap-2 justify-between">
								<span className="flex items-center gap-2 basis-[120px] flex-shrink-0">
									<Star className="w-4 h-4" />
									{`${
										filters.cumulative_rating ? 'Total' : ''
									} Rating`}
								</span>
								<span className="w-1/2">
									{parseFloat(node.formattedY).toFixed(2)}
								</span>
							</span>
						</div>
					)
				},
			}}
			loading={loading}
		/>
	)
}

export default RatingChart
