import { ObjectId } from "mongodb"
import db from "../db/db.js"

const alerts = db.collection("alerts")

export async function createAlert(alert) {
    return alerts.insertOne(alert)
}

export async function getAlerts() {
    return alerts.find().toArray()
}

export async function getAlertByID(id) {
    return alerts.findOne({_id: new ObjectId(id)})
}

export async function deleteAlert(id) {
    return alerts.findOneAndDelete({_id: new ObjectId(id)})
}