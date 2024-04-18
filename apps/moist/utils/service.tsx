import { Segment, UserAccount } from '../hooks/DataContext'
import { BASEPATH, DOMAIN } from './misc'

export async function addUser(params: any) {
	const headerOptions = {
		method: 'POST',
		body: JSON.stringify(params),
	}
	const res = await (await fetch('/api/user/addUser', headerOptions)).json()
	return {
		...res,
	}
}

export async function addEmail(params: { email: string }) {
	const headerOptions = {
		method: 'POST',
		body: JSON.stringify(params),
	}
	const res = await (await fetch('/api/user/addEmail', headerOptions)).json()
	return {
		...res,
	}
}

export async function getUser(id: string) {
	const res = await (await fetch(`${BASEPATH}/api/user/getUser/${id}`)).json()
	return {
		...res,
	}
}

export async function getAccount(id: string) {
	const res = await (
		await fetch(`${BASEPATH}/api/account/getAccount/${id}`)
	).json()
	return {
		...res,
	}
}

export async function addAccount(params: { account: UserAccount }) {
	const headerOptions = {
		method: 'POST',
		body: JSON.stringify(params),
	}
	const res = await (
		await fetch(`${BASEPATH}/api/account/addAccount`, headerOptions)
	).json()
	return {
		...res,
	}
}

export async function addSegment(params: {
	accountId: string
	segment: Segment
}) {
	const headerOptions = {
		method: 'POST',
		body: JSON.stringify(params),
	}
	const res = await (
		await fetch(`${BASEPATH}/api/account/addSegment`, headerOptions)
	).json()
	return {
		...res,
	}
}
