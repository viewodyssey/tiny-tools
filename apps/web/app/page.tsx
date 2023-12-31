import AppSection from '@/components/AppSection'
import LandingSection from '@/components/LandingSection'
import CommunitySection from '../components/CommunitySection'
import Navbar from '../components/Navbar'

export default function Page() {
	return (
		<div className="w-full h-full bg-gray-50">
			<Navbar />
			<div className="flex justify-center w-full px-6 py-2">
				<div className="w-full max-w-[1000px]">
					<LandingSection />
					<AppSection />
					<CommunitySection />
				</div>
			</div>
		</div>
	)
}
