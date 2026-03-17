import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eniola & Joseph — Forever",
  description:
    "Join us as we celebrate our wedding on December 19, 2026 at Foxegan Hotel & Restaurant, Los Angeles.",
  openGraph: {
    title: "Eniola & Joseph — Forever",
    description: "We're getting married! Save the date: December 19, 2026.",
  },
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
