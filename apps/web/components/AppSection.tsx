import { Button } from 'ui'
import { AppCard, AppCardItem } from './AppCard'
import ChromeRankImg from '@/assets/chromerank.png'
import RecapImg from '@/assets/videorecap.png'
import DemoedImg from '@/assets/idemoed.png'
import MoistImg from '@/assets/moist.png'

const APPS: AppCardItem[] = [
	{
		title: 'Chrome Extension Ranking',
		image: ChromeRankImg.src,
		href: '/chrome-extension',
		description:
			'View historical rankings and analytics for search terms and Chrome extensions. ',
	},
	{
		title: 'Video Recap',
		image: RecapImg.src,
		href: 'https://videorecap.viewodyssey.com',
		description:
			'View your YouTube year in review. 2M+ users, including YouTuber Ludwig Ahgren. ',
	},
	{
		title: 'I Demoed',
		image: DemoedImg.src,
		href: 'https://idemoed.vercel.app',
		description:
			'Showcase hexagon "I Demoed" stickers from physical and virtual hackathons. ',
	},
	{
		title: 'Moist Meter',
		image: MoistImg.src,
		href: 'https://viewodyssey.com/moist-meter',
		description:
			'Documents content creator penguinz0’s (MoistCr1TiKaL) David vs. Goliath journey of reviewing all media.',
	},
]

const AppSection = () => {
	return (
		<div className="w-full flex flex-col items-center my-16">
			<div className="flex flex-col gap-6 w-full">
				<h2 className="font-medium text-xl md:text-2xl">
					Visually-exciting apps.{' '}
				</h2>
				<div className="flex flex-wrap gap-2 w-full">
					{APPS.map((app, i) => (
						<AppCard item={app} key={i} />
					))}
				</div>
			</div>
		</div>
	)
}

export default AppSection
