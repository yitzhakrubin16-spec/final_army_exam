import { useState, type SubmitEvent } from "react"
import { createAlert } from "../services/alertService"


function AddAlert() {
    const [displayName, setDisplayName] = useState("")
    const [description, setDescription] = useState("")
    const [priority, setPriority] = useState<"Low" | "Medium" | "High" | "Critical">("Low")
    const [arena, setArena] = useState<"North" | "Center" | "South">("North")
    const [status, setStatus] = useState<"Active" | "Handled">("Active")
    const [lon, setLon] = useState(0)
    const [lat, setLat] = useState(0)
    const [error, setError] = useState("")

    async function handleCreateAlert(e: SubmitEvent<HTMLFormElement>) {
      e.preventDefault()

      try {
        await createAlert({
          displayName,
          description,
          priority,
          arena,
          status,
          lon,
          lat
        })

        setDisplayName("")
        setDescription("")
        setPriority("Low")
        setArena("North")
        setStatus("Active")
        setLon(0)
        setLat(0)
        setError("")

      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        }
      }
    }

    return (
       <>
       <h1>Add Alert</h1>
       <form onSubmit={handleCreateAlert}>
        <input type="text" 
        placeholder="displayName"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        />
        <textarea placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)} 
        />
        
        <select value={priority}
        onChange={(e) => 
          setPriority(
            e.target.value as "Low" | "Medium" | "High" | "Critical")}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
        </select>

        <select value={arena}
        onChange={(e) => 
          setArena(
            e.target.value as "North" | "Center" | "South")}>
              <option value="North">North</option>
              <option value="Center">Center</option>
              <option value="South">South</option>
        </select>

        <select value={status}
        onChange={(e) => 
          setStatus(
            e.target.value as "Active" | "Handled")}>
              <option value="Active">Active</option>
              <option value="Handled">Handled</option>
        </select>

        Longitude:<input type="number" 
        step="any"
        value={lon}
        onChange={(e) => setLon(parseFloat(e.target.value))}
        />

        Latitude:<input type="number" 
        step="any"
        value={lat}
        onChange={(e) => setLat(parseFloat(e.target.value))}
        />

        <button type="submit">Create Alert</button>
        {error && <p>{error}</p>}    
       </form>
       </> 
  )
}

export default AddAlert
