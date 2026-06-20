'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const navItems = [
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/industries', label: 'Industries' },
  { href: '/resources', label: 'Resources' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-gray-100 bg-white/70 shadow-sm shadow-gray-200/40 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="TrackNex Logo" width={42} height={42} className="rounded-lg" />
          <span className="text-2xl font-black tracking-tight text-gray-950">TrackNex</span>
        </Link>

        <nav className="hidden items-center gap-2 text-sm font-semibold text-gray-700 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 transition duration-200 hover:bg-gray-950 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/login" className="rounded-full px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 hover:text-gray-950">
            Login
          </Link>
          <Link href="/register" className="rounded-full bg-gray-950 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-gray-950/15 transition hover:-translate-y-0.5 hover:bg-blue-700">
            Get Started
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm md:hidden"
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div className="mx-4 mb-4 space-y-2 rounded-xl border border-gray-100 bg-white/95 p-3 text-sm font-semibold text-gray-700 shadow-xl shadow-gray-950/10 backdrop-blur-md md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block rounded-lg px-4 py-3 transition hover:bg-gray-100 hover:text-gray-950"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/login" onClick={() => setMenuOpen(false)} className="block rounded-lg px-4 py-3 transition hover:bg-gray-100 hover:text-gray-950">
            Login
          </Link>
          <Link href="/register" onClick={() => setMenuOpen(false)} className="block rounded-lg bg-gray-950 px-4 py-3 text-center text-white transition hover:bg-blue-700">
            Get Started
          </Link>
        </div>
      )}
    </header>
  )
}
