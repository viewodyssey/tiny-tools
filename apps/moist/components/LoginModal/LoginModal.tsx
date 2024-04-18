import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from 'ui'
import LoginButton from '../LoginButton/LoginButton'

const LoginModal = () => {
	return (
		<DialogContent className="!w-full px-4 max-w-[360px]">
			<DialogHeader>
				<DialogTitle>Login</DialogTitle>
				<DialogDescription>
					Login to easily access search trends that interest you.
				</DialogDescription>
			</DialogHeader>
			<LoginButton customId="dashboardGoogle" />
		</DialogContent>
	)
}

export default LoginModal
