import { NextResponse } from 'next/server'

/**
 * Getting data
 * @param request
 * @param param1
 * @returns
 */
export async function GET() {
	try {
		const resp = await fetch('http://localhost:8888/')
		const data = await resp.json()
		return NextResponse.json(data)
	} catch (e) {
		console.error(e)
		NextResponse.json({
			error: {
				message: e.message,
			},
		})
	}
}
