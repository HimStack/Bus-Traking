'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://delivery-tracking-backend-3mxb.onrender.com'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('manager')
  const [username, setUsername] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await axios.post(`${BACKEND_URL}/api/auth/register`, {
        name,
        email,
        username,
        password,
        role,
      })

      const token = res.data.token

      localStorage.setItem('token', token)
      localStorage.setItem('role', role)

      if (role === 'manager') router.push('/dashboard/manager')
      else if (role === 'delivery') router.push('/dashboard/delivery')
      else router.push('/dashboard/customer')
    } catch (err: any) {
      alert(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center gap-10 lg:grid-cols-[1fr_480px]">
        <section className="hidden lg:block">
          <p className="mb-4 inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">
            Start dispatching smarter
          </p>
          <h1 className="max-w-2xl text-5xl font-black leading-tight text-gray-950">
            Create a TrackNex workspace for real-time delivery control.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-gray-600">
            Register as a manager, delivery agent, or customer and step into the right dashboard instantly.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-100 bg-white p-8 shadow-2xl shadow-gray-950/10">
          <div className="mb-8 text-center">
            <Image src="/logo.png" alt="TrackNex Logo" width={64} height={64} className="mx-auto mb-3 rounded-xl" />
            <h2 className="text-2xl font-black text-gray-950">Create your account</h2>
            <p className="mt-1 text-sm text-gray-500">Set up your TrackNex access</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-gray-700">Name</span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </label>

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
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-bold text-gray-700">Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              Register
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-blue-700 hover:text-blue-800">
              Login here
            </Link>
          </p>
        </section>
      </div>
    </main>
  )
}
