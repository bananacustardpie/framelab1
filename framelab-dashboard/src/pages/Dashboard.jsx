import { useMemo } from 'react'
import { useApp } from '../context/AppContext'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import { Link } from 'react-router-dom'

function formatWon(amount) {
  return '₩' + amount.toLocaleString('en-US')
}

function formatDate(dateStr) {
  return dateStr.replace(/-/g, '.')
}

function TierBadge({ tier, tiers }) {
  const t = tiers[tier]
  if (!t) return null
  return (
    <span
      style={{
        backgroundColor: t.color,
        color: t.textColor,
        fontSize: 11,
        padding: '4px 12px',
        borderRadius: 9999,
        fontWeight: 500,
        whiteSpace: 'nowrap',
      }}
    >
      {t.label}
    </span>
  )
}

function StatusBadge({ status }) {
  const styles = {
    confirmed: { bg: '#2d5f5d', color: '#fff' },
    delivered: { bg: '#2d5f5d', color: '#fff' },
    scheduled: { bg: '#e8e0d4', color: '#2a2a2a' },
    production: { bg: '#e8e0d4', color: '#2a2a2a' },
    completed: { bg: '#2d5f5d', color: '#fff' },
    review: { bg: '#c4a574', color: '#1a1a1a' },
  }
  const s = styles[status] || { bg: '#e8e0d4', color: '#2a2a2a' }
  const label = {
    confirmed: 'Confirmed',
    delivered: 'Delivered',
    scheduled: 'Scheduled',
    production: 'In Production',
    completed: 'Completed',
    review: 'In Review',
  }
  return (
    <span
      style={{
        backgroundColor: s.bg,
        color: s.color,
        fontSize: 11,
        padding: '4px 12px',
        borderRadius: 9999,
        fontWeight: 500,
        whiteSpace: 'nowrap',
      }}
    >
      {label[status] || status}
    </span>
  )
}

