import { Router } from 'express'
import { ServiceLuxuryStayController } from './serviceLuxuryStay.controller.js'

const router = Router()

router.get('/amenities', ServiceLuxuryStayController.listAmenities)
router.get('/categories', ServiceLuxuryStayController.listCategories)
router.get('/rooms', ServiceLuxuryStayController.listRooms)

export default router
