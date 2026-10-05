import { useEffect, useState } from "react"
import { getAlerts } from "../services/alertService"

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

function Alerts() {
    const [alerts, setAlerts] = useState<Alert[]>([])
    
    useEffect(() => {
        async function loadAlerts() {

        const response = await getAlerts()
        
        setAlerts(response.alerts)
        }

        loadAlerts()
    }, [])
    
    return (
       <div>
       <h1>Alerts</h1>
       <ol>
        {alerts.map((alert) => (<li key={alert.id}><p>Title: {alert.displayName}</p> 
          <p>Description: {alert.description}</p>
          <p>Priority: {alert.priority}</p> 
          <p>Status: {alert.status}</p> 
          <p>Arena: {alert.arena}</p></li>))}
       </ol>
       </div> 
  )
}

export default Alerts