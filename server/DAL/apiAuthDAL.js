import { ObjectId } from "mongodb"
import db from "../db/db.js"

const users = db.collection("users")

export async function createUser(user) {
    return users.insertOne(user)
}

export async function findUserByEmail(email) {
    return users.findOne({email})
}