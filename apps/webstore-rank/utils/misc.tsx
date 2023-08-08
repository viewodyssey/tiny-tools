export const BASEPATH = '/chrome-extension'
const dev = process.env['NODE_ENV'] !== 'production'
export const DOMAIN = dev ? 'http://localhost:3001' : 'https://viewodyssey.com'

export const updatePropertyState = (
	setState: (v: any) => void,
	property: string,
	value: any,
) => {
	setState((prev) => ({ ...prev, [property]: value }))
}

export function useBasepathFix(): void {
	const basePath = '/chrome-extension'
	if (typeof window === 'undefined') {
		return
	}
	if (window.location.pathname === basePath + basePath) {
		const fixedUrl =
			basePath + window.location.search + window.location.hash
		const newState = {
			...window.history.state,
			as: fixedUrl,
		}
		window.history.replaceState(newState, undefined, fixedUrl)
	}
}
