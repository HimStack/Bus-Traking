'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { BarChart3, Clock, MapPinned, PackageCheck, PackageSearch, Route } from 'lucide-react'
import AnimatedMap from '@/components/AnimatedMap'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://delivery-tracking-backend-3mxb.onrender.com'

interface Order {
  _id?: string
  customerName?: string
  deliveryAddress?: string
  pickupAddress?: string
  status: string
}

const statCards = [
  {
    label: 'Total Orders',
    tone: 'blue',
    icon: PackageSearch,
  },
  {
    label: 'Pending Deliveries',
    tone: 'amber',
    icon: Clock,
  },
  {
    label: 'Completed Deliveries',
    tone: 'emerald',
    icon: PackageCheck,
  },
  {
    label: 'Avg. ETA',
    tone: 'violet',
    icon: Route,
  },
]

const toneClasses = {
  blue: 'bg-blue-50 text-blue-700 ring-blue-100',
  amber: 'bg-amber-50 text-amber-700 ring-amber-100',
  emerald: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  violet: 'bg-violet-50 text-violet-700 ring-violet-100',
}

export default function ManagerDashboardHome() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/orders`)
      setOrders(res.data)
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const total = orders.length
  const pending = orders.filter((o) => o.status === 'Pending').length
  const completed = orders.filter((o) => o.status === 'Delivered' || o.status === 'Completed').length
  const values = [total, pending, completed, 'N/A']

  return (
    <main className="min-h-screen bg-slate-50 px-6 pb-12 pt-24">
      {loading ? (
        <p className="pt-32 text-center text-gray-500">Loading dashboard...</p>
      ) : (
        <div className="mx-auto max-w-7xl space-y-8">
          <section className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-blue-700">Manager overview</p>
              <h1 className="mt-2 text-4xl font-black text-gray-950">Delivery command center</h1>
              <p className="mt-3 max-w-2xl text-gray-600">
                Monitor order volume, delivery status, trips, and live movement from one focused workspace.
              </p>
            </div>
            <Link
              href="/dashboard/manager/orders"
              className="inline-flex items-center justify-center rounded-full bg-gray-950 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-gray-950/15 transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              Manage orders
            </Link>
          </section>

          <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {statCards.map((card, index) => {
              const Icon = card.icon
              return (
                <div key={card.label} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg shadow-gray-950/5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-gray-500">{card.label}</p>
                    <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ring-1 ${toneClasses[card.tone as keyof typeof toneClasses]}`}>
                      <Icon size={21} />
                    </span>
                  </div>
                  <p className="mt-5 text-3xl font-black text-gray-950">{values[index]}</p>
                </div>
              )
            })}
          </section>

          <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <Link href="/dashboard/manager/orders" className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-lg shadow-gray-950/5 transition hover:-translate-y-1 hover:shadow-xl">
              <PackageSearch className="text-blue-700" size={26} />
              <h2 className="mt-4 text-lg font-black text-gray-950">Orders</h2>
              <p className="mt-2 text-sm text-gray-600">Create, review, and track customer orders.</p>
            </Link>
            <Link href="/dashboard/manager/trips" className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-lg shadow-gray-950/5 transition hover:-translate-y-1 hover:shadow-xl">
              <MapPinned className="text-emerald-700" size={26} />
              <h2 className="mt-4 text-lg font-black text-gray-950">Trips</h2>
              <p className="mt-2 text-sm text-gray-600">Assign delivery agents and manage routes.</p>
            </Link>
            <Link href="/dashboard/manager/analytics" className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-lg shadow-gray-950/5 transition hover:-translate-y-1 hover:shadow-xl">
              <BarChart3 className="text-violet-700" size={26} />
              <h2 className="mt-4 text-lg font-black text-gray-950">Analytics</h2>
              <p className="mt-2 text-sm text-gray-600">Review delivery trends and performance.</p>
            </Link>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg shadow-gray-950/5">
            <div className="mb-5">
              <h2 className="text-xl font-black text-gray-950">Live delivery map</h2>
              <p className="mt-1 text-sm text-gray-500">Real-time movement visualization for active routes.</p>
            </div>
            <AnimatedMap />
          </section>
        </div>
      )}
    </main>
  )
}
