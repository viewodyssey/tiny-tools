import { AppFrame, Button, CardFrame } from 'ui'
import sleepData from '@/scripts/downloads/oura_sleep_2023-07-28T02-30-23.json'
import HeartRate from '../components/HeartRate'
import HeartRateTrend from '../components/HeartRateTrend'

export default function Page() {
	const sleep = sleepData.sleep.slice(-30)
	return (
		<AppFrame>
			<CardFrame className="w-full overflow-auto">
				<HeartRate data={sleep[sleep.length - 2].heart_rate} />
			</CardFrame>
			<div className="flex flex-col md:flex-row gap-4 w-full relative">
				<div className="w-full md:w-[calc(50%-0.5rem)]  flex-grow-0 ">
					<CardFrame title="Heart Rate">
						<HeartRateTrend
							data={sleep.map((d) => ({
								...d,
								value: d.average_heart_rate,
							}))}
						/>
					</CardFrame>
				</div>
				<div className="w-full md:w-[calc(50%-0.5rem)] ">
					<CardFrame title="Breathing Variation">
						<HeartRateTrend
							data={sleep.map((d) => ({
								...d,
								value: d.average_breath,
							}))}
						/>
					</CardFrame>
				</div>
			</div>
			<div className="flex flex-col md:flex-row gap-4 w-full relative">
				<div className="w-full md:w-[calc(50%-0.5rem)]  flex-grow-0 ">
					<CardFrame title="Temperature">
						<HeartRateTrend
							data={sleep.map((d) => ({
								...d,
								value: d.readiness?.temperature_deviation,
							}))}
							chartProps={{
								yScale: {
									max: 2.5,
									min: -2,
									type: 'linear',
								},
							}}
						/>
					</CardFrame>
				</div>
				<div className="w-full md:w-[calc(50%-0.5rem)] ">
					<CardFrame title="Breathing Variation">
						<HeartRateTrend
							data={sleep.map((d) => ({
								...d,
								value: d.average_breath,
							}))}
						/>
					</CardFrame>
				</div>
			</div>
		</AppFrame>
	)
}
