import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '../../../../utils/mongodb'

export async function POST(request: NextRequest) {
	const { accountId, segment } = await request.json()
	try {
		const client = await clientPromise
		const db = client.db('db')
		const user = await db.collection('accounts').findOneAndUpdate(
			{
				id: accountId,
			},
			{
				$push: {
					segments: segment as never,
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
