import { buttonVariants, Skeleton } from 'ui'
import { ShoppingBag, TextCursorInput } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { BASEPATH } from '../utils/misc'
import { useEffect, useState } from 'react'

const SIDEBAR_ITEMS = [
	{
		title: 'New search',
		href: '/',
		icon: <MagnifyingGlassIcon className="mr-2 w-4 h-4" />,
	},
	{
		title: 'Search terms',
		href: '/search',
		icon: <TextCursorInput size={16} className="mr-2" />,
	},
	{
		title: 'Extension',
		href: '/item',
		icon: <ShoppingBag size={16} className="mr-2" />,
	},
]

const SidebarItems = () => {
	const pathname = usePathname()
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	return (
		<div className="mt-16">
			<div className="flex flex-col gap-1">
				{SIDEBAR_ITEMS.map((item, i) => {
					return (
						<Link
							key={i}
							href={item.href}
							className={`${buttonVariants({
								variant: 'ghost',
							})} !justify-start !px-2 ${
								isMounted &&
								(pathname === BASEPATH
									? BASEPATH
									: pathname.replace(BASEPATH, '')
								).includes(
									item.href === '/' ? BASEPATH : item.href,
								)
									? 'text-textPrimary bg-hover'
									: 'text-textSecondary'
							}`}
						>
							{item.icon}
							<span>{item.title}</span>
						</Link>
					)
				})}
			</div>
		</div>
	)
}

export default SidebarItems
