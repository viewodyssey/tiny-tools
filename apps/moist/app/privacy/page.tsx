'use client'
import { BottomMenu } from '@/components/BottomMenu'
import { TopNavigation } from '@/components/TopNavigation'

export default function Page() {
	return (
		<div className="h-full w-full">
			<TopNavigation />
			<div className="pb-8">
				<div className="flex flex-wrap max-w-[800px] mx-auto">
					The Moist Meter site and extension does not collect any data
					about your browsing or personal data. All access to websites
					are only used to insert the Moist Meter scores to the
					respective movies.
				</div>
			</div>
			<BottomMenu />
		</div>
	)
}
