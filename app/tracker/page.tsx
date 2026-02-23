"use client"
import { useState, useEffect } from 'react'

const VC_FIRMS = [
  { name: 'Sequoia Capital', id: 'sequoia-capital', color: 'bg-green-100 text-green-800' },
  { name: 'a16z', id: 'andreessen-horowitz', color: 'bg-orange-100 text-orange-800' },
  { name: 'Y Combinator', id: 'y-combinator', color: 'bg-red-100 text-red-800' }
]

export default function TrackerPage() {
  const [activeFirm, setActiveFirm] = useState(VC_FIRMS[0])
  const [deals, setDeals] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // Fetch deals whenever the active firm changes
  useEffect(() => {
    async function fetchDeals() {
      setIsLoading(true)
      try {
        const res = await fetch(`/api/tracker?firm=${activeFirm.id}`)
        const data = await res.json()
        setDeals(data.deals || [])
      } catch (err) {
        console.error("Failed to fetch deals")
      } finally {
        setIsLoading(false)
      }
    }
    fetchDeals()
  }, [activeFirm])

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* 1. Page Header */}
      <div className="text-center md:text-left space-y-2">
        <h1 className="text-4xl font-serif font-bold text-vc-navy uppercase tracking-tighter">
          Signal Tracker
        </h1>
        <p className="text-gray-500 font-medium italic">
          Monitoring the deployment of global venture capital.
        </p>
      </div>

      {/* 2. Firm Selector Tabs */}
      <div className="flex flex-wrap gap-3 justify-center md:justify-start">
        {VC_FIRMS.map((firm) => (
          <button
            key={firm.id}
            onClick={() => setActiveFirm(firm)}
            className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all border ${
              activeFirm.id === firm.id 
                ? 'bg-vc-navy text-vc-beige border-vc-navy shadow-lg scale-105' 
                : 'bg-white text-vc-navy border-gray-200 hover:border-vc-navy'
            }`}
          >
            {firm.name}
          </button>
        ))}
      </div>

      {/* 3. Metrics Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Current Focus</p>
          <p className={`text-sm font-bold inline-block px-2 py-1 rounded ${activeFirm.color}`}>
            {activeFirm.name}
          </p>
        </div>
        <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Recent Deployments</p>
          <p className="text-2xl font-bold text-vc-navy">{deals.length} Deals</p>
        </div>
        <div className="p-6 bg-vc-navy rounded-2xl shadow-sm text-vc-beige">
          <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest mb-1">Market Sentiment</p>
          <p className="text-2xl font-bold italic">High Conviction</p>
        </div>
      </div>

      {/* 4. Data Table */}
      <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Company</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Stage</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Funding</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td colSpan={4} className="px-6 py-8"><div className="h-4 bg-gray-100 rounded w-full"></div></td>
                </tr>
              ))
            ) : deals.length > 0 ? (
              deals.map((deal: any) => (
                <tr key={deal.id} className="hover:bg-blue-50/30 transition-colors group cursor-default">
                  <td className="px-6 py-5 font-bold text-vc-navy group-hover:text-blue-800">{deal.companyName}</td>
                  <td className="px-6 py-5">
                    <span className="text-[10px] font-bold bg-gray-100 px-2 py-1 rounded text-gray-600 uppercase">
                      {deal.stage}
                    </span>
                  </td>
                  <td className="px-6 py-5 font-semibold text-green-700">{deal.amount}</td>
                  <td className="px-6 py-5 text-gray-400 text-sm text-right font-mono">
                    {new Date(deal.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-20 text-center text-gray-400 italic">
                  No recent data found for this firm.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}