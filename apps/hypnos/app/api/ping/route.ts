import { NextResponse } from 'next/server'

/**
 * Ping Replit app to stop it from sleeping
 * @param request
 * @param param1
 * @returns
 */
export async function GET() {
	try {
		const resp = await fetch('https://selenium2.eightants.repl.co/')
		const status = await resp.json()
		return NextResponse.json(status)
	} catch (e) {
		console.error(e)
		NextResponse.json({
			error: {
				message: e.message,
			},
		})
	}
}
