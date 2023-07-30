'use client'
import { LineSvgProps } from '@nivo/line'
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
	className?: string
	chartProps?: Partial<LineSvgProps>
	loading?: boolean
}

const theme = {
	axis: {
		ticks: {
			line: {
				stroke: '#ccc',
			},
			text: {
				fill: '#888',
			},
		},
	},
	grid: {
		line: {
			stroke: '#ccc',
			strokeWidth: 1,
		},
	},
}

const LineChart = ({ data, className, chartProps, loading }: LineProps) => {
	return (
		<div className={`w-full h-[300px] ${className}`}>
			{loading ? (
				<div className="py-4 h-full w-full">
					<Skeleton className="h-full w-full" />
				</div>
			) : (
				<ResponsiveLine
					data={data}
					useMesh={true}
					colors={[
						'#457b9d',
						'#1d3557',
						'#a8dadc',
						'#e63946',
						'#f1faee',
					]}
					enableGridX={false}
					gridYValues={[0]}
					theme={theme}
					margin={{ top: 20, right: 10, bottom: 40, left: 30 }}
					{...chartProps}
				/>
			)}
		</div>
	)
}

export default LineChart
