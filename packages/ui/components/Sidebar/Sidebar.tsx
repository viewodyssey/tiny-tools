import { TinyToolsWordmark } from '../random'

interface SidebarProps {
	children?: React.ReactNode
	sidebarUrl?: string
}

export const Sidebar = ({ children, sidebarUrl }: SidebarProps) => {
	return (
		<div className="w-[240px] basis-[240px] flex-shrink-0 flex-grow-0 bg-background border-r border-border border-solid py-4 px-4">
			<a href={sidebarUrl || 'https://viewodyssey.com/tools'}>
				<div className="w-full max-w-[150px] pl-2">
					<TinyToolsWordmark />
				</div>
			</a>
			{children}
		</div>
	)
}
