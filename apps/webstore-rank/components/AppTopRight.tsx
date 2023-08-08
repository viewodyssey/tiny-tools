import { Avatar, AvatarFallback, Button, Dialog, DialogTrigger } from 'ui'
import { GUEST_USER, NO_USER, useDataContext } from '../hooks/DataContext'
import LoginModal from './LoginModal/LoginModal'

const AppTopRight = () => {
	const { userAccount } = useDataContext()
	return (
		<div className="flex items-center">
			{userAccount.id !== NO_USER.id ? (
				userAccount.id === GUEST_USER.id ? (
					<Dialog>
						<DialogTrigger asChild>
							<Button variant="outline">Login</Button>
						</DialogTrigger>
						<LoginModal />
					</Dialog>
				) : (
					<Avatar className="w-8 h-8 cursor-pointer">
						<AvatarFallback className="text-sm">
							{userAccount.firstName[0] || ''}
						</AvatarFallback>
					</Avatar>
				)
			) : (
				<Avatar className="w-8 h-8 cursor-pointer">
					<AvatarFallback className="text-sm"></AvatarFallback>
				</Avatar>
			)}
		</div>
	)
}

export default AppTopRight
