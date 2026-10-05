import express from "express"
import { 
    postAlertController,
    getAlertsController,
    getAlertByIDController,
    deleteAlertController
 } from "../ctrls/alertsCtrl.js"

const router = express.Router()

router.post("/",  postAlertController)
router.get("/",  getAlertsController)
router.get("/:id",  getAlertByIDController)
router.delete("/:id",  deleteAlertController)

export default router