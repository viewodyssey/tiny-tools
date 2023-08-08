import { NextResponse } from 'next/server'
import clientPromise from '../../../../../utils/mongodb'

export async function GET(
	request: Request,
	{ params }: { params: { id: string } },
) {
	const { id } = params
	try {
		const client = await clientPromise
		const db = client.db('db')

		const user = await db.collection('accounts').findOne({
			id: id,
		})
		return NextResponse.json({ ...user })
	} catch (e) {
		console.error(e)
		return NextResponse.json({
			error: {
				message: e.message,
			},
		})
	}
}
