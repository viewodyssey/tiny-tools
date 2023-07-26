import dynamic from 'next/dynamic'
import { Skeleton } from 'ui'

const ResponsiveScatterPlot = dynamic(
	() => import('@nivo/scatterplot').then((m) => m.ResponsiveScatterPlot),
	{
		ssr: false,
	},
)

interface ScatterProps {
	data: any[]
	chartProps?: any
	loading?: boolean
}

const props = {
	margin: { top: 40, right: 20, bottom: 40, left: 60 },
	spacing: 8,
}

const ScatterChart = ({ data, chartProps, loading }: ScatterProps) => {
	return (
		<div className="w-full h-[400px]">
			{loading ? (
				<div className="py-4 h-full w-full">
					<Skeleton className="h-full w-full" />
				</div>
			) : (
				<ResponsiveScatterPlot data={data} {...props} {...chartProps} />
			)}
		</div>
	)
}

export default ScatterChart
