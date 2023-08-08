import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '../../../../utils/mongodb'

export async function POST(request: NextRequest) {
	const { account } = await request.json()
	try {
		const client = await clientPromise
		const db = client.db('db')
		const user = await db.collection('accounts').findOneAndUpdate(
			{
				id: account.id,
			},
			{
				$set: {
					...account,
				},
			},
			{ upsert: true, returnDocument: 'after' },
		)
		return NextResponse.json({
			...user.value,
		})
	} catch (e: any) {
		console.error(e)
		return NextResponse.json({
			error: {
				message: e.message,
			},
		})
	}
}
