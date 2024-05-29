'use client'
import { BottomMenu } from '@/components/BottomMenu'
import { TopNavigation } from '@/components/TopNavigation'

export default function Page() {
	return (
		<div className="h-full w-full">
			<TopNavigation />
			<div className="pb-8">
				<div className="flex flex-col text-center items-center max-w-[800px] mx-auto py-8">
					<h4>Privacy</h4>
					<div className="max-w-[400px]">
						The Moist Meter site and extension does not collect any
						data about your browsing or personal data. All access to
						websites are only used to insert the Moist Meter scores
						to the respective movies.
					</div>
				</div>
			</div>
			<BottomMenu />
		</div>
	)
}
