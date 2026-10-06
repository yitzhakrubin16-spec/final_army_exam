import { 
    createUserService,
    loginAuthService,
    getAllUsersService
 } from "../services/apiAuthServices.js"

export async function loginAuthController(req, res, next) {
    try {
        const user = await loginAuthService(req.body)
        res.status(201).json({user})
    } catch (error) {
        next(error)
    }
}

export async function getAllUsersController(req, res, next) {
    try {
        const users = await getAllUsersService()
        res.json({users})
    } catch (error) {
        next(error)
    }
}

// export async function getUserController(req, res, next) {
//     try {
//         const user = await getUserService(req.headers)
//         res.json({user})
//     } catch (error) {
//         next(error)
//     }
// }

// export async function deleteUserController(req, res, next) {
//     try {
//         const response = await deleteUserService(req.params.id)
//         res.json({
//             "message": "User deleted successfully",
//             "user": response     
//         })
//     } catch (error) {
//         next(error)
//     }
// }

export async function createUserController(req, res, next) {
    try {
        const user = await createUserService(req.body)
        res.status(200).json({"user created successfully" : user })
    } catch (error) {
        next(error)
    }
}