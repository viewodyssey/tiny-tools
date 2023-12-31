'use client'
import { H } from 'highlight.run'
import jwtDecode from 'jwt-decode'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDataContext } from '../../hooks/DataContext'
import { addAccount, getAccount } from '../../utils/service'

declare var google: any

const LoginButton = ({ afterLogin, customId }: any) => {
	const { setUserAccount } = useDataContext()
	const [loginLoading, setLoginLoading] = useState(false)

	useEffect(() => {
		const signInCallback = async (response: any) => {
			setLoginLoading(true)
			const jwtToken = response.credential
			const data: any = jwtDecode(jwtToken)
			const account = await getAccount(data.sub)
			if (Object.keys(account).length === 0) {
				const userDetails = {
					id: data.sub,
					email: data.email,
					firstName: data.given_name,
					lastName: data.family_name,
				}
				await addAccount({ account: userDetails })
				localStorage.setItem('id', userDetails.id)
				setUserAccount(userDetails)
				const env = process.env['NODE_ENV']
				if (env !== 'development') {
					H.identify(userDetails.email, { id: userDetails.id })
				}
			} else {
				setUserAccount(account)
				localStorage.setItem('id', account.id)
			}
			setLoginLoading(false)
			if (afterLogin) {
				afterLogin()
			}
		}
		if (google) {
			google.accounts.id.initialize({
				client_id: process.env['NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID'],
				callback: signInCallback,
			})
			google.accounts.id.renderButton(document.getElementById(customId), {
				theme: 'outline',
			})
		}

		return () => {
			google?.accounts.id.cancel()
		}
	}, [afterLogin, customId, setUserAccount])

	return (
		<div className="flex gap-2 items-center">
			<div id={customId}></div>
			{loginLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
		</div>
	)
}

export default LoginButton
