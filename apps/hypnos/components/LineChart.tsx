'use client'
import dynamic from 'next/dynamic'
import { Skeleton } from 'ui'

const ResponsiveLine = dynamic(
	() => import('@nivo/line').then((m) => m.ResponsiveLine),
	{
		ssr: false,
	},
)

interface LineProps {
	data: any[]
	chartProps?: any
	loading?: boolean
}

const props = {
	margin: { top: 40, right: 20, bottom: 40, left: 60 },
	spacing: 8,
}

const LineChart = ({ data, chartProps, loading }: LineProps) => {
	return (
		<div className="w-full h-[400px]">
			{loading ? (
				<div className="py-4 h-full w-full">
					<Skeleton className="h-full w-full" />
				</div>
			) : (
				<ResponsiveLine data={data} {...props} {...chartProps} />
			)}
		</div>
	)
}

export default LineChart
