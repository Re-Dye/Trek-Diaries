//overall layout of the web app
// add global navbar here
import './globals.css'

export const metadata = {
  title: 'TrekDiaries',
  description: 'Social media app for hikers and trekkers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
