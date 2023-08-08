'use client'
import { AppFrame, CardFrame } from 'ui'
import HeartRate from '../components/HeartRate'
import HeartRateTrend from '../components/HeartRateTrend'
import { findMostRecentSleep, toHoursAndMinutes } from '../utils/findData'
import { useEffect, useMemo, useState } from 'react'
import InfoCard from '../components/InfoCard'
import { Bed, GaugeCircle, PlugZap } from 'lucide-react'
import SleepTrend from '../components/SleepTrend'
import TempTrend from '../components/TempTrend'

export default function Page() {
	const [sleep, setSleep] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			const resp = await fetch('/hypnos/api/data')
			const fetchedSleepData = await resp.json()
			console.debug(fetchedSleepData)
			setSleep(fetchedSleepData.sleep.slice(-30))
		}
		fetchData()
	}, [])

	const mostRecentSleep = useMemo(() => {
		return findMostRecentSleep(sleep) || {}
	}, [sleep])

	return (
		<AppFrame>
			<div className="flex flex-col md:flex-row md:justify-between md:items-center w-full pb-4">
				<div className="pt-2 pb-4 px-2 flex flex-col gap-1">
					<div className="uppercase text-xs">Your Sleep Report</div>
					<h3 className="font-semibold text-xl">
						{mostRecentSleep.day}
					</h3>
				</div>
			</div>
			<div className="flex flex-col gap-4 w-full">
				<div className="flex flex-col md:flex-row gap-4 w-full relative">
					<div className="md:w-[calc(20%-0.5rem)] flex-grow-0 flex flex-col gap-4">
						<InfoCard
							label="Sleep score"
							value={mostRecentSleep.score}
						/>{' '}
					</div>
					<div className="md:w-[calc(80%-0.5rem)] flex-grow-0 flex flex-col gap-4">
						<CardFrame className="w-full overflow-auto flex gap-8">
							<div className="flex flex-col gap-2">
								<h5 className="text-sm font-semibold">Awake</h5>
								<h3 className="text-xl">
									{toHoursAndMinutes(
										mostRecentSleep.time_in_bed -
											mostRecentSleep.total_sleep_duration,
									)}
								</h3>
							</div>
							<div className="flex flex-col gap-2">
								<h5 className="text-sm font-semibold">
									REM Sleep
								</h5>
								<h3 className="text-xl">
									{toHoursAndMinutes(
										mostRecentSleep.rem_sleep_duration,
									)}
								</h3>
							</div>
							<div className="flex flex-col gap-2">
								<h5 className="text-sm font-semibold">
									Light Sleep
								</h5>
								<h3 className="text-xl">
									{toHoursAndMinutes(
										mostRecentSleep.light_sleep_duration,
									)}
								</h3>
							</div>
							<div className="flex flex-col gap-2">
								<h5 className="text-sm font-semibold">
									Deep Sleep
								</h5>
								<h3 className="text-xl">
									{toHoursAndMinutes(
										mostRecentSleep.deep_sleep_duration,
									)}
								</h3>
							</div>
						</CardFrame>
					</div>
				</div>
				<div className="flex flex-col md:flex-row gap-4 w-full relative">
					<div className="md:w-[calc(20%-0.5rem)] flex-grow-0 flex flex-col gap-4">
						<InfoCard
							label="Time asleep"
							value={toHoursAndMinutes(
								mostRecentSleep.total_sleep_duration,
							)}
							icon={
								<PlugZap size={24} className="text-gray-500" />
							}
							bgClassName="bg-gray-100"
						/>
						<InfoCard
							label="Time in bed"
							value={toHoursAndMinutes(
								mostRecentSleep.time_in_bed,
							)}
							icon={<Bed size={24} className="text-gray-500" />}
							bgClassName="bg-gray-100"
						/>
						<InfoCard
							label="Sleep efficiency"
							value={`${mostRecentSleep.efficiency}%`}
							icon={
								<GaugeCircle
									size={24}
									className="text-gray-500"
								/>
							}
							bgClassName="bg-gray-100"
						/>
					</div>
					<div className="md:w-[calc(40%-0.5rem)] flex-grow-0">
						{Object.keys(mostRecentSleep).length && (
							<CardFrame
								className="w-full overflow-auto"
								header={
									<div className="flex flex-col gap-2">
										<h5 className="text-sm font-semibold">
											Heart Rate
										</h5>
										<div className="flex gap-2 items-end">
											<h3 className="text-3xl">
												{`${Math.min(
													...mostRecentSleep?.heart_rate?.items.filter(
														(n: any) => n != null,
													),
												)}-${Math.max(
													...mostRecentSleep?.heart_rate?.items.filter(
														(n: any) => n != null,
													),
												)}`}
											</h3>
											<span className="text-textSecondary text-lg">
												bpm
											</span>
										</div>
									</div>
								}
							>
								<HeartRate data={mostRecentSleep.heart_rate} />
							</CardFrame>
						)}
					</div>
					<div className="md:w-[calc(40%-0.5rem)] flex-grow-0">
						{Object.keys(mostRecentSleep).length && (
							<CardFrame
								className="w-full overflow-auto"
								header={
									<div className="flex flex-col gap-2">
										<h5 className="text-sm font-semibold">
											HRV
										</h5>
										<div className="flex gap-2 items-end">
											<h3 className="text-3xl">
												{`${Math.min(
													...mostRecentSleep?.hrv?.items.filter(
														(n: any) => n != null,
													),
												)}-${Math.max(
													...mostRecentSleep?.hrv?.items.filter(
														(n: any) => n != null,
													),
												)}`}
											</h3>
											<span className="text-textSecondary text-lg">
												ms
											</span>
										</div>
									</div>
								}
							>
								<HeartRate data={mostRecentSleep.hrv} />
							</CardFrame>
						)}
					</div>
				</div>

				<div className="flex flex-col md:flex-row md:justify-between md:items-center w-full pt-4">
					<div className="py-2 px-2 flex flex-col gap-1">
						<h3 className="font-semibold text-xl">Sleep Trends</h3>
					</div>
				</div>
				<div className="flex flex-col md:flex-row gap-4 w-full relative">
					<div className="w-full md:w-[calc(50%-0.5rem)]  flex-grow-0 ">
						<CardFrame title="Score">
							<HeartRateTrend
								data={sleep.map((d) => ({
									...d,
									value: d.score,
								}))}
							/>
						</CardFrame>
					</div>
					<div className="w-full md:w-[calc(50%-0.5rem)] ">
						<CardFrame title="Sleep">
							<SleepTrend data={sleep} />
						</CardFrame>
					</div>
				</div>
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
						<CardFrame title="HRV">
							<HeartRateTrend
								data={sleep.map((d) => ({
									...d,
									value: d.average_hrv,
								}))}
							/>
						</CardFrame>
					</div>
				</div>
				<div className="flex flex-col md:flex-row gap-4 w-full relative">
					<div className="w-full md:w-[calc(50%-0.5rem)]  flex-grow-0 ">
						<CardFrame title="Temperature">
							<TempTrend
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
			</div>
		</AppFrame>
	)
}
