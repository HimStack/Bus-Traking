'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://delivery-tracking-backend-3mxb.onrender.com'

interface DecodedToken {
  id: string
  username: string
  role: string
  iat: number
  exp: number
}

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('manager')
  const [username, setUsername] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await axios.post(`${BACKEND_URL}/api/auth/login`, {
        username,
        password,
        role,
      })

      const token = res.data.token
      const decoded: DecodedToken = jwtDecode(token)
      const userRole = decoded.role

      localStorage.setItem('token', token)
      localStorage.setItem('role', userRole)

      if (userRole === 'manager') router.push('/dashboard/manager')
      else if (userRole === 'delivery') router.push('/dashboard/delivery')
      else router.push('/dashboard/customer')
    } catch (err: any) {
      alert(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center gap-10 lg:grid-cols-[1fr_440px]">
        <section className="hidden lg:block">
          <p className="mb-4 inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
            Secure operations workspace
          </p>
          <h1 className="max-w-2xl text-5xl font-black leading-tight text-gray-950">
            Sign in to manage live orders, trips, and delivery visibility.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-gray-600">
            TrackNex keeps dispatch, delivery teams, and customers aligned from one role-aware command center.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-100 bg-white p-8 shadow-2xl shadow-gray-950/10">
          <div className="mb-8 text-center">
            <Image src="/logo.png" alt="TrackNex Logo" width={64} height={64} className="mx-auto mb-3 rounded-xl" />
            <h2 className="text-2xl font-black text-gray-950">Welcome back</h2>
            <p className="mt-1 text-sm text-gray-500">Login to your TrackNex workspace</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-gray-700">Username</span>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-bold text-gray-700">Password</span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-bold text-gray-700">Role</span>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              >
                <option value="manager">Manager</option>
                <option value="delivery">Delivery</option>
                <option value="customer">Customer</option>
              </select>
            </label>

            <button
              type="submit"
              className="w-full rounded-xl bg-gray-950 px-5 py-3 font-bold text-white shadow-lg shadow-gray-950/15 transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Do not have an account?{' '}
            <Link href="/register" className="font-bold text-blue-700 hover:text-blue-800">
              Register here
            </Link>
          </p>
        </section>
      </div>
    </main>
  )
}
