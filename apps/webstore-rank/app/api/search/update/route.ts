import clientPromise from '@/utils/mongodb'
import { updateSearchRank } from '@/utils/updateSearchRank'
import { updateSearchTerm } from '@/utils/updateSearchTerm'
import { NextResponse } from 'next/server'

/**
 * Update all search terms
 * @param request
 * @param param1
 * @returns
 */
export async function GET() {
	const client = await clientPromise
	const db = client.db('db')
	const allKeywords = await db
		.collection('search')
		.find({}, { projection: { keyword: 1, _id: 0 } })
		.toArray()
	for (let i = 0; i < allKeywords.length; i++) {
		try {
			await updateSearchRank(db, allKeywords[i].keyword)
			await updateSearchTerm(db, allKeywords[i].keyword)
		} catch (e) {
			console.error(e)
		}
	}
	return NextResponse.json({
		status: 'done',
	})
}
