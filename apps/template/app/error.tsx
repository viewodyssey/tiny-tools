'use client'
import { AppFrame, Button, CardFrame } from 'ui'
import { useEffect } from 'react'
import SidebarItems from '@/components/SidebarItems'
import { CommandBarChrome } from '@/components/CommandBarChrome'
import AppTopRight from '@/components/AppTopRight'
import { AlertCircle } from 'lucide-react'

export default function Error({
	error,
	reset,
}: {
	error: Error
	reset: () => void
}) {
	useEffect(() => {
		console.error(error)
	}, [error])

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
						Something went wrong!
					</div>

					<Button onClick={() => reset()}>Try again</Button>
				</div>
			</CardFrame>
		</AppFrame>
	)
}
