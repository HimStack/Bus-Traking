'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { PackagePlus } from 'lucide-react'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://delivery-tracking-backend-3mxb.onrender.com'

interface Order {
  _id: string
  customerName: string
  pickupAddress: string
  deliveryAddress: string
  status: string
  createdAt: string
}

function statusBadgeClass(status: string) {
  const normalized = status.toLowerCase()

  if (normalized === 'delivered' || normalized === 'completed') return 'bg-emerald-100 text-emerald-800'
  if (normalized === 'pending' || normalized === 'assigned') return 'bg-amber-100 text-amber-800'
  if (normalized === 'cancelled' || normalized === 'voided') return 'bg-rose-100 text-rose-800'

  return 'bg-slate-100 text-slate-700'
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [customerName, setCustomerName] = useState('')
  const [pickupAddress, setPickupAddress] = useState('')
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/orders`)
      setOrders(res.data)
    } catch (error) {
      console.error('Error fetching orders:', error)
    }
  }

  const createOrder = async () => {
    try {
      setLoading(true)
      await axios.post(`${BACKEND_URL}/api/orders`, {
        trackingId: `TRK-${Date.now()}`,
        customerName,
        pickupAddress,
        deliveryAddress,
        pickupCoordinates: { lat: 28.6139, lon: 77.2090 },
        deliveryCoordinates: { lat: 28.5355, lon: 77.3910 },
      })
      setCustomerName('')
      setPickupAddress('')
      setDeliveryAddress('')
      fetchOrders()
    } catch (error) {
      console.error('Error creating order:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <main className="min-h-screen bg-slate-50 px-6 pb-12 pt-24">
      <div className="mx-auto max-w-7xl space-y-8">
        <section>
          <p className="text-sm font-bold uppercase tracking-wide text-blue-700">Order operations</p>
          <h1 className="mt-2 text-4xl font-black text-gray-950">Orders</h1>
          <p className="mt-3 max-w-2xl text-gray-600">Create delivery orders and monitor every customer request in a polished operations table.</p>
        </section>

        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg shadow-gray-950/5">
          <div className="mb-5 flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700 ring-1 ring-blue-100">
              <PackagePlus size={22} />
            </span>
            <div>
              <h2 className="text-xl font-black text-gray-950">Create new order</h2>
              <p className="text-sm text-gray-500">Add customer and route details.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <input
              type="text"
              placeholder="Customer name"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Pickup address"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              value={pickupAddress}
              onChange={(e) => setPickupAddress(e.target.value)}
            />
            <input
              type="text"
              placeholder="Delivery address"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
            />
          </div>
          <button
            onClick={createOrder}
            disabled={loading}
            className="mt-5 rounded-xl bg-gray-950 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-gray-950/15 transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Creating...' : 'Create order'}
          </button>
        </section>

        <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg shadow-gray-950/5">
          <div className="border-b border-gray-100 p-6">
            <h2 className="text-xl font-black text-gray-950">Order list</h2>
            <p className="mt-1 text-sm text-gray-500">Recent orders with status and creation date.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-slate-50 text-xs font-black uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Pickup</th>
                  <th className="px-6 py-4">Delivery</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => (
                  <tr key={order._id} className="bg-white transition hover:scale-[1.005] hover:bg-blue-50/40">
                    <td className="px-6 py-4 font-bold text-gray-950">{order.customerName}</td>
                    <td className="px-6 py-4 text-gray-600">{order.pickupAddress}</td>
                    <td className="px-6 py-4 text-gray-600">{order.deliveryAddress}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${statusBadgeClass(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  )
}
