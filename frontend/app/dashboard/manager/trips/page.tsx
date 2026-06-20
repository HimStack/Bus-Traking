'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { MapPinned, UserRoundCheck, XCircle } from 'lucide-react'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://delivery-tracking-backend-3mxb.onrender.com'

interface Trip {
  _id: string
  pickupAddress: string
  destinationAddress: string
  status: string
  assignedAgent?: string
}

interface Agent {
  _id: string
  name: string
}

function statusBadgeClass(status: string) {
  const normalized = status.toLowerCase()

  if (normalized === 'delivered' || normalized === 'completed') return 'bg-emerald-100 text-emerald-800'
  if (normalized === 'pending' || normalized === 'assigned') return 'bg-amber-100 text-amber-800'
  if (normalized === 'cancelled' || normalized === 'voided') return 'bg-rose-100 text-rose-800'

  return 'bg-slate-100 text-slate-700'
}

export default function TripsPage() {
  const [trips, setTrips] = useState<Trip[]>([])
  const [agents, setAgents] = useState<Agent[]>([])

  const fetchTrips = async () => {
    const res = await axios.get(`${BACKEND_URL}/api/trips`)
    setTrips(res.data)
  }

  const fetchAgents = async () => {
    const res = await axios.get(`${BACKEND_URL}/api/delivery-agents`)
    setAgents(res.data)
  }

  const assignTrip = async (tripId: string, agentId: string) => {
    if (!agentId) return

    await axios.put(`${BACKEND_URL}/api/trips/${tripId}/assign`, { agentId })
    fetchTrips()
  }

  const cancelTrip = async (tripId: string) => {
    await axios.put(`${BACKEND_URL}/api/trips/${tripId}/cancel`)
    fetchTrips()
  }

  useEffect(() => {
    fetchTrips()
    fetchAgents()
  }, [])

  return (
    <main className="min-h-screen bg-slate-50 px-6 pb-12 pt-24">
      <div className="mx-auto max-w-7xl space-y-8">
        <section>
          <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Trip control</p>
          <h1 className="mt-2 text-4xl font-black text-gray-950">Manage trips</h1>
          <p className="mt-3 max-w-2xl text-gray-600">Assign delivery agents, review trip routes, and cancel trips from a clean dispatch surface.</p>
        </section>

        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {trips.map((trip) => (
            <article key={trip._id} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg shadow-gray-950/5 transition hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-start justify-between gap-4">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                  <MapPinned size={22} />
                </span>
                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${statusBadgeClass(trip.status)}`}>
                  {trip.status}
                </span>
              </div>

              <p className="mt-5 text-xs font-bold uppercase tracking-wide text-gray-400">Trip ID</p>
              <h2 className="mt-1 break-all text-lg font-black text-gray-950">{trip._id}</h2>

              <dl className="mt-5 space-y-4 text-sm">
                <div>
                  <dt className="font-bold text-gray-500">Pickup</dt>
                  <dd className="mt-1 text-gray-800">{trip.pickupAddress}</dd>
                </div>
                <div>
                  <dt className="font-bold text-gray-500">Destination</dt>
                  <dd className="mt-1 text-gray-800">{trip.destinationAddress}</dd>
                </div>
                <div>
                  <dt className="font-bold text-gray-500">Assigned agent</dt>
                  <dd className="mt-1 text-gray-800">{trip.assignedAgent || 'Unassigned'}</dd>
                </div>
              </dl>

              <div className="mt-6 space-y-3">
                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-bold text-gray-700">
                    <UserRoundCheck size={16} />
                    Assign agent
                  </span>
                  <select
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    onChange={(e) => assignTrip(trip._id, e.target.value)}
                    defaultValue=""
                  >
                    <option value="" disabled>Choose an agent</option>
                    {agents.map((agent) => (
                      <option key={agent._id} value={agent._id}>
                        {agent.name}
                      </option>
                    ))}
                  </select>
                </label>

                <button
                  onClick={() => cancelTrip(trip._id)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-rose-600/15 transition hover:-translate-y-0.5 hover:bg-rose-700"
                >
                  <XCircle size={16} />
                  Cancel trip
                </button>
              </div>
            </article>
          ))}
        </section>

        {trips.length === 0 && (
          <section className="rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center text-gray-500">
            No trips found.
          </section>
        )}
      </div>
    </main>
  )
}
