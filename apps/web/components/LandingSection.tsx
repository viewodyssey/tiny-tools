import Link from 'next/link'
import {
	Badge,
	badgeVariants,
	buttonVariants,
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from 'ui'
import AnthonyLogo from '@/assets/eightants.png'

const LandingSection = () => {
	return (
		<div className="w-full flex flex-col items-center">
			<div className="w-full max-w-[900px] md:text-center flex flex-col items-start md:items-center my-[160px]">
				<h1 className="font-medium text-4xl md:text-[72px] md:leading-[72px] w-full tracking-tight">
					View Your Digital Odyssey
				</h1>
				<p className="py-6 md:w-8/12 text-base md:text-lg">
					Corporations own lots of data about your online activity.
					Gather and visualize your digital footprint in a beautiful
					way.{' '}
				</p>
				<Link className={buttonVariants()} href="/tools">
					Get started
				</Link>
			</div>
			<div className="flex flex-col gap-2">
				<h2 className="font-medium text-xl md:text-2xl">
					Tiny digital delights.{' '}
				</h2>
				<div className="flex flex-col md:flex-row text-textSecondary gap-2 md:gap-6">
					<p className="w-full md:w-1/2">
						Have you ever wondered what companies know about you?
						How is data used behind-the-scenes for detecting
						behaviors? What can you learn from data you have access
						to?
					</p>
					<p className="w-full md:w-1/2">
						Odyssey is an open-source project started by{' '}
						<HoverCard>
							<HoverCardTrigger asChild>
								<Link
									href={'https://anthonyteo.com'}
									target="_blank"
									rel="noopener nofollow noreferrer"
									className="hover:underline underline-offset-4"
								>
									<span className="text-base text-textPrimary">
										@eightants
									</span>
								</Link>
							</HoverCardTrigger>
							<HoverCardContent className="w-80 mt-2 py-3">
								<div className="flex justify-between space-x-4">
									<img
										className="w-8 h-8 rounded-full border border-border"
										src={AnthonyLogo.src}
									/>
									<div className="w-full">
										<h4 className="text-sm font-semibold">
											Anthony Teo
										</h4>
										<p className="text-sm">
											https://anthonyteo.com
										</p>
										<div className="flex items-center mt-2">
											<span className="text-xs text-muted-foreground">
												Opens in new tab
											</span>
										</div>
									</div>
								</div>
							</HoverCardContent>
						</HoverCard>{' '}
						aimed at providing interactive charts and visual
						storytelling tools to help users understand their
						information and enhance popular apps.
					</p>
				</div>
			</div>
		</div>
	)
}

export default LandingSection
