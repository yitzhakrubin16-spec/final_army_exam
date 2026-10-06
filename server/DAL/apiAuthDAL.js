import { ObjectId } from "mongodb"
import db from "../db/db.js"

const users = db.collection("users")

export async function createUser(user) {
    return users.insertOne(user)
}

export async function findUserByEmail(email) {
    return users.findOne({email})
}

export async function getAllUsers() {
    return users.find().toArray()
}

export async function findUserById(id) {
    return users.findOne({_id : new ObjectId(id)})
}

export async function deleteUser(id) {
    return users.findOneAndDelete({_id: new ObjectId(id)})
}