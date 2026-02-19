import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Building2, Camera, Package, TrendingUp, UserPlus, Menu, X } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/clients', icon: Building2, label: 'Clients' },
  { to: '/shoots', icon: Camera, label: 'Shoots' },
  { to: '/deliverables', icon: Package, label: 'Deliverables' },
  { to: '/performance', icon: TrendingUp, label: 'Performance' },
  { to: '/leads', icon: UserPlus, label: 'Leads' },
]

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 p-2 rounded lg:hidden"
        style={{ background: '#1a1a1a', color: '#c4a574' }}
      >
        <Menu size={20} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen z-50 flex flex-col transition-transform duration-200 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          width: 240,
          backgroundColor: '#1a1a1a',
        }}
      >
        {/* Mobile close button */}
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 lg:hidden"
          style={{ color: 'rgba(255,255,255,0.5)' }}
        >
          <X size={18} />
        </button>

        {/* Logo */}
        <div className="px-6 pt-8 pb-8">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <span
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 300,
                fontSize: '1.3rem',
                color: '#c4a574',
                letterSpacing: 3,
                textTransform: 'uppercase',
              }}
            >
              FRAME
            </span>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: '1.3rem',
                color: '#e8e0d4',
                letterSpacing: 3,
                textTransform: 'uppercase',
              }}
            >
              LAB
            </span>
          </div>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: 9,
              color: '#7fb5b0',
              letterSpacing: 4,
              textTransform: 'uppercase',
              marginTop: 4,
            }}
          >
            SEOUL
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 transition-colors duration-150"
              style={({ isActive }) => ({
                padding: '12px 24px',
                color: isActive ? '#c4a574' : 'rgba(255,255,255,0.5)',
                borderLeft: isActive ? '3px solid #c4a574' : '3px solid transparent',
                fontSize: '0.875rem',
              })}
              onMouseEnter={(e) => {
                if (!e.currentTarget.classList.contains('active')) {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.8)'
                }
              }}
              onMouseLeave={(e) => {
                const isActive = e.currentTarget.getAttribute('aria-current') === 'page'
                if (!isActive) {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
                }
              }}
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div
          className="px-6 pb-6"
          style={{
            fontSize: 11,
            color: 'rgba(255,255,255,0.2)',
          }}
        >
          Frame Lab Seoul &middot; 2025
        </div>
      </aside>
    </>
  )
}
