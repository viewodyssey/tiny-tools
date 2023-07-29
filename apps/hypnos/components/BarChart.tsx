'use client'
import { BarSvgProps } from '@nivo/bar'
import dynamic from 'next/dynamic'
import { Skeleton } from 'ui'

const ResponsiveBar = dynamic(
	() => import('@nivo/bar').then((m) => m.ResponsiveBar),
	{
		ssr: false,
	},
)

interface BarProps {
	data: any[]
	className?: string
	chartProps?: any
	loading?: boolean
}

const BarChart = ({ data, className, chartProps, loading }: BarProps) => {
	return (
		<div className={`w-full h-[300px] ${className}`}>
			{loading ? (
				<div className="py-4 h-full w-full">
					<Skeleton className="h-full w-full" />
				</div>
			) : (
				<ResponsiveBar
					data={data}
					colors={[
						'#457b9d',
						'#1d3557',
						'#a8dadc',
						'#e63946',
						'#f1faee',
					]}
					enableGridX={false}
					margin={{ top: 20, right: 10, bottom: 40, left: 30 }}
					{...chartProps}
				/>
			)}
		</div>
	)
}

export default BarChart
