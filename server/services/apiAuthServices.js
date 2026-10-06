import bcrypt from "bcrypt"
import { userSchema } from "../Schemas/userSchema.js"
import { createUser,
    findUserByEmail
 } from "../DAL/apiAuthDAL.js"


export async function createUserService(body){
    const result = userSchema.safeParse(body)

     if (!result.success) {
        const error = new Error("Invalid user details")
        error.status = 400
        throw error
    }

    let user = {
        ...result.data
    }

    if(user.role === "arena_user" && user.assignedArena === "All"){
        const error = new Error("Arena user can't get access all arenas")
        error.status = 401
        throw error
    }

    const existingUser = await findUserByEmail(user.email)

    if(existingUser){
        const error = new Error("Email already exists")
        error.status = 409
        throw error
    }

    const passwordHash = await bcrypt.hash(user.password, 10)

    user.password = passwordHash

    const response = await createUser(user)

    return {
        id: response.insertedId.toString(),
        ...user
    }

}