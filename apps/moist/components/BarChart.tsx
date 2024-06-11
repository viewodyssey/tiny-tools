'use client'

import dynamic from 'next/dynamic'

const ResponsiveBar = dynamic(
	() => import('@nivo/bar').then((m) => m.ResponsiveBar),
	{
		ssr: false,
	},
)

const ID_TO_LABEL_MAP = {
	tv: 'TV',
	movie: 'Movies',
	game: 'Games',
}

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
		colors={['#16a34a', '#dc2626', '#2563eb']}
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
			modifiers: [['brighter', 10]],
		}}
		role="application"
		ariaLabel="Nivo bar chart demo"
		tooltipLabel={(data) => {
			return `${data.indexValue}${
				Object.keys(ID_TO_LABEL_MAP).includes(String(data.id))
					? ` ${ID_TO_LABEL_MAP[data.id]}`
					: ''
			}`
		}}
	/>
)

export default BarChart
