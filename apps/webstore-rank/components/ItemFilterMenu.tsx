import { useDataContext } from '@/hooks/DataContext'
import { updatePropertyState } from '@/utils/misc'
import { Calendar, Filter } from 'lucide-react'
import {
	DropdownMenu,
	DropdownMenuTrigger,
	Button,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuCheckboxItem,
} from 'ui'

const TIME_FRAME_MAP = {
	7: 'Past 7 days',
	30: 'Past 30 days',
	90: 'Past 90 days',
}

export function ItemFilterMenu() {
	const { filters, setFilters } = useDataContext()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">
					<Calendar size={16} />
					<span className="ml-2">
						{TIME_FRAME_MAP[filters.time_frame]}
					</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end">
				{Object.keys(TIME_FRAME_MAP).map((days) => (
					<DropdownMenuCheckboxItem
						key={days}
						checked={filters.time_frame === Number(days)}
						onCheckedChange={(v) => {
							updatePropertyState(
								setFilters,
								'time_frame',
								Number(days),
							)
						}}
					>
						{TIME_FRAME_MAP[days]}
					</DropdownMenuCheckboxItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
