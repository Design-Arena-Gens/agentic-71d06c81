import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anime Bike Cleaning Scene",
  description: "Dragon Ball Z inspired character cleaning his Honda 350cc",
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
