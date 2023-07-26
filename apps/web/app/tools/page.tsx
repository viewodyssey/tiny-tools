import FrameWrapper from '@/components/FrameWrapper'
import { AppItem, ItemCard } from '@/components/ItemCard'
import { Chrome, Globe, Linkedin, ListOrdered } from 'lucide-react'
import { Metadata } from 'next'
import { CardFrame } from 'ui'

const headData = {
	title: 'Tiny Tools',
	description: 'Little apps with big impact. ',
}

export const metadata: Metadata = {
	title: headData.title,
	description: headData.description,
	openGraph: { title: headData.title, description: headData.description },
}

const APPS: AppItem[] = [
	{
		title: 'Chrome Extension Ranking',
		description:
			'View historical rankings and analytics for search terms and Chrome extensions. ',
		href: '/chrome-extension',
		icon: (
			<div className="w-full h-full flex items-center justify-center gap-2">
				<Chrome size={36} color="#0ea5e9" />
				<ListOrdered size={36} color="#0ea5e9" />
			</div>
		),
		color: 'bg-sky-100',
	},
	{
		title: 'LinkedIn Alumni',
		description:
			'Check-in on current and past members of organizatios, on steroids. ',
		href: '/chrome-extension',
		icon: (
			<div className="w-full h-full flex items-center justify-center gap-2">
				<Linkedin size={36} color="#3b82f6" />
				<Globe size={36} color="#3b82f6" />
			</div>
		),
		color: 'bg-blue-100',
	},
]

export default function Page() {
	return (
		<FrameWrapper>
			<CardFrame className="w-full h-full">
				<div className="flex w-full flex-wrap">
					{APPS.map((app, idx) => (
						<div
							className="md:w-1/4 px-2 pb-2 inline-block w-full"
							key={idx}
						>
							<ItemCard item={app} />
						</div>
					))}
				</div>
			</CardFrame>
		</FrameWrapper>
	)
}
