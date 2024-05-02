import Image from 'next/image'
import MoistMeterLogo from '../assets/moistmeter.svg'

const LoadingState = () => {
	return (
		<div className="w-screen h-screen absolute z-500 bg-background transition-opacity">
			<div className="flex flex-col w-full h-full item-center justify-center">
				<div className="flex item-center justify-center">
					<div className="p-2 bg-moist animate-bounce duration-[5000ms]">
						<Image src={MoistMeterLogo} alt="" />
					</div>
				</div>
			</div>
		</div>
	)
}

export default LoadingState
