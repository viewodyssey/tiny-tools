'use client'
import dynamic from 'next/dynamic'
import { Skeleton } from 'ui'

const ResponsiveStream = dynamic(
	() => import('@nivo/stream').then((m) => m.ResponsiveStream),
	{
		ssr: false,
	},
)

interface StreamProps {
	data: any[]
	className?: string
	chartProps?: any
	loading?: boolean
}

const StreamChart = ({ data, className, chartProps, loading }: StreamProps) => {
	return (
		<div className={`w-full h-[300px] ${className}`}>
			{loading ? (
				<div className="py-4 h-full w-full">
					<Skeleton className="h-full w-full" />
				</div>
			) : (
				<ResponsiveStream
					data={data}
					colors={['#457b9d', '#1d3557', '#a8dadc', '#f1faee']}
					enableGridX={false}
					curve="linear"
					offsetType="none"
					margin={{ top: 20, right: 10, bottom: 40, left: 30 }}
					{...chartProps}
				/>
			)}
		</div>
	)
}

export default StreamChart
