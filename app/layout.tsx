import type { Metadata } from "next";
import "./globals.css";
import AuthSessionProvider from "../components/AuthSessionProvider";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "Whisper Journal",
  description: "Voice-based journaling app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="scroll-smooth">
        <AuthSessionProvider>
          <Navbar />
          <div className="">{children}</div>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
