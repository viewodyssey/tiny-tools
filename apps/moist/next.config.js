module.exports = {
	reactStrictMode: true,
	transpilePackages: ['ui'],
	trailingSlash: false,
	basePath: '/moist-meter',
	async redirects() {
		return [
			{
				source: '/get',
				destination:
					'https://chromewebstore.google.com/detail/moist-meter/fkjclkbcfieknijloglaflnkdekgccna',
				permanent: true,
			},
		]
	},
}
