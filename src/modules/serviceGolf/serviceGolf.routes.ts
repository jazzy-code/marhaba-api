import { Router } from 'express'
import { ServiceGolfController } from './serviceGolf.controller.js'
import { requireAuth } from '@/middlewares/auth.middleware'

const router = Router()

router.get('/amenities', ServiceGolfController.listAmenities)

export default router
