type Props = {
	items: {
		label: string
		value: string
	}[]
	value: string
	onChange: (value: string) => void
}

const Tabs = ({ items, value, onChange }: Props) => {
	return (
		<div className="flex gap-4 items-center p-2 py-3 justify-center">
			{items.map((item) => (
				<div
					key={item.value}
					className={`${
						item.value === value
							? 'text-moist'
							: 'text-gray-400 hover:text-moist'
					} font-medium tracking-tight md:text-lg cursor-pointer group`}
					onClick={() => {
						onChange(item.value)
					}}
				>
					<div>{item.label}</div>
					<div
						className={`mt-[2px] h-[2px] w-full ${
							item.value === value
								? 'bg-moist'
								: 'group-hover:bg-moist'
						}`}
					></div>
				</div>
			))}
		</div>
	)
}

export default Tabs
