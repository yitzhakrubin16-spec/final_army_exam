import { 
    createAlertService,
    getAlertsService,
    getAlertByIDService,
    deleteAlertService
 } from "../services/apiAlertsServices.js"

export async function postAlertController(req, res, next) {
    try {
        const alert = await createAlertService(req.body)
        res.status(201).json({alert})
    } catch (error) {
        next(error)
    }
}

export async function getAlertsController(req, res, next) {
    try {
        const alerts = await getAlertsService()
        res.json({alerts})
    } catch (error) {
        next(error)
    }
}

export async function getAlertByIDController(req, res, next) {
    try {
        const alert = await getAlertByIDService(req.params.id)
        res.json({alert})
    } catch (error) {
        next(error)
    }
}

export async function deleteAlertController(req, res, next) {
    try {
        const response = await deleteAlertService(req.params.id)
        res.json({
            "message": "Alert deleted successfully",
            "alert": response     
        })
    } catch (error) {
        next(error)
    }
}