import { ObjectId } from "mongodb"
import { alertSchema } from "../Schemas/alertSchema.js"
import { 
    createAlert,
    getAlerts,
    getAlertByID,
    deleteAlert
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

export async function getAlertByIDService(id) {
    if(!(ObjectId.isValid(id))){
        const error = new Error("Valid alert ID required");
        error.status = 400;
        throw error;
    }

    const response = await getAlertByID(id);

    if(!response){
        const error = new Error("Alert Not Found");
        error.status = 404;
        throw error;
    }

}

export async function deleteAlertService(id) {
    if(!(ObjectId.isValid(id))){
        const error = new Error("Valid alert ID required");
        error.status = 400;
        throw error;
    }

    const isEsixt = await getAlertByID(id);

    if(!isEsixt){
        const error = new Error("Alert Not Found");
        error.status = 404;
        throw error;
    }

    const response = await deleteAlert(id)
    
    return response
}