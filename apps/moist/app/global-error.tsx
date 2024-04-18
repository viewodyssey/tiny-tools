'use client'
import { useEffect } from 'react'

export default function Error({ error }: { error: Error; reset: () => void }) {
	useEffect(() => {
		console.error(error)
	}, [error])

	return (
		<div>
			<h2>Error</h2>
			<p>Something went wrong. </p>
		</div>
	)
}
