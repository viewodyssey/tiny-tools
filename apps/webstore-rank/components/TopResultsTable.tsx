import { useDataContext } from '@/hooks/DataContext'
import { getSubstringOccurences } from '@/utils/findkeyword'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { useMemo } from 'react'
import {
	Button,
	buttonVariants,
	Skeleton,
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from 'ui'

interface TopResultsTableProps {
	data: any[]
}

const TopResultsTable = ({ data }: TopResultsTableProps) => {
	const { searchData, loading } = useDataContext()

	const dataWithKeywordFrequency = useMemo(() => {
		const searchKeywords = searchData.keyword.split(' ')
		const parsedData = data.map((d) => {
			let totalFrequency = 0
			searchKeywords.forEach((keyword) => {
				totalFrequency += getSubstringOccurences(
					`${d.name} ${d.title}`,
					keyword,
				)
			})
			return { ...d, keywordFrequency: totalFrequency }
		})
		return parsedData
	}, [searchData.keyword, data])

	return (
		<div className="overflow-auto max-h-[400px] h-full w-full">
			<div className="flex w-full py-2 px-4 font-medium text-sm text-gray-400">
				<div
					className="w-full truncate"
					style={{ maxWidth: 'calc(100% - 80px)' }}
				>
					Name
				</div>
				<div className="basis-[80px] flex-grow-0 text-right">
					Keywords
				</div>
			</div>
			{loading
				? Array.from(Array(8).keys()).map((row) => (
						<div
							className="flex w-full px-4 border-t-border border-t py-2 items-center"
							key={row}
						>
							<div className="basis-[40px] flex-grow-0">
								<Skeleton className="w-6 h-6" />
							</div>
							<div
								className="w-full truncate text-sm"
								style={{ maxWidth: 'calc(100% - 120px)' }}
							>
								<Skeleton className="w-8/12 h-6" />
							</div>
							<div className="basis-[80px] flex-grow-0 flex justify-end pr-2 text-sm">
								<Skeleton className="w-4 h-6" />
							</div>
						</div>
				  ))
				: dataWithKeywordFrequency.map((row, i) => (
						<div
							className="flex w-full px-4 border-t-border border-t py-1 items-center"
							key={i}
						>
							<div className="basis-[40px] flex-grow-0">
								<img
									src={row.images['26x26']}
									alt="Icon"
									className="w-6 h-6"
									referrerPolicy="no-referrer"
								/>
							</div>
							<div
								className="w-full"
								style={{ maxWidth: 'calc(100% - 120px)' }}
							>
								<Link
									className={`${buttonVariants({
										variant: 'ghost',
									})} justify-start !px-2 max-w-full flex gap-2`}
									href={`https://chrome.google.com/webstore/detail/${row.id}`}
									target="_blank"
									rel="noopener nofollow noreferrer"
								>
									<div className="text-left truncate text-sm">
										{row.name}
									</div>
									<ArrowUpRight
										size={16}
										color={'#888'}
										className="basis-4 flex-shrink-0"
									/>
								</Link>
							</div>
							<div className="basis-[80px] flex-grow-0 text-right pr-2 text-sm">
								{row.keywordFrequency}
							</div>
						</div>
				  ))}
		</div>
	)
}

export default TopResultsTable
