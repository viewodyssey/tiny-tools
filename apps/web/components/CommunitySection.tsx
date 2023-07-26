import { Button } from 'ui'

const CommunitySection = () => {
	return (
		<div className="w-full flex flex-col items-center">
			<div className="w-full max-w-[900px] md:text-center flex flex-col items-start md:items-center my-[160px]">
				<h1 className="font-medium text-2xl md:text-4xl md:leading-4xl w-full tracking-tight">
					Join the community
				</h1>
				<p className="py-6 md:w-8/12 text-base md:text-lg text-textSecondary">
					Keep up with updates and new tools.
				</p>
				<Button>Sign up</Button>
			</div>
		</div>
	)
}

export default CommunitySection
