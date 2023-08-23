'use client'
import { buttonVariants, Skeleton } from 'ui'
import { ShoppingBag, TextCursorInput } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { BASEPATH } from '../utils/misc'
import { useEffect, useState } from 'react'
import { useDataContext } from '../hooks/DataContext'
import { generateSegmentUrl } from '../utils/segment'

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
	const { userAccount } = useDataContext()

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
			{userAccount.segments ? (
				<div className="flex flex-col pt-6 gap-1">
					<h5 className="text-textSecondary text-xs font-semibold px-2 pb-1">
						Saved
					</h5>
					{userAccount.segments.map((segment, idx) => {
						return (
							<Link
								key={idx}
								href={generateSegmentUrl(segment)}
								className={`${buttonVariants({
									variant: 'ghost',
								})} !justify-start !px-2 w-full ${
									isMounted &&
									pathname.includes(
										generateSegmentUrl(segment),
									)
										? 'text-textPrimary bg-hover'
										: 'text-textSecondary'
								}`}
							>
								{segment.type === 'item' ? (
									<ShoppingBag size={16} className="mr-2" />
								) : (
									<TextCursorInput
										size={16}
										className="mr-2"
									/>
								)}
								<span className="w-full truncate">
									{segment.name}
								</span>
							</Link>
						)
					})}
				</div>
			) : userAccount.email ? (
				<div className="flex flex-col pt-6 gap-2">
					<Skeleton className="w-12 h-4" />
					{Array.from(new Array(3)).map((_, idx) => {
						return <Skeleton className="w-10/12 h-6" key={idx} />
					})}
				</div>
			) : (
				<></>
			)}
		</div>
	)
}

export default SidebarItems
