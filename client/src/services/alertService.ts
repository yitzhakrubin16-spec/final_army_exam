const API_URL = import.meta.env.VITE_API_URL

type CreateAlertData = {
  displayName: string
  description: string
  priority: "Low" | "Medium" | "High" | "Critical"
  arena: "North" | "Center" | "South"
  status: "Active" | "Handled"
  lon: number
  lat: number   
}

export async function createAlert(alertData: CreateAlertData) {
    const response = await fetch(`${API_URL}/api/alerts`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(alertData)
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message)
    }

    return data
}

export async function getAlerts() {
    const response = await fetch(`${API_URL}/api/alerts`)

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message)
    }

    return data
}

export async function updateAlert(alertData: CreateAlertData, id: string) {
    const response = await fetch(`${API_URL}/api/alerts/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(alertData)
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message)
    }

    return data
}

export async function deleteAlert(id: string) {
    const response = await fetch(`${API_URL}/api/alerts/${id}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message)
    }

    return data
}