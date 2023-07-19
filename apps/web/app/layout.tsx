import { Metadata } from "next";
import "ui/styles.css";

const headData = {
  title: "Tiny Tools",
  description: "Little apps with big impact. ",
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
