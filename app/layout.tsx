import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Task Board",
  description: "A simple and clean task management board",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-zinc-950 text-white min-h-screen">
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 2500,
            style: {
              background: "#18181b",
              color: "#fafafa",
              border: "1px solid #3f3f46",
            },
          }}
        />
      </body>
    </html>
  );
}
