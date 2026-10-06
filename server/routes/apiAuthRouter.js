import express from "express"
import { 
    loginAuthController,
    getUserController,
    getAllUsersController,
    createUserController,
    deleteUserController
 } from "../ctrls/authCtrl.js"
import {authMiddleware} from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/login", loginAuthController)
router.get("/me",  authMiddleware, getUserController)
router.get("/users", authMiddleware, getAllUsersController)
router.post("/register", authMiddleware, createUserController)
router.delete("/users/:id", authMiddleware, deleteUserController)

export default router