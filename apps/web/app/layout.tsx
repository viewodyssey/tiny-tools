import { Metadata } from "next";
import "ui/styles.css";

const headData = {
  title: "Odyssey - View your digital journey. ",
  description:
    "Corporations own lots of data about your online activity. Gather and visualize your digital footprint in a beautiful way. ",
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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
