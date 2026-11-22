
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  Package,
  BrainCircuit,
  BarChart3
} from 'lucide-react'

const navigation = [
  {
    name: 'Dashboard',
    path: '/',
    icon: LayoutDashboard
  },
  {
    name: 'Customers',
    path: '/customers',
    icon: Users
  },
  {
    name: 'Products',
    path: '/products',
    icon: Package
  },
  {
    name: 'Segmentation',
    path: '/predictions',
    icon: BrainCircuit
  }
]

function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col">
      
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <BarChart3 size={28} className="text-blue-400" />
          <div>
            <h1 className="text-lg font-bold">
              CustPredict
            </h1>
            <p className="text-xs text-slate-400">
              Analytics Platform
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <p className="text-xs uppercase text-slate-500 font-semibold mb-4">
          Main Menu
        </p>

        {navigation.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800'
                }`
              }
            >
              <Icon size={19} />
              <span className="text-sm font-medium">
                {item.name}
              </span>
            </NavLink>
          )
        })}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <p className="text-xs text-slate-400">
          Customer Behaviour Analysis
        </p>
        <p className="text-xs text-slate-500 mt-1">
          Final Year Project
        </p>
      </div>

    </aside>
  )
}

export default Sidebar
