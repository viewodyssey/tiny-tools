import { Metadata } from 'next'
import Script from 'next/script'
import 'ui/styles.css'
import Wrapper from '../components/Wrapper'

const headData = {
	title: 'Hypnos - Health for all. ',
	description: 'Unlocking health data locked behind subscriptions. ',
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
			</body>
		</html>
	)
}
