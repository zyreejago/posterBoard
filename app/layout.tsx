import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Poster Board - Pendidikan Pancasila",
  description: "Aplikasi pembelajaran interaktif tentang persatuan di lingkungan sekolah untuk kelas 6 SD",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body
        className={`${inter.className} bg-cover bg-center bg-fixed`}
        style={{ backgroundImage: "url('/images/background.png')" }}
      >
        <div className="min-h-screen bg-black bg-opacity-50">{children}</div>
      </body>
    </html>
  )
}
