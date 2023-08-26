import { Metadata } from 'next'
import Script from 'next/script'
import { Toaster } from 'ui'
import 'ui/styles.css'
import Wrapper from '../components/Wrapper'
import { HighlightInit } from '@highlight-run/next/highlight-init'

const headData = {
	title: 'Odyssey - View your digital journey. ',
	description:
		'Corporations own lots of data about your online activity. Gather and visualize your digital footprint in a beautiful way. ',
}

export const metadata: Metadata = {
	title: headData.title,
	description: headData.description,
	openGraph: { title: headData.title, description: headData.description },
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<>
			{process.env['NODE_ENV'] !== 'development' ? (
				<HighlightInit
					projectId={'ng2kkyg1'}
					tracingOrigins
					networkRecording={{
						enabled: true,
						recordHeadersAndBody: true,
						urlBlocklist: [],
					}}
				/>
			) : (
				<></>
			)}
			<html lang="en">
				<Script
					id="gaScript1"
					strategy="afterInteractive"
					src="https://www.googletagmanager.com/gtag/js?id=G-KFTQWN9V6D"
				></Script>
				<Script
					id="gaScript2"
					strategy="afterInteractive"
					dangerouslySetInnerHTML={{
						__html: `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-KFTQWN9V6D');`,
					}}
				/>
				<body>
					<Wrapper>{children}</Wrapper>
					<Toaster />
				</body>
			</html>
		</>
	)
}
