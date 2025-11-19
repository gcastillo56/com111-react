'use client';
import "./globals.css";

import { useState } from "react";
import Header from "@/components/Header";
import { PostProvider } from "@/context/postContext";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const [metaCount, setMetaCount] = useState(0);
  // NOTE: Observe how we wrap most of the content inside the Post provider context
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          <PostProvider>
            <Header value={metaCount} action={setMetaCount}/>
            <main className="flex-1">{children}</main>
          </PostProvider>
        </div>
      </body>
    </html>
  );
}
