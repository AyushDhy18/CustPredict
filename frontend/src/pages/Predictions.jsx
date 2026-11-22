
import { useEffect, useState } from 'react'
import { getPredictions } from '../services/api'

const descriptions = {
  0: 'Customers with recent purchases but relatively low spending.',
  1: 'High-value customers with strong purchase frequency and spending.',
  2: 'Inactive customers with the highest recency values.',
  3: 'Customers with moderate purchase frequency and spending.',
}

export default function Predictions() {
  const [clusters, setClusters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getPredictions()
      .then(response => setClusters(response.data.clusters))
      .catch(() => setError('Unable to load segmentation results.'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="p-6">Loading segmentation...</p>
  if (error) return <p className="p-6 text-red-500">{error}</p>

  const total = clusters.reduce(
    (sum, cluster) => sum + Number(cluster.Customer_Count), 0
  )

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Customer Segmentation</h1>
        <p className="text-gray-500">
          K-Means clustering using Recency, Frequency and Monetary values
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-gray-500">Total Customers</p>
          <h2 className="text-3xl font-bold">{total.toLocaleString()}</h2>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-gray-500">Number of Clusters</p>
          <h2 className="text-3xl font-bold">{clusters.length}</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {clusters.map(cluster => {
          const id = Number(cluster.Cluster)
          const count = Number(cluster.Customer_Count)

          return (
            <div key={id} className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold">Cluster {id}</h2>

              <p className="text-gray-600 mt-2">
                {descriptions[id] ?? 'Customer group identified by K-Means.'}
              </p>

              <p className="text-2xl font-bold mt-4">
                {count.toLocaleString()} customers
              </p>

              <div className="grid grid-cols-3 gap-3 mt-5 text-sm">
                <div>
                  <p className="text-gray-500">Recency</p>
                  <p className="font-semibold">
                    {Number(cluster.Recency).toFixed(1)}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">Frequency</p>
                  <p className="font-semibold">
                    {Number(cluster.Frequency).toFixed(1)}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">Monetary</p>
                  <p className="font-semibold">
                    {Number(cluster.Monetary).toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2 mt-5">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${total ? (count / total) * 100 : 0}%` }}
                />
              </div>

              <p className="text-sm text-gray-500 mt-2">
                {total ? ((count / total) * 100).toFixed(1) : 0}% of customers
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
