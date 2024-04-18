import Image from 'next/image'
import MoistMeterLogo from '../assets/moistmeter.svg'

export const TopNavigation = () => {
	return (
		<nav
			className={`h-full w-full flex md:max-w-full border-b border-input px-4 py-2 sticky top-0 bg-background`}
		>
			<div className="px-1 py-[2px] bg-moist">
				<Image src={MoistMeterLogo} alt="logo" />
			</div>
		</nav>
	)
}
