import { useDataContext } from '@/hooks/DataContext'
import { TextCursorInput } from 'lucide-react'
import Link from 'next/link'
import { useMemo } from 'react'
import { buttonVariants, Skeleton } from 'ui'

interface KeywordRankingTableProps {
	data: any[]
}

const KeywordRankingTable = ({ data }: KeywordRankingTableProps) => {
	const { itemId, loading } = useDataContext()

	const dataWithRanking = useMemo(() => {
		const parsedData = data
			.filter((d) => d.keyword !== itemId)
			.map((d) => {
				return {
					...d,
					rank:
						d.latestRanking.findIndex(
							(rankId) => rankId === itemId,
						) + 1,
				}
			})
		return parsedData
	}, [data, itemId])

	return (
		<div className="overflow-auto max-h-[400px] h-full w-full">
			<div className="flex w-full py-2 px-4 font-medium text-sm text-gray-400">
				<div
					className="w-full truncate"
					style={{ maxWidth: 'calc(100% - 160px)' }}
				>
					Keyword
				</div>
				<div className="basis-[80px] flex-grow-0">Rank</div>
				<div className="basis-[80px] flex-grow-0"></div>
			</div>
			{loading ? (
				Array.from(Array(4).keys()).map((row) => (
					<div
						className="flex w-full px-4 border-t-border border-t py-2 items-center"
						key={row}
					>
						<div
							className="w-full truncate text-sm"
							style={{ maxWidth: 'calc(100% - 120px)' }}
						>
							<Skeleton className="w-8/12 h-6" />
						</div>
						<div className="basis-[80px] flex-grow-0 flex justify-end pr-2 text-sm">
							<Skeleton className="w-4 h-6" />
						</div>
						<div className="basis-[80px] flex-grow-0 flex justify-end pr-2 text-sm">
							<Skeleton className="w-8 h-6" />
						</div>
					</div>
				))
			) : dataWithRanking.length > 0 ? (
				dataWithRanking.map((row, i) => (
					<div
						className="flex w-full px-4 border-t-border border-t py-1 items-center"
						key={i}
					>
						<div
							className="w-full py-2"
							style={{ maxWidth: 'calc(100% - 160px)' }}
						>
							<div className="text-left truncate text-sm">
								{row.keyword}
							</div>
						</div>
						<div className="basis-[80px] flex-grow-0 pr-2 text-sm">
							{row.rank}
						</div>
						<div className="basis-[80px] flex-grow-0 pr-2 text-sm text-right">
							<Link
								className={`${buttonVariants({
									variant: 'outline',
								})} justify-start !px-2 !py-1 !h-auto max-w-full flex gap-1`}
								href={`/search?keyword=${encodeURIComponent(
									row.keyword,
								)}`}
							>
								<div className="text-left truncate text-sm">
									More
								</div>
							</Link>
						</div>
					</div>
				))
			) : (
				<div className="flex flex-col items-center justify-center gap-2 w-full h-full py-8">
					<div className="bg-gray-200 w-12 h-12 rounded flex items-center justify-center">
						<TextCursorInput size={24} className="text-gray-500" />
					</div>
					<div className="max-w-[420px] text-textSecondary text-center">
						No keywords yet.
					</div>
				</div>
			)}
		</div>
	)
}

export default KeywordRankingTable
