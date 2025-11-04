import type { Metadata } from "next";
import "./globals.css";

import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Blog with React",
  description: "A sample blog app built with React",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
