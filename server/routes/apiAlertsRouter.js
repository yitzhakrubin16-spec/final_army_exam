import express from "express"
import { 
    postAlertController,
    getAlertsController
 } from "../ctrls/alertsCtrl.js"

const router = express.Router()

router.post("/",  postAlertController)
router.get("/",  getAlertsController)

export default router