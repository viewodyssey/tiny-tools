'use client'
import { useState } from 'react'
import { AppFrame, Button, CardFrame } from 'ui'
import AppTopRight from '@/components/AppTopRight'
import { CommandBarChrome } from '@/components/CommandBarChrome'
import SidebarItems from '@/components/SidebarItems'
import { DatabaseBackup, Loader2 } from 'lucide-react'

const UtilPage = () => {
	const [loading, setLoading] = useState(false)

	const getData = async () => {
		setLoading(true)
		const res = await (
			await fetch(`/chrome-extension/api/search/update`)
		).json()
		setLoading(false)
	}
	return (
		<AppFrame
			sidebarChildren={<SidebarItems />}
			topbarChildren={<CommandBarChrome />}
			topRightChildren={<AppTopRight />}
		>
			<CardFrame className="w-full h-full overflow-auto">
				<div className="flex flex-col items-center justify-center gap-2 w-full h-full py-8">
					<div className="max-w-[420px] text-textSecondary text-center">
						Settings
					</div>
					<Button onClick={() => getData()}>
						{loading ? (
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						) : (
							<DatabaseBackup className="mr-2 h-4 w-4" />
						)}
						Update all data
					</Button>
				</div>
			</CardFrame>
		</AppFrame>
	)
}

export default UtilPage
