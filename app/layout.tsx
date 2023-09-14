import './globals.css'
import { Poppins } from 'next/font/google'
import NavBar from '@/components/NavBar'

const poppins = Poppins({
  weight:['400','600'],
  subsets:['latin']
})

export const metadata = {
  title: 'Movie Mania',
  description: 'hub for a vast array of movies spanning genres, eras, and cultures. From timeless classics to cutting-edge releases',
  keywords:['movies','genres']
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <NavBar />
        {children}
      </body>
    </html>
  )
}
