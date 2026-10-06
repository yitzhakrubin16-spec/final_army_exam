import express from "express"
import { 

    createUserController
 } from "../ctrls/authCtrl.js"
// import {authMiddleware} from "../middleware/authMiddleware.js"

const router = express.Router()

// router.post("/login",  loginAuthController)
// router.get("/me",  getUserController)
// router.get("/users",  getAllUsersController)
router.post("/register", createUserController)
// router.delete("/users/:id",  deleteUserController)

export default router