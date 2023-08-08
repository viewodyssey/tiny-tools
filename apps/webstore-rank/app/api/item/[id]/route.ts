import { NextResponse } from 'next/server'
import webstore from 'chrome-webstore'
import clientPromise from '@/utils/mongodb'

export async function GET(
	request: Request,
	{ params }: { params: { id: string } },
) {
	const { id } = params
	const itemDetail = await webstore.detail({
		id: id,
	})

	try {
		const client = await clientPromise
		const db = client.db('db')
		const currentDate = new Date().toISOString().split('T')[0]

		const existingItem = await db.collection('items').findOne({ id: id })

		if (existingItem) {
			const searchTermsWithId = await db
				.collection('search')
				.aggregate([
					{
						$addFields: {
							latestRanking: {
								$cond: {
									if: {
										$ne: [
											{
												$type: {
													$arrayElemAt: [
														'$ranking.items.id',
														-1,
													],
												},
											},
											'array',
										],
									},
									then: [],
									else: {
										$arrayElemAt: ['$ranking.items.id', -1],
									},
								},
							},
						},
					},
					{
						$project: {
							keyword: 1,
							latestRanking: 1,
							containsId: {
								$in: [id, '$latestRanking'],
							},
						},
					},
					{
						$match: {
							containsId: true,
						},
					},
				])
				.toArray()
			return NextResponse.json({
				data: existingItem,
				rankings: searchTermsWithId,
			})
		}
		const itemUpdated = await db.collection('items').findOneAndUpdate(
			{
				id: itemDetail.id,
			},
			{
				$set: {
					id: itemDetail.id,
					name: itemDetail.name,
					title: itemDetail.title,
					slug: itemDetail.slug,
					category: itemDetail.category,
					author: itemDetail.author,
					developer: itemDetail.developer.verified
						? { verified: true }
						: { verified: false },
					featured: itemDetail.featured ? true : false,
					users: [
						{
							users: Number(
								itemDetail.users
									.replaceAll(',', '')
									.replaceAll('+', ''),
							),
							date: currentDate,
						},
					],
					rating: [{ rating: itemDetail.rating, date: currentDate }],
				},
			},
			{
				upsert: true,
				returnDocument: 'after',
			},
		)
		return NextResponse.json({ data: itemUpdated.value })
	} catch (e) {
		console.error(e)
		NextResponse.json({
			error: {
				message: e.message,
			},
		})
	}
}
