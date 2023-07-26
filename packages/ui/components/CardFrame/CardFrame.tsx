import clsx from 'clsx'

interface CardFrameProps {
	title?: string
	className?: string
	titleClassName?: string
	children?: React.ReactNode
	controls?: React.ReactNode
}
export const CardFrame = ({
	title,
	children,
	controls,
	className,
	titleClassName,
}: CardFrameProps) => {
	return (
		<div
			className={clsx(
				'border-border border rounded-lg px-6 py-4 bg-background',
				className,
			)}
		>
			<div className="flex items-center justify-between">
				{title && <h4 className={titleClassName}>{title}</h4>}
				{controls && <div>{controls}</div>}
			</div>
			{children}
		</div>
	)
}
