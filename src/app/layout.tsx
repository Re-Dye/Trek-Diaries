"use client";

import { Session } from "next-auth";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ReactQueryProvider } from "@/components/ui/react-query-provider";

interface IProps {
  children: ReactNode;
  session: Session;
}

// export default function RootLayout({ children }: { children: ReactNode}) {
export default function RootLayout({ children, session }: IProps) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SessionProvider session={session}>{children}</SessionProvider>
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
