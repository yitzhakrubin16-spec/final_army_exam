const API_URL = import.meta.env.VITE_API_URL

export async function getAlerts() {
    const response = await fetch(`${API_URL}/api/alerts`)

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message)
    }

    return data
}