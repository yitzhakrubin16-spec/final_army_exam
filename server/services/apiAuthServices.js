import bcrypt from "bcrypt"
import { userSchema, userLoginSchema } from "../Schemas/userSchema.js"
import { createUser,
    findUserByEmail,
    getAllUsers
 } from "../DAL/apiAuthDAL.js"
import { generateToken } from "../utils/generateToken.js"


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


export async function loginAuthService(body){
    const result = userLoginSchema.safeParse(body)

     if (!result.success) {
        const error = new Error("Invalid user details")
        error.status = 400
        throw error
    }

    const user = await findUserByEmail(result.data.email)
    
    if(!user){
        const error = new Error("User not found")
        error.status = 404
        throw error
    }

    const passwordMatch = await bcrypt.compare(result.data.password, user.password)

    if (!passwordMatch) {
        const error = new Error("Invalid email or password")
        error.status = 401
        throw error
    }

    const safeUser = {
        id: user._id,
        email: user.email,
        role: user.role,
        assignedArena: user.assignedArena
    }

    const token = generateToken(safeUser)

    return {
        ...safeUser,
        token
    }
}

export async function getAllUsersService() {
    const users = await getAllUsers()

    return users
}