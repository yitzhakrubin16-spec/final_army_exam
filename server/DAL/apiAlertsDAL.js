import db from "../db/db.js"

const alerts = db.collection("alerts")

export async function createAlert(alert) {
    return alerts.insertOne(alert)
}