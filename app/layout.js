import { Inter, Creepster } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const creepster = Creepster({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-creepster',
  display: 'swap',
})

export const metadata = {
  title: 'HORRORVILLE | The First On-Chain Cinematic Horror Universe',
  description: 'A vertically integrated IP engine that produces high-quality horror films and mints them on-chain. Built for Fear. Powered by Crypto.',
  keywords: ['horror', 'crypto', 'NFT', 'film', 'gaming', 'blockchain', 'entertainment'],
  authors: [{ name: 'GK-LABS' }],
  openGraph: {
    title: 'HORRORVILLE | The First On-Chain Cinematic Horror Universe',
    description: 'A vertically integrated IP engine that produces high-quality horror films and mints them on-chain.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HORRORVILLE',
    description: 'The First On-Chain Cinematic Horror Universe',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${creepster.variable} bg-black text-white overflow-x-hidden antialiased`}>
        {/* Ambient Horror Overlay */}
        <div className="fixed inset-0 pointer-events-none z-[100] bg-gradient-to-b from-transparent via-transparent to-black/20" />
        {children}
      </body>
    </html>
  )
}
