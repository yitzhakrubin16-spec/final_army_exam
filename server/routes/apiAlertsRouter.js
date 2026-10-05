import express from "express"
import { 
    postAlertController,
    getAlertsController,
    getAlertByIDController
 } from "../ctrls/alertsCtrl.js"

const router = express.Router()

router.post("/",  postAlertController)
router.get("/",  getAlertsController)
router.get("/:id",  getAlertByIDController)

export default router