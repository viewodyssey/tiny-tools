import { useDataContext } from '@/hooks/DataContext'
import ScatterChart from './ScatterChart'
import { Users } from 'lucide-react'

interface UsersChartProps {
	data: any[]
}

const UsersChart = ({ data }: UsersChartProps) => {
	const { loading } = useDataContext()
	const parseDataToScatterChart = (data: any) => {
		const parsedData = [
			{
				id: 'Main',
				data: data.map((d, idx) => {
					return {
						x: idx + 1,
						y: Number(
							d.users.replaceAll(',', '').replaceAll('+', ''),
						),
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
								<span className="flex items-center gap-2 basis-[60px]">
									<Users className="w-4 h-4" />
									Users
								</span>
								<span className="w-1/2">{node.formattedY}</span>
							</span>
						</div>
					)
				},
			}}
			loading={loading}
		/>
	)
}

export default UsersChart
