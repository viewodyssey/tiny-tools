import "ui/styles.css";
import { Metadata } from "next";
import Wrapper from "@/components/Wrapper";
import Script from "next/script";
import { HighlightInit } from "@highlight-run/next/highlight-init";
import { Suspense } from "react";

const headData = {
  title: "Tiny Tools - Chrome Extension Ranking",
  description:
    "View historical rankings and analytics for search terms and Chrome extensions. ",
};

export const metadata: Metadata = {
  title: headData.title,
  description: headData.description,
  openGraph: { title: headData.title, description: headData.description },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HighlightInit
        projectId={"ng2kkyg1"}
        tracingOrigins
        networkRecording={{
          enabled: true,
          recordHeadersAndBody: true,
          urlBlocklist: [],
        }}
      />
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

        <body className="bg-gray-50">
          <Suspense fallback={<></>}>
            <Wrapper>{children}</Wrapper>
          </Suspense>
        </body>
      </html>
    </>
  );
}
