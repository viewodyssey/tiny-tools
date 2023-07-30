import OdysseyIcon from '@/assets/odyssey_icon.svg'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { buttonVariants } from 'ui'

const Navbar = () => {
	return (
		<nav className="w-full bg-transparent flex justify-center pt-3 sticky top-0 z-20">
			<div className="flex border-border border rounded-full bg-card py-1.5 px-4 items-center gap-4 shadow-sm">
				<img src={OdysseyIcon.src} className="w-4 h-4" alt="" />
				<div className="flex gap-1">
					<Link
						href={'/tools'}
						className={`${buttonVariants({
							variant: 'ghost',
						})} !h-auto !px-3 !py-1.5 m-[1px] !rounded-full !text-gray-500 !font-normal hover:text-gray-700 hover:border-border hover:border hover:m-0`}
					>
						Tools
					</Link>
					<Link
						target="_blank"
						rel="noopener nofollow noreferrer"
						href={'https://videorecap.viewodyssey.com'}
						className={`${buttonVariants({
							variant: 'ghost',
						})} !h-auto !px-3 !py-1.5 m-[1px] !rounded-full !text-gray-500 !font-normal hover:text-gray-700 hover:border-border hover:border hover:m-0`}
					>
						Video Recap
					</Link>
					<Link
						target="_blank"
						rel="noopener nofollow noreferrer"
						href={'https://github.com/viewodyssey/tiny-tools'}
						className={`${buttonVariants({
							variant: 'ghost',
						})} !h-auto !px-3 !py-1.5 m-[1px] !rounded-full !text-gray-500 !font-normal hover:text-gray-700 hover:border-border hover:border hover:m-0`}
					>
						<span className="hidden md:inline">
							Contribute on Github
						</span>
						<GitHubLogoIcon className="w-4 h-4 md:hidden" />
					</Link>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
