import { Router } from 'express'
import { ServiceBeautySpaController } from './serviceBeautySpa.controller.js'

const router = Router()

router.get('/products', ServiceBeautySpaController.listProducts)
router.get('/treatments', ServiceBeautySpaController.listTreatments)

export default router
