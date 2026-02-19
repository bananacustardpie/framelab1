import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import { AppProvider } from './context/AppContext'
import Dashboard from './pages/Dashboard'
import Clients from './pages/Clients'
import ClientDetail from './pages/ClientDetail'
import Shoots from './pages/Shoots'
import Deliverables from './pages/Deliverables'
import Performance from './pages/Performance'
import Leads from './pages/Leads'

export default function App() {
  return (
    <AppProvider>
      <div className="flex min-h-screen" style={{ backgroundColor: '#f8f6f4' }}>
        <Sidebar />
        <main
          className="flex-1 lg:ml-[240px]"
          style={{ padding: '32px', minHeight: '100vh' }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/clients/:id" element={<ClientDetail />} />
            <Route path="/shoots" element={<Shoots />} />
            <Route path="/deliverables" element={<Deliverables />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/leads" element={<Leads />} />
          </Routes>
        </main>
      </div>
    </AppProvider>
  )
}
