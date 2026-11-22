
import { useEffect, useState } from 'react'
import { getCustomers } from '../services/api'

const clusterLabels = {
  0: 'Recent, Low-Spend',
  1: 'High-Value',
  2: 'At-Risk / Inactive',
  3: 'Moderate-Value',
}

export default function Customers() {
  const [customers, setCustomers] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getCustomers()
      .then(response => setCustomers(response.data.customers))
      .catch(() => setError('Unable to load customer records.'))
      .finally(() => setLoading(false))
  }, [])

  const filteredCustomers = customers.filter(customer =>
    String(customer['Customer ID']).includes(search)
  )

  if (loading) return <p className="p-6">Loading customers...</p>
  if (error) return <p className="p-6 text-red-500">{error}</p>

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Customer Analysis</h1>
        <p className="text-gray-500">
          RFM-based customer records and segmentation
        </p>
      </div>

      <div className="bg-white rounded-xl p-5 shadow-sm">
        <p className="text-gray-500">Total Customers</p>
        <h2 className="text-3xl font-bold">{customers.length.toLocaleString()}</h2>
      </div>

      <input
        type="text"
        placeholder="Search by Customer ID..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full md:w-80 border rounded-lg px-4 py-2"
      />

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Customer ID</th>
              <th className="p-4">Recency</th>
              <th className="p-4">Frequency</th>
              <th className="p-4">Monetary</th>
              <th className="p-4">Cluster</th>
              <th className="p-4">Segment</th>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.slice(0, 100).map((customer, index) => (
              <tr key={customer['Customer ID'] ?? index}
                  className="border-t hover:bg-gray-50">
                <td className="p-4">{customer['Customer ID']}</td>
                <td className="p-4">{Number(customer.Recency).toFixed(1)}</td>
                <td className="p-4">{Number(customer.Frequency).toFixed(1)}</td>
                <td className="p-4">
                  {Number(customer.Monetary).toFixed(2)}
                </td>
                <td className="p-4">{customer.Cluster}</td>
                <td className="p-4">
                  {clusterLabels[customer.Cluster] ?? 'Unclassified'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="p-4 text-gray-500 text-sm">
          Showing {Math.min(filteredCustomers.length, 100)} of {filteredCustomers.length} records.
        </p>
      </div>
    </div>
  )
}
