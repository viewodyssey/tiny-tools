import { NextResponse } from 'next/server'
import webstore from 'chrome-webstore'
import clientPromise from '@/utils/mongodb'

export async function GET(
	request: Request,
	{ params }: { params: { param: string } },
) {
	const { param } = params
	const id = param.toLowerCase()
	const items = await webstore.items({
		category: 'extensions',
		search: id,
		count: 100,
	})

	try {
		const client = await clientPromise
		const db = client.db('db')
		const currentDate = new Date().toISOString().split('T')[0]

		const existingItem = await db.collection('search').findOne({
			keyword: id,
		})
		if (existingItem) {
			return NextResponse.json({ searchData: existingItem, items: items })
		}

		await db.collection('search').updateOne(
			{
				keyword: id,
			},
			{
				$pull: {
					ranking: {
						date: currentDate,
					},
				},
			},
		)
		const itemRankingIds = items.map((item) => ({
			id: item.id,
			name: item.name,
		}))
		const searchTerm = await db.collection('search').findOneAndUpdate(
			{
				keyword: id,
			},
			{
				$set: {
					keyword: id,
				},
				$push: {
					ranking: {
						date: currentDate,
						items: itemRankingIds,
					} as never,
				},
			},
			{
				upsert: true,
				returnDocument: 'after',
			},
		)
		return NextResponse.json({ searchData: searchTerm.value, items: items })
	} catch (e) {
		console.error(e)
		NextResponse.json({
			error: {
				message: e.message,
			},
		})
	}
}
