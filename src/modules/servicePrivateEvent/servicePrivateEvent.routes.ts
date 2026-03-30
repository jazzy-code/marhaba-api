import { Router } from 'express'
import { ServicePrivateEventController } from './servicePrivateEvent.controller'
import { requireAuth } from '@/middlewares/auth.middleware'

const router = Router()

router.get('/amenities', ServicePrivateEventController.listAmenities)
router.get('/types', ServicePrivateEventController.listTypes)

export default router
