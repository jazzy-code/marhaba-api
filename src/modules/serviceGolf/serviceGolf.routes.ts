import { Router } from 'express'
import { ServiceGolfController } from './serviceGolf.controller.js'

const router = Router()

router.get('/amenities', ServiceGolfController.listAmenities)

export default router
