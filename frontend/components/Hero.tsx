'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pb-20 pt-28">
      <div className="absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-100/70 blur-3xl" />
      <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-emerald-100/70 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-amber-100/70 blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl flex-col-reverse items-center justify-between gap-12 px-6 md:flex-row">
        <div className="max-w-xl">
          <p className="mb-5 inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
            Real-time logistics intelligence
          </p>
          <h1 className="mb-6 text-4xl font-black leading-tight text-gray-950 md:text-6xl">
            Delivery tracking that feels fast, clear, and in control.
          </h1>
          <p className="mb-8 text-lg leading-8 text-gray-600">
            TrackNex unifies live orders, trip assignments, ETA predictions, and role-based dashboards so logistics teams can move with confidence.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-full bg-gray-950 px-7 py-3 text-sm font-bold text-white shadow-xl shadow-gray-950/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              Get Started
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-7 py-3 text-sm font-bold text-gray-800 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700"
            >
              View Features
            </Link>
          </div>
        </div>

        <div className="relative w-full md:w-1/2">
          <div className="absolute inset-4 rounded-3xl bg-gray-950/10 blur-2xl" />
          <Image
            src="/hero-image.png"
            alt="TrackNex delivery dashboard preview"
            width={600}
            height={400}
            className="relative h-auto w-full rounded-2xl border border-gray-100 bg-white shadow-2xl shadow-gray-950/15"
            priority
          />
        </div>
      </div>
    </section>
  )
}
