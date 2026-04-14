import { Router } from 'express'
import { ServiceBeautySpaController } from './serviceBeautySpa.controller.js'
import { requireAuth } from '@/middlewares/auth.middleware'

const router = Router()

router.get('/products', ServiceBeautySpaController.listProducts)
router.get('/treatments', ServiceBeautySpaController.listTreatments)

export default router
