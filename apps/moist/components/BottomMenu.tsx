import { Film, Gamepad, Home, Info, Tv } from 'lucide-react'
import Link from 'next/link'

const MENU_ITEMS = [
	{
		href: '/',
		title: 'Home',
		icon: <Home size={20} />,
	},
	{
		href: '/movies',
		title: 'Movies',
		icon: <Film size={20} />,
	},
	{
		href: '/tv',
		title: 'TV',
		icon: <Tv size={20} />,
	},
	{
		href: '/games',
		title: 'Games',
		icon: <Gamepad size={20} />,
	},
	{
		href: '/about',
		title: 'About',
		icon: <Info size={20} />,
	},
]

export const BottomMenu = () => {
	const urlPath = window.location.pathname.replace('/moist-meter', '')

	return (
		<div className="flex w-full sticky bottom-0 bg-background gap-2 justify-between p-2 md:hidden border-t border-input">
			{MENU_ITEMS.map((item, i) => {
				return (
					<Link
						key={i}
						href={item.href}
						className={`flex flex-col text-textSecondary items-center px-2 p-1 gap-1 hover:bg-hover rounded hover:text-textPrimary w-[60px] ${
							urlPath === item.href ? 'text-moist' : ''
						}`}
					>
						<div>{item.icon}</div>
						<div className="text-xs font-medium">{item.title}</div>
					</Link>
				)
			})}
		</div>
	)
}