export default function Dashboard() {
  const { clients, tiers, shoots, deliverables, conversions } = useApp()

  const stats = useMemo(() => {
    const activeClients = clients.filter(c => c.status === 'active')
    const maintenanceCount = activeClients.filter(c => c.tier === 'maintenance').length
    const growthCount = activeClients.filter(c => c.tier === 'growth').length
    const authorityCount = activeClients.filter(c => c.tier === 'authority').length

    // Feb shoots
    const febShoots = shoots.filter(s => s.date.startsWith('2025-02'))
    const febCompleted = febShoots.filter(s => s.status === 'completed').length
    const febTotal = febShoots.length

    // Next upcoming shoot
    const upcomingShoots = shoots
      .filter(s => s.status !== 'completed')
      .sort((a, b) => a.date.localeCompare(b.date))
    const nextShoot = upcomingShoots[0]
    const nextShootClient = nextShoot ? clients.find(c => c.id === nextShoot.clientId) : null

    // Feb deliverables
    const febDeliverables = deliverables.filter(d => d.date.startsWith('2025-02') || d.date.startsWith('2025-01'))
    const febDelivered = deliverables.filter(d => d.date.startsWith('2025-02'))
    const totalDelivered = febDelivered.reduce((sum, d) => sum + d.quantity, 0)
    const photoCount = febDelivered.filter(d => d.type === 'Photo Set' || d.type === 'Before/After Set' || d.type === 'Google Business Photos').reduce((sum, d) => sum + d.quantity, 0)
    const videoCount = febDelivered.filter(d => d.type === 'Instagram Reel').reduce((sum, d) => sum + d.quantity, 0)
    const creativeCount = febDelivered.filter(d => d.type === 'Ad Creative').reduce((sum, d) => sum + d.quantity, 0)

    // Monthly revenue
    const totalRevenue = activeClients.reduce((sum, c) => sum + c.monthlyRate, 0)

    // Previous month revenue (clients active before Feb 2025)
    const prevMonthRevenue = activeClients
      .filter(c => c.contractStart < '2025-02-01')
      .reduce((sum, c) => sum + c.monthlyRate, 0)
    const revenueChange = totalRevenue - prevMonthRevenue
    const revenueChangePct = prevMonthRevenue > 0 ? ((revenueChange / prevMonthRevenue) * 100).toFixed(1) : 0

    // Revenue by tier
    const revenueByTier = Object.entries(tiers).map(([key, tier]) => {
      const tierClients = activeClients.filter(c => c.tier === key)
      return {
        name: tier.label,
        value: tierClients.reduce((sum, c) => sum + c.monthlyRate, 0),
        color: tier.color,
      }
    })

    // Shoot activity by month (Sep through Feb)
    const months = ['2024-09', '2024-10', '2024-11', '2024-12', '2025-01', '2025-02']
    const monthLabels = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb']
    const shootActivity = months.map((m, i) => ({
      name: monthLabels[i],
      shoots: shoots.filter(s => s.date.startsWith(m)).length,
    }))

    // Upcoming shoots (next 5 not completed)
    const upcomingShootsTable = upcomingShoots.slice(0, 5).map(s => ({
      ...s,
      client: clients.find(c => c.id === s.clientId),
    }))

    // Recent deliveries (last 5 delivered)
    const recentDeliveries = deliverables
      .filter(d => d.status === 'delivered')
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 5)
      .map(d => ({
        ...d,
        client: clients.find(c => c.id === d.clientId),
      }))

    return {
      activeCount: activeClients.length,
      maintenanceCount,
      growthCount,
      authorityCount,
      febCompleted,
      febTotal,
      nextShoot,
      nextShootClient,
      totalDelivered,
      photoCount,
      videoCount,
      creativeCount,
      totalRevenue,
      revenueChange,
      revenueChangePct,
      revenueByTier,
      shootActivity,
      upcomingShootsTable,
      recentDeliveries,
    }
  }, [clients, tiers, shoots, deliverables, conversions])

  const cardStyle = {
    backgroundColor: '#fff',
    border: '1px solid rgba(0,0,0,0.08)',
    borderLeft: '3px solid #2d5f5d',
    padding: '24px',
  }

  return (
    <div>
      <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: '1.8rem', color: '#2a2a2a', marginBottom: 8 }}>
        Dashboard
      </h1>
      <p style={{ color: '#6a6a6a', fontSize: '0.875rem', marginBottom: 32 }}>
        Overview of Frame Lab Seoul operations
      </p>

      {/* Row 1: KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 32 }} className="kpi-grid">
        <div style={cardStyle}>
          <div style={{ fontSize: '0.8rem', color: '#6a6a6a', marginBottom: 8 }}>Active Clients</div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: '2rem', color: '#2d5f5d' }}>
            {stats.activeCount} / 15
          </div>
          <div style={{ fontSize: '0.8rem', color: '#6a6a6a', marginTop: 4 }}>
            {stats.maintenanceCount} Maintenance · {stats.growthCount} Growth · {stats.authorityCount} Authority
          </div>
        </div>

        <div style={cardStyle}>
          <div style={{ fontSize: '0.8rem', color: '#6a6a6a', marginBottom: 8 }}>Shoots This Month</div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: '2rem', color: '#2d5f5d' }}>
            {stats.febCompleted} / {stats.febTotal}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#6a6a6a', marginTop: 4 }}>
            {stats.nextShoot
              ? `Next: ${stats.nextShootClient?.name}, ${formatDate(stats.nextShoot.date)}`
              : 'No upcoming shoots'}
          </div>
        </div>

        <div style={cardStyle}>
          <div style={{ fontSize: '0.8rem', color: '#6a6a6a', marginBottom: 8 }}>Assets Delivered (MTD)</div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: '2rem', color: '#2d5f5d' }}>
            {stats.totalDelivered}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#6a6a6a', marginTop: 4 }}>
            {stats.photoCount} photos · {stats.videoCount} videos · {stats.creativeCount} creatives
          </div>
        </div>

        <div style={cardStyle}>
          <div style={{ fontSize: '0.8rem', color: '#6a6a6a', marginBottom: 8 }}>Monthly Revenue</div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: '2rem', color: '#2d5f5d' }}>
            {formatWon(stats.totalRevenue)}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#6a6a6a', marginTop: 4 }}>
            {stats.revenueChange !== 0
              ? `${stats.revenueChange > 0 ? '+' : ''}${formatWon(stats.revenueChange)} (${stats.revenueChange > 0 ? '+' : ''}${stats.revenueChangePct}%) MoM`
              : 'No change from last month'}
          </div>
        </div>
      </div>

      {/* Row 2: Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32 }} className="charts-grid">
        {/* Shoot Activity Bar Chart */}
        <div style={{ backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.08)', padding: 24 }}>
          <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: '1.1rem', color: '#2a2a2a', marginBottom: 20 }}>
            Shoot Activity
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={stats.shootActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6a6a6a' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#6a6a6a' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid rgba(0,0,0,0.08)',
                  borderRadius: 4,
                  fontSize: 12,
                }}
              />
              <Bar dataKey="shoots" fill="#2d5f5d" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue by Tier Donut */}
        <div style={{ backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.08)', padding: 24 }}>
          <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: '1.1rem', color: '#2a2a2a', marginBottom: 20 }}>
            Revenue by Tier
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={stats.revenueByTier}
                cx="50%"
                cy="45%"
                innerRadius={60}
                outerRadius={90}
                dataKey="value"
                strokeWidth={0}
              >
                {stats.revenueByTier.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => formatWon(value)}
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid rgba(0,0,0,0.08)',
                  borderRadius: 4,
                  fontSize: 12,
                }}
              />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                iconSize={8}
                formatter={(value) => <span style={{ color: '#6a6a6a', fontSize: 12 }}>{value}</span>}
              />
              {/* Center text */}
              <text x="50%" y="43%" textAnchor="middle" dominantBaseline="central" style={{ fontFamily: "'Fraunces', serif", fontSize: 16, fill: '#2d5f5d' }}>
                {formatWon(stats.totalRevenue)}
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 3: Tables */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="tables-grid">
        {/* Upcoming Shoots */}
        <div style={{ backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.08)', padding: 24 }}>
          <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: '1.1rem', color: '#2a2a2a', marginBottom: 16 }}>
            Upcoming Shoots
          </h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Client</th>
                <th style={thStyle}>Tier</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {stats.upcomingShootsTable.map((shoot, i) => (
                <tr key={shoot.id} style={{ backgroundColor: i % 2 === 1 ? '#faf8f6' : 'transparent' }}>
                  <td style={tdStyle}>{formatDate(shoot.date)}</td>
                  <td style={tdStyle}>
                    <Link to={`/clients/${shoot.clientId}`} style={{ color: '#2d5f5d' }}>
                      {shoot.client?.name}
                    </Link>
                  </td>
                  <td style={tdStyle}>
                    <TierBadge tier={shoot.client?.tier} tiers={tiers} />
                  </td>
                  <td style={tdStyle}>
                    <StatusBadge status={shoot.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Deliveries */}
        <div style={{ backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.08)', padding: 24 }}>
          <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: '1.1rem', color: '#2a2a2a', marginBottom: 16 }}>
            Recent Deliveries
          </h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Client</th>
                <th style={thStyle}>Assets</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentDeliveries.map((del, i) => (
                <tr key={del.id} style={{ backgroundColor: i % 2 === 1 ? '#faf8f6' : 'transparent' }}>
                  <td style={tdStyle}>{formatDate(del.date)}</td>
                  <td style={tdStyle}>
                    <Link to={`/clients/${del.clientId}`} style={{ color: '#2d5f5d' }}>
                      {del.client?.name}
                    </Link>
                  </td>
                  <td style={tdStyle}>{del.type}: {del.quantity}</td>
                  <td style={tdStyle}>
                    <StatusBadge status={del.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .kpi-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .charts-grid { grid-template-columns: 1fr !important; }
          .tables-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .kpi-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

const thStyle = {
  textAlign: 'left',
  padding: '10px 12px',
  fontSize: '0.75rem',
  fontWeight: 500,
  color: '#6a6a6a',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
}

const tdStyle = {
  padding: '12px 12px',
  fontSize: '0.85rem',
  borderBottom: '1px solid rgba(0,0,0,0.04)',
  color: '#2a2a2a',
}
