"use client";
import { DataWrapper } from "../hooks/DataContext";
import "ui/styles.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <DataWrapper>{children}</DataWrapper>
      </body>
    </html>
  );
}
