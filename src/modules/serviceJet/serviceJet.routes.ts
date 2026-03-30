import { Router } from 'express'
import { ServiceJetController } from './serviceJet.controller'
import { requireAuth } from '@/middlewares/auth.middleware'

const router = Router()

router.get('/amenities', ServiceJetController.listAmenities)
router.get('/categories', ServiceJetController.listCategories)
router.get('/caterings', ServiceJetController.listCaterings)

export default router
