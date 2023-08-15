import { AppFrame, CardFrame } from 'ui'
import SidebarItems from '@/components/SidebarItems'
import AppTopRight from '@/components/AppTopRight'
import { CommandBarChrome } from '@/components/CommandBarChrome'
import { AlertCircle } from 'lucide-react'

export default function NotFound() {
	return (
		<AppFrame
			sidebarChildren={<SidebarItems />}
			topbarChildren={<CommandBarChrome />}
			topRightChildren={<AppTopRight />}
		>
			<CardFrame className="w-full h-full overflow-auto">
				<div className="flex flex-col items-center justify-center gap-2 w-full h-full py-8">
					<div className="bg-gray-200 w-12 h-12 rounded flex items-center justify-center">
						<AlertCircle size={24} className="text-gray-500" />
					</div>
					<div className="max-w-[420px] text-textSecondary text-center">
						404 page not found.
					</div>
				</div>
			</CardFrame>
		</AppFrame>
	)
}
