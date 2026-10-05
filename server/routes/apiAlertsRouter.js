import express from "express"
import { postAlertController } from "../ctrls/alertsCtrl.js"

const router = express.Router()

router.post("/",  postAlertController)

export default router