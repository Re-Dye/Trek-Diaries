import "./globals.css";
import { ReactNode } from "react";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ReactQueryProvider } from "@/components/ui/react-query-provider";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({ children }: { children: ReactNode}) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
