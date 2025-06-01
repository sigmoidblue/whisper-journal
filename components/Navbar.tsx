'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import AuthButton from './AuthButton'

const Navbar = () => {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md border-b scroll-smooth">
      <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">

        <Link href="/" className="text-xl font-bold text-gray-500">
          Whisper Journal
        </Link>

        <div className="flex items-center gap-6 text-gray-400">
          <Link
            href="/"
            className={`hover:underline ${pathname === '/' ? 'font-semibold underline' : ''
              }`}
          >
            Home
          </Link>

          <Link
            href="/entries"
            className={`hover:underline ${pathname === '/entries' ? 'font-semibold underline' : ''
              }`}
          >
            Entries
          </Link>

          <Link
            href="#about"
            className={`hover:underline ${pathname === '#about' ? 'font-semibold underline' : ''
              }`}>
            About
          </Link>

          <AuthButton />

        </div>
      </div>
    </nav>
  )
}

export default Navbar
