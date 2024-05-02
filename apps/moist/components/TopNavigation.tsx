'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { bebas } from '../app/fonts'
import MoistMeterLogo from '../assets/moistmeter.svg'

const NAV_ITEMS = [
	{
		href: '/movies',
		title: 'Movies',
	},
	{
		href: '/tv',
		title: 'TV',
	},
	{
		href: '/games',
		title: 'Games',
	},
	{
		href: '/about',
		title: 'About',
	},
]

export const TopNavigation = () => {
	const pathname = usePathname()
	console.log(pathname)
	return (
		<nav
			className={`h-full w-full flex justify-center md:max-w-full px-4 py-2 sticky top-0 bg-moist`}
		>
			<div className="flex justify-between max-w-[800px] w-full">
				<Link href="/">
					<div className="px-1 py-[2px] bg-moist">
						<Image src={MoistMeterLogo} alt="logo" />
					</div>
				</Link>
				<div
					className={`hidden lg:inline-flex gap-4 items-center ${bebas.className}`}
				>
					{NAV_ITEMS.map((item) => (
						<Link href={item.href}>
							<div
								className={`p-1 px-2 rounded-sm text-xl tracking-wide text-white/50 hover:text-white hover:underline underline-offset-8 ${
									pathname.replace('/moist-meter', '') ===
									item.href
										? 'text-white/100 underline'
										: ''
								}`}
							>
								{item.title}
							</div>
						</Link>
					))}
				</div>
			</div>
		</nav>
	)
}
