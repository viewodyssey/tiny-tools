'use client'
import { DEFAULT_SEARCH_TERM, useDataContext } from '@/hooks/DataContext'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { TextCursorInput, ShoppingBag } from 'lucide-react'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
	CommandDialog,
	CommandInput,
	CommandList,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	Badge,
	Button,
} from 'ui'
import { BASEPATH } from '../utils/misc'

export const CommandBarChrome = () => {
	const { searchData, searchTerm, itemId, open, setOpen } = useDataContext()
	const [value, setValue] = useState('')
	const pathname = usePathname()

	useEffect(() => {
		if (searchTerm.length <= 2 && pathname !== BASEPATH) {
			window.location.href = BASEPATH
		}
	}, [searchTerm, pathname])

	useEffect(() => {
		if (itemId.length <= 2 && pathname !== BASEPATH) {
			window.location.href = BASEPATH
		}
	}, [itemId, pathname])

	return (
		<>
			<div className="flex items-center gap-4">
				<div className="w-full md:w-[360px]">
					<Button
						variant="outline"
						className="text-gray-400 font-normal w-full justify-start pl-2"
						onClick={() => setOpen(true)}
					>
						<MagnifyingGlassIcon className="mr-2 h-6 w-6" />
						{searchData.keyword ? (
							<div className="flex items-center">
								<Badge className="mr-2 px-2 font-medium">{`keyword`}</Badge>
								<span className="text-primary">{`${searchData.keyword}`}</span>
							</div>
						) : itemId !== DEFAULT_SEARCH_TERM ? (
							<div className="flex items-center">
								<Badge className="mr-2 px-2 font-medium">{`id`}</Badge>
								<span className="text-primary">{`${itemId}`}</span>
							</div>
						) : (
							'Type something...'
						)}
					</Button>
				</div>
				<CommandDialog
					open={open}
					onOpenChange={(op) => {
						if (op) {
							setOpen(op)
						} else {
							if (searchTerm.length > 2) {
								setOpen(op)
							}
						}
					}}
					commandProps={{
						filter: (value, search) => {
							if (
								search.includes(
									'chrome.google.com/webstore/detail/',
								) &&
								value === 'keyword'
							)
								return 0
							return 1
						},
					}}
				>
					<CommandInput
						placeholder="Type something to search..."
						value={value}
						onValueChange={setValue}
					/>
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandGroup heading="Suggestions">
							<CommandItem
								value="keyword"
								onSelect={() => {
									if (value.length > 2) {
										const params = new URLSearchParams()
										params.set('keyword', value)
										const newParams = params.toString()
										window.location.href = `/chrome-extension/search?${newParams}`
										setOpen(false)
									}
								}}
							>
								<TextCursorInput className="mr-2 h-4 w-4" />
								<Badge className="mr-2 font-normal">
									Keyword
								</Badge>
								<span>
									{value || 'Enter any search term...'}
								</span>
							</CommandItem>
							<CommandItem
								value="extension"
								onSelect={() => {
									if (value.includes('/')) {
										const splitUrl = value.split('/')
										const itemId =
											splitUrl[splitUrl.length - 1]
										const params = new URLSearchParams()
										params.set('id', itemId)
										const newParams = params.toString()
										window.location.href = `/chrome-extension/item?${newParams}`
										setOpen(false)
									}
								}}
							>
								<ShoppingBag className="mr-2 h-4 w-4" />
								<Badge className="mr-2 font-normal">
									Extension
								</Badge>
								<span>
									{value || 'Enter a Chrome extension URL...'}
								</span>
							</CommandItem>
						</CommandGroup>
					</CommandList>
				</CommandDialog>
			</div>
		</>
	)
}
