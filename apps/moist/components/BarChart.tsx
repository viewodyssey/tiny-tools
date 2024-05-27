'use client'

import dynamic from 'next/dynamic'

const ResponsiveBar = dynamic(
	() => import('@nivo/bar').then((m) => m.ResponsiveBar),
	{
		ssr: false,
	},
)

const BarChart = ({ data, keys, indexBy }: any) => (
	<ResponsiveBar
		data={data ?? []}
		keys={
			keys ?? ['hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut']
		}
		indexBy={indexBy ?? 'rating'}
		margin={{ top: 10, right: 40, bottom: 70, left: 60 }}
		padding={0.3}
		valueScale={{ type: 'linear' }}
		indexScale={{ type: 'band', round: true }}
		colors={{ scheme: 'nivo' }}
		borderColor={{
			from: 'color',
			modifiers: [['darker', 1.6]],
		}}
		axisTop={null}
		axisRight={null}
		axisBottom={{
			tickSize: 5,
			tickPadding: 5,
			tickRotation: 0,
			legend: indexBy ? 'Year' : 'Rating',
			legendPosition: 'middle',
			legendOffset: 32,
		}}
		axisLeft={{
			tickSize: 5,
			tickPadding: 5,
			tickRotation: 0,
			legend: 'Number of media',
			legendPosition: 'middle',
			legendOffset: -40,
		}}
		labelTextColor={{
			from: 'color',
			modifiers: [['darker', 1.6]],
		}}
		role="application"
		ariaLabel="Nivo bar chart demo"
		tooltipLabel={(data) => `${data.indexValue}`}
	/>
)

export default BarChart
