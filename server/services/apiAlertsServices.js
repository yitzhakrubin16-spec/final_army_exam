import { alertSchema } from "../Schemas/alertSchema.js"
import { 
    createAlert,
    getAlerts
 } from "../DAL/apiAlertsDAL.js"

export async function createAlertService(body) {
    const result = alertSchema.safeParse(body)

    if (!result.success) {
        const error = new Error("Invalid alert details")
        error.status = 400
        throw error
    }

    const alert = {
        ...result.data
    }

    const response = await createAlert(alert)

    return {
        id: response.insertedId.toString(),
        ...alert
    }
}

export async function getAlertsService() {

    const response = await getAlerts()

    return response
}