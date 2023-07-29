import { CardFrame } from 'ui'

const InfoCard = ({
	label,
	value,
	icon,
	bgClassName,
}: {
	label: string
	value: string | number
	icon?: React.ReactNode
	bgClassName?: string
}) => {
	return (
		<CardFrame className="w-full overflow-auto flex gap-4 items-center !px-4">
			{icon && (
				<div className={`rounded-lg p-2 ${bgClassName}`}>{icon}</div>
			)}
			<div className="flex flex-col">
				<div className="text-textSecondary text-xs uppercase">
					{label}
				</div>
				<h4 className="text-xl">{value}</h4>
			</div>
		</CardFrame>
	)
}

export default InfoCard
