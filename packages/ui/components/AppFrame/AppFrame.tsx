'use client'
import { useEffect, useState } from 'react'
import { Sidebar } from '../Sidebar/Sidebar'
import { Button } from '../ui/button'
import { Menu } from 'lucide-react'
import { GitHubLogoIcon } from '@radix-ui/react-icons'

interface AppFrameProps {
	sidebarChildren?: React.ReactNode
	topbarChildren?: React.ReactNode
	topRightChildren?: React.ReactNode
	children?: React.ReactNode
	sidebarUrl?: string
}

export const AppFrame = ({
	children,
	sidebarChildren,
	topbarChildren,
	topRightChildren,
	sidebarUrl,
}: AppFrameProps) => {
	const [isVisible, setVisible] = useState(true)

	const resize = () => {
		const currentShowNav = window.innerWidth > 640
		setVisible(currentShowNav)
	}

	useEffect(() => {
		window.addEventListener('resize', resize)
		resize()

		return () => window.removeEventListener('resize', resize)
	}, [])

	return (
		<div className="w-full max-w-screen h-screen flex">
			{isVisible && (
				<Sidebar sidebarUrl={sidebarUrl}>{sidebarChildren}</Sidebar>
			)}
			<div
				className={`h-full w-full flex flex-col ${
					isVisible ? `md:max-w-[calc(100%-240px)]` : `md:max-w-full`
				}`}
			>
				<div className="w-full bg-background h-[48px] border-b border-border border-solid flex items-center px-4">
					<div className="flex gap-4 justify-between w-full px-2">
						<div className="flex items-center gap-4">
							<Button
								variant="ghost"
								size="icon"
								onClick={() => setVisible((prev) => !prev)}
							>
								<Menu size={16} />
							</Button>
							{topbarChildren}
						</div>
						{topRightChildren ? (
							topRightChildren
						) : (
							<Button
								variant="ghost"
								size="icon"
								className="text-textSecondary"
								onClick={() => setVisible((prev) => !prev)}
							>
								<GitHubLogoIcon className="w-4 h-4" />
							</Button>
						)}
					</div>
				</div>
				<div className="h-full overflow-auto py-2 pb-4 px-2 md:px-4">
					{children}
				</div>
			</div>
		</div>
	)
}
