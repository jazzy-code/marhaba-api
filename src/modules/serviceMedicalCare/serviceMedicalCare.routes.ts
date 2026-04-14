import { Router } from 'express'
import { ServiceMedicalCareController } from './serviceMedicalCare.controller.js'


const router = Router()

router.get('/attentions', ServiceMedicalCareController.listAttentions)
router.get('/services', ServiceMedicalCareController.listServices)
router.get('/specialties', ServiceMedicalCareController.listSpecialties)

export default router
