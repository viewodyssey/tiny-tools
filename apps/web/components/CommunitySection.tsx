'use client'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { Button, Input, useToast } from 'ui'

const CommunitySection = () => {
	const [email, setEmail] = useState('')
	const [loading, setLoading] = useState(false)
	const { toast } = useToast()

	const addEmail = async () => {
		setLoading(true)
		try {
			if (email.includes('@')) {
				const response = await fetch(
					`/api/email/${encodeURIComponent(email)}`,
				)
				const data = await response.json()
				console.debug(data)
				toast({
					title: 'Sign up successful!',
					description: 'Thank you for your interest!',
				})
				setLoading(false)
				setEmail('')
			} else {
				throw new Error('Invalid email')
			}
		} catch (e) {
			console.error(e)
			toast({
				title: 'Uh oh! Something went wrong.',
				description:
					'There was a problem with your request. Please try again',
			})
			setLoading(false)
		}
	}
	return (
		<div className="w-full flex flex-col items-center">
			<div className="w-full max-w-[900px] md:text-center flex flex-col items-start md:items-center my-[100px]">
				<h1 className="font-medium text-2xl md:text-4xl md:leading-4xl w-full tracking-tight">
					Join the community
				</h1>
				<p className="py-6 md:w-8/12 text-base md:text-lg text-textSecondary">
					Keep up with updates and new tools.
				</p>
				<div className="flex flex-col md:flex-row gap-2 items-center justify-center w-full">
					<Input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full md:max-w-[400px]"
						placeholder="Email"
					/>
					<Button
						onClick={() => addEmail()}
						className="min-w-[100px] w-full md:w-auto"
					>
						{loading ? (
							<Loader2 className="h-4 w-4 animate-spin" />
						) : (
							'Sign up'
						)}
					</Button>
				</div>
			</div>
		</div>
	)
}

export default CommunitySection
