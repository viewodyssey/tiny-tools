'use client'
import { BottomMenu } from '@/components/BottomMenu'
import { TopNavigation } from '@/components/TopNavigation'

export default function Page() {
	return (
		<div className="h-full w-full">
			<TopNavigation />
			<div className="pb-8"></div>
			<BottomMenu />
		</div>
	)
}
