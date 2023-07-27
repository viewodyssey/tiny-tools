import { NextResponse } from 'next/server'
import clientPromise from '../../../../utils/mongodb'

export async function GET(
	request: Request,
	{ params }: { params: { param: string } },
) {
	const { param } = params
	const email = decodeURIComponent(param)

	try {
		if (!email) {
			throw new Error('No email provided.')
		}
		const client = await clientPromise
		const db = client.db('users')
		const emailCollection = await db.collection('email').findOneAndUpdate(
			{
				email: email,
			},
			{
				$set: {
					email: email,
					time: Date.now(),
					odyssey: true,
					subscribed: true,
				},
			},
			{ upsert: true },
		)

		return NextResponse.json({
			...emailCollection.value,
		})
	} catch (e) {
		console.error(e)
		NextResponse.json({
			error: {
				message: e.message,
			},
		})
	}
}
