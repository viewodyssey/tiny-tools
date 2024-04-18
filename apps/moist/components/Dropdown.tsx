import { ArrowDown, ChevronDown } from 'lucide-react'
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	Button,
} from 'ui'

type Props = {
	items: {
		label: string
		value: string
	}[]
	value: string
	onChange: (value: string) => void
}

const Dropdown = ({ items, value, onChange }: Props) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Button
					variant="outline"
					className="flex justify-between w-[180px]"
				>
					{items.find((item) => item.value === value).label}{' '}
					<ChevronDown size={16} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-[180px]">
				<DropdownMenuRadioGroup
					value={value}
					onValueChange={onChange}
					className="w-full"
				>
					{items.map((item) => (
						<DropdownMenuRadioItem
							value={item.value}
							key={item.value}
						>
							{item.label}
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default Dropdown
