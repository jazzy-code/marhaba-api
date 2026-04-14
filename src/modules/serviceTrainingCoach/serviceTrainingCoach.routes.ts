import { Router } from 'express'
import { ServiceTrainingCoachController } from './serviceTrainingCoach.controller.js'


const router = Router()

router.get('/disciplines', ServiceTrainingCoachController.listDisciplines)

export default router
