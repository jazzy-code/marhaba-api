import { Router } from 'express'
import { ServiceTrainingCoachController } from './serviceTrainingCoach.controller'
import { requireAuth } from '@/middlewares/auth.middleware'

const router = Router()

router.get('/disciplines', ServiceTrainingCoachController.listDisciplines)

export default router
