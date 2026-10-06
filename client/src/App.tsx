import './App.css'
import AlertsMap from './components/AlertsMap'
import { Route, Routes } from 'react-router-dom'
import Alerts from './pages/Alerts'
import MainPage from './pages/MainPage'
import AddAlert from './pages/AddAlert'
import { useEffect, useState } from 'react'
import { getAlerts } from './services/alertService'

type Alert = {
  id: string
  displayName: string
  description: string
  priority: "Low" | "Medium" | "High" | "Critical"
  arena: "North" | "Center" | "South"
  status: "Active" | "Handled"
  lon: number
  lat: number
}

function App() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [error, setError] = useState("")
  useEffect(() => {
      async function loadAlerts() {
        try {
          const response = await getAlerts()
          setAlerts(response.alerts)
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message)
          }
        }
      }
  
      loadAlerts()
    }, [])

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/alerts" element={<Alerts />} />
      <Route path="/map" element={<AlertsMap alerts={alerts} />} />
      <Route path="/add_alert" element={<AddAlert />} />
    </Routes>
  )
}

export default App
