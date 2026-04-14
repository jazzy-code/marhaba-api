import { Router } from 'express'
import { ServiceLuxuryCarController } from './serviceLuxuryCar.controller.js'
import { requireAuth } from '@/middlewares/auth.middleware'

const router = Router()

router.get('/amenities', ServiceLuxuryCarController.listAmenities)
router.get('/colors', ServiceLuxuryCarController.listColors)
router.get('/legal-situations', ServiceLuxuryCarController.listLegalSituations)

export default router
