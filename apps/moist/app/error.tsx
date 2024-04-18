'use client'
import { AppFrame, Button, CardFrame } from 'ui'
import { useEffect } from 'react'
import SidebarItems from '@/components/SidebarItems'
import { CommandBarChrome } from '@/components/CommandBarChrome'
import AppTopRight from '@/components/AppTopRight'
import { AlertCircle } from 'lucide-react'

export default function Error({
	error,
	reset,
}: {
	error: Error
	reset: () => void
}) {
	useEffect(() => {
		console.error(error)
	}, [error])

	return <div></div>
}
