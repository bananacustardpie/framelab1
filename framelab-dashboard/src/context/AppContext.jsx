import { createContext, useContext, useState } from 'react'
import { clients as initialClients, tiers, shoots as initialShoots, deliverables as initialDeliverables, socialPosts as initialSocialPosts, conversions as initialConversions, leads as initialLeads } from '../data/seedData'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [clients, setClients] = useState(initialClients)
  const [shoots, setShoots] = useState(initialShoots)
  const [deliverables, setDeliverables] = useState(initialDeliverables)
  const [socialPosts, setSocialPosts] = useState(initialSocialPosts)
  const [conversions, setConversions] = useState(initialConversions)
  const [leads, setLeads] = useState(initialLeads)

  const addShoot = (shoot) => {
    setShoots(prev => [...prev, { ...shoot, id: Math.max(...prev.map(s => s.id)) + 1 }])
  }

  const addDeliverable = (deliverable) => {
    setDeliverables(prev => [...prev, { ...deliverable, id: Math.max(...prev.map(d => d.id)) + 1 }])
  }

  const updateDeliverableStatus = (id, status) => {
    setDeliverables(prev => prev.map(d => d.id === id ? { ...d, status } : d))
  }

  const addLead = (lead) => {
    setLeads(prev => [...prev, { ...lead, id: Math.max(...prev.map(l => l.id)) + 1 }])
  }

  const addConversion = (conversion) => {
    setConversions(prev => [...prev, { ...conversion, id: Math.max(...prev.map(c => c.id)) + 1 }])
  }

  return (
    <AppContext.Provider value={{
      clients, setClients,
      tiers,
      shoots, setShoots, addShoot,
      deliverables, setDeliverables, addDeliverable, updateDeliverableStatus,
      socialPosts, setSocialPosts,
      conversions, setConversions, addConversion,
      leads, setLeads, addLead,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useApp must be used within AppProvider')
  return context
}
