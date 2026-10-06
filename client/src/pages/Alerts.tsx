import { useEffect, useState, type SubmitEvent } from "react"
import {deleteAlert,getAlerts,updateAlert,} from "../services/alertService"

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
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null)

  const [displayName, setDisplayName] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState<"Low" | "Medium" | "High" | "Critical">("Low")
  const [arena, setArena] = useState<"North" | "Center" | "South">("North")
  const [status, setStatus] = useState<"Active" | "Handled">("Active")
  const [lon, setLon] = useState(0)
  const [lat, setLat] = useState(0)
  const [error, setError] = useState("")
  const [showForm, setShowForm] = useState(false)

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

  function handleEditAlert(alert: Alert) {
    setSelectedAlert(alert)

    setDisplayName(alert.displayName)
    setDescription(alert.description)
    setPriority(alert.priority)
    setArena(alert.arena)
    setStatus(alert.status)
    setLon(alert.lon)
    setLat(alert.lat)

    setError("")
    setShowForm(true)
  }

  async function handleUpdateAlert(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!selectedAlert) {
      return
    }

    try {
      const updatedAlert = await updateAlert(
        {
          displayName,
          description,
          priority,
          arena,
          status,
          lon,
          lat,
        },
        selectedAlert.id
      )

      setAlerts((currentAlerts) =>
        currentAlerts.map((alert) =>
          alert.id === selectedAlert.id
            ? updatedAlert
            : alert
        )
      )

      setSelectedAlert(null)
      setShowForm(false)
      setError("")
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      }
    }
  }

  async function handleDeleteAlert(id: string) {
    try {
      await deleteAlert(id)

      setAlerts((currentAlerts) =>
        currentAlerts.filter((alert) => alert.id !== id)
      )

      setError("")
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      }
    }
  }

  return (
    <>
      <div>
        <h1>Alerts</h1>

        {error && <p>{error}</p>}

        <ol>
          {alerts.map((alert) => (
            <li key={alert.id}>
              <p>Title: {alert.displayName}</p>
              <p>Description: {alert.description}</p>
              <p>Priority: {alert.priority}</p>
              <p>Status: {alert.status}</p>
              <p>Arena: {alert.arena}</p>

              <button
                type="button"
                title="Edit alert"
                onClick={() => handleEditAlert(alert)}
              >
                🖋️
              </button>

              <button
                type="button"
                title="Delete alert"
                onClick={() => handleDeleteAlert(alert.id)}
              >
                🗑️
              </button>
            </li>
          ))}
        </ol>
      </div>

      {showForm && selectedAlert && (
        <div>
          <h3>
            Updating Alert: {selectedAlert.id}
          </h3>

          <form onSubmit={handleUpdateAlert}>
            <input
              type="text"
              placeholder="displayName"
              value={displayName}
              onChange={(e) =>
                setDisplayName(e.target.value)
              }
            />

            <textarea
              placeholder="description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            />

            <select
              value={priority}
              onChange={(e) =>
                setPriority(
                  e.target.value as "Low" | "Medium" | "High" | "Critical"
                )
              }
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>

            <select
              value={arena}
              onChange={(e) =>
                setArena(
                  e.target.value as "North" | "Center" | "South"
                )
              }
            >
              <option value="North">North</option>
              <option value="Center">Center</option>
              <option value="South">South</option>
            </select>

            <select
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value as "Active" | "Handled"
                )
              }
            >
              <option value="Active">Active</option>
              <option value="Handled">Handled</option>
            </select>

            <button type="submit">
              Update Alert
            </button>

            <button
              type="button"
              onClick={() => {
                setShowForm(false)
                setSelectedAlert(null)
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default Alerts
