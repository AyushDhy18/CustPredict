
import { Bell, Search, UserCircle } from 'lucide-react'

function NavBar() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold text-slate-800">
          Customer Analytics
        </h2>
        <p className="text-xs text-slate-500">
          Customer Behaviour Analysis System
        </p>
      </div>

      <div className="flex items-center gap-5">
        <div className="hidden md:flex items-center bg-slate-100 rounded-lg px-3 py-2">
          <Search size={17} className="text-slate-400" />
          <input
            placeholder="Search..."
            className="bg-transparent outline-none text-sm ml-2 w-36"
          />
        </div>

        <Bell size={20} className="text-slate-600 cursor-pointer" />

        <div className="flex items-center gap-2">
          <UserCircle size={30} className="text-slate-600" />
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-slate-800">
              Admin
            </p>
            <p className="text-xs text-slate-500">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default NavBar
