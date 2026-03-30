import { Router } from 'express'
import { ServiceYachtController } from './serviceYacht.controller'
import { requireAuth } from '@/middlewares/auth.middleware'

const router = Router()

router.get('/amenities', ServiceYachtController.listAmenities)
router.get('/tripulation-roles', ServiceYachtController.listTripulationRoles)

export default router
