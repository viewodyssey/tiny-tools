import clientPromise from '@/utils/mongodb'
import { updateSearchTerm } from '@/utils/updateSearchTerm'
import { NextResponse } from 'next/server'
import { updateSearchRank } from '../../../../../utils/updateSearchRank'

/**
 * Update each extension item details for the top 100 for search term
 * @param request
 * @param param1
 * @returns
 */
export async function GET(
	request: Request,
	{ params }: { params: { param: string } },
) {
	const { param } = params
	const id = param.toLowerCase()

	try {
		const client = await clientPromise
		const db = client.db('db')
		await updateSearchRank(db, id)
		const updatedItems = await updateSearchTerm(db, id)
		return NextResponse.json({ updatedItems })
	} catch (e) {
		console.error(e)
		NextResponse.json({
			error: {
				message: e.message,
			},
		})
	}
}
