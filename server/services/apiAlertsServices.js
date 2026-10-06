import { ObjectId } from "mongodb"
import { alertSchema } from "../Schemas/alertSchema.js"
import { 
    createAlert,
    getAlerts,
    getAlertByID,
    deleteAlert,
    updateAlert
 } from "../DAL/apiAlertsDAL.js"
import { getUserService } from "./apiAuthServices.js"

export async function createAlertService(body, user) {
    const result = alertSchema.safeParse(body)
    
    if (!result.success) {
        const error = new Error("Invalid alert details")
        error.status = 400
        throw error
    }

    const alert = {
        ...result.data
    }

    const userFromDb = await getUserService(user.id)

    if(!userFromDb){
        const error = new Error("User Not Found");
        error.status = 404;
        throw error;
    }

    if((userFromDb.role === "arena_user" || userFromDb.role === "general_user") && body.arena !== userFromDb.assignedArena){
        const error = new Error("You are unauthrized to create an alert out of your assigned arena")
        error.status = 403
        throw error
    }
    
    const response = await createAlert(alert)

    return {
        id: response.insertedId.toString(),
        ...alert
    }
}

export async function getAlertsService(user) {
    const userFromDb = await getUserService(user.id)

    if(!userFromDb){
        const error = new Error("User Not Found");
        error.status = 404;
        throw error;
    }

    if(userFromDb.role === "arena_user"){
        const error = new Error("You are unauthrized to see all the alerts")
        error.status = 403
        throw error
    }

    const response = await getAlerts()

    return response
}

export async function getAlertByIDService(id, user) {
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

    const userFromDb = await getUserService(user.id)

    if(!userFromDb){
        const error = new Error("User Not Found");
        error.status = 404;
        throw error;
    }

    if(userFromDb.role === "arena_user" && response.arena !== userFromDb.assignedArena){
        const error = new Error("You are unauthrized to see this alert")
        error.status = 403
        throw error
    }

    return {
        id: response.insertedId.toString(),
        ...response
    }
}

export async function deleteAlertService(id, user) {
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

    const userFromDb = await getUserService(user.id)

    if(!userFromDb){
        const error = new Error("User Not Found");
        error.status = 404;
        throw error;
    }

    if((userFromDb.role === "arena_user" || userFromDb.role === "general_user") && isEsixt.arena !== userFromDb.assignedArena){
        const error = new Error("You are unauthrized to delete this alert")
        error.status = 403
        throw error
    }

    const response = await deleteAlert(id)
    
    return response
}

export async function updateAlertService(id, body, user) {
    const result = alertSchema.safeParse(body)

    if (!result.success) {
        const error = new Error("Invalid alert details")
        error.status = 400
        throw error
    }

    const updatedAlert = {
        ...result.data
    }

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

    const userFromDb = await getUserService(user.id)

    if(!userFromDb){
        const error = new Error("User Not Found");
        error.status = 404;
        throw error;
    }

    if(userFromDb.role === "arena_user" && isEsixt.arena !== userFromDb.assignedArena){
        const error = new Error("You are unauthrized to update this alert")
        error.status = 403
        throw error
    }

    if((userFromDb.role === "general_user" && isEsixt.arena !== userFromDb.assignedArena) 
        && (isEsixt.displayName !== updateAlert.displayName || isEsixt.description !== updateAlert.description
    || isEsixt.priority !== updateAlert.priority || isEsixt.arena !== updateAlert.arena)){
        const error = new Error("You are authrized to update only the status in this alert")
        error.status = 403
        throw error
    }

    const response = await updateAlert(id, updatedAlert)
    
    return {
        id: response.insertedId.toString(),
        ...response
    }
}