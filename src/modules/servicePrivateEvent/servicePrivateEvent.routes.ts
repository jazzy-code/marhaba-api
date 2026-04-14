import { Router } from 'express'
import { ServicePrivateEventController } from './servicePrivateEvent.controller.js'


const router = Router()

router.get('/amenities', ServicePrivateEventController.listAmenities)
router.get('/types', ServicePrivateEventController.listTypes)

export default router
