import express from "express"
import { 
    postAlertController,
    getAlertsController,
    getAlertByIDController,
    deleteAlertController,
    updateAlertController
 } from "../ctrls/alertsCtrl.js"

const router = express.Router()

router.post("/",  postAlertController)
router.get("/",  getAlertsController)
router.get("/:id",  getAlertByIDController)
router.delete("/:id",  deleteAlertController)
router.put("/:id",  updateAlertController)

export default router