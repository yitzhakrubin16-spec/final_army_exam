import express from "express"
import { 
    postAlertController,
    getAlertsController,
    getAlertByIDController,
    deleteAlertController,
    updateAlertController
 } from "../ctrls/alertsCtrl.js"
import {authMiddleware} from "../middleware/authMiddleware.js"
const router = express.Router()

router.post("/", authMiddleware, postAlertController)
router.get("/",  authMiddleware, getAlertsController)
router.get("/:id", authMiddleware, getAlertByIDController)
router.delete("/:id", authMiddleware,  deleteAlertController)
router.put("/:id", authMiddleware, updateAlertController)

export default router