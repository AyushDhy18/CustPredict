
import { useEffect, useState } from 'react'

import {
  Users,
  Layers,
  Award,
  AlertTriangle
} from 'lucide-react'

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts'

import { getCustomerSegments } from '../services/api'

const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#8b5cf6']

function Dashboard() {
  const [clusters, setClusters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getCustomerSegments()
      .then(response => {
        setClusters(response.data.cluster_details)
      })
      .catch(err => {
        console.error(err)
        setError('Unable to load dashboard analytics.')
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <p className="text-slate-500">Loading dashboard...</p>
  }

  if (error) {
    return <p className="text-red-600">{error}</p>
  }

  const totalCustomers = clusters.reduce(
    (sum, item) => sum + Number(item.Customer_Count), 0
  )

  const highValue = clusters.find(
    item => Number(item.Cluster) === 1
  )

  const inactive = clusters.find(
    item => Number(item.Cluster) === 2
  )

  const stats = [
    {
      title: 'Total Customers',
      value: totalCustomers.toLocaleString(),
      subtitle: 'Actual customer records',
      icon: Users
    },
    {
      title: 'Customer Clusters',
      value: clusters.length,
      subtitle: 'K-Means segmentation',
      icon: Layers
    },
    {
      title: 'High-Value Customers',
      value: Number(highValue?.Customer_Count || 0).toLocaleString(),
      subtitle: 'Cluster 1',
      icon: Award
    },
    {
      title: 'At-Risk / Inactive',
      value: Number(inactive?.Customer_Count || 0).toLocaleString(),
      subtitle: 'Cluster 2',
      icon: AlertTriangle
    }
  ]

  const segmentData = clusters.map(item => ({
    name: `Cluster ${item.Cluster}`,
    value: Number(item.Customer_Count)
  }))

  const monetaryData = clusters.map(item => ({
    name: `Cluster ${item.Cluster}`,
    monetary: Number(item.Monetary)
  }))

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Dashboard Overview
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Customer behaviour and RFM-based segmentation analytics.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map(item => {
          const Icon = item.icon

          return (
            <div
              key={item.title}
              className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm"
            >
              <div className="flex justify-between items-center">
                <p className="text-sm text-slate-500">{item.title}</p>
                <Icon className="text-blue-600" size={22} />
              </div>

              <h2 className="text-2xl font-bold text-slate-800 mt-4">
                {item.value}
              </h2>

              <p className="text-sm text-slate-500 mt-2">
                {item.subtitle}
              </p>
            </div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

        {/* Customer Distribution */}
        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <h3 className="font-semibold text-slate-800 mb-5">
            Customer Distribution by Cluster
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={segmentData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {segmentData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Cluster Monetary Analysis */}
        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <h3 className="font-semibold text-slate-800 mb-5">
            Average Monetary Value by Cluster
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monetaryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="monetary"
                name="Average Monetary Value"
                fill="#2563eb"
                radius={[5, 5, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Cluster Summary Table */}
      <div className="bg-white p-5 rounded-xl border border-slate-200">
        <h3 className="font-semibold text-slate-800 mb-5">
          Cluster Performance Summary
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3">Cluster</th>
                <th className="p-3">Customers</th>
                <th className="p-3">Recency</th>
                <th className="p-3">Frequency</th>
                <th className="p-3">Monetary</th>
              </tr>
            </thead>

            <tbody>
              {clusters.map(item => (
                <tr key={item.Cluster} className="border-t">
                  <td className="p-3 font-medium">
                    Cluster {item.Cluster}
                  </td>
                  <td className="p-3">
                    {Number(item.Customer_Count).toLocaleString()}
                  </td>
                  <td className="p-3">
                    {Number(item.Recency).toFixed(2)}
                  </td>
                  <td className="p-3">
                    {Number(item.Frequency).toFixed(2)}
                  </td>
                  <td className="p-3">
                    ₹{Number(item.Monetary).toLocaleString('en-IN', {
                      maximumFractionDigits: 2
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

export default Dashboard
