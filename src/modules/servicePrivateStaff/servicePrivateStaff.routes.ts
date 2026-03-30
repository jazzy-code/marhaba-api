import { Router } from 'express'
import { ServicePrivateStaffController } from './servicePrivateStaff.controller'
import { requireAuth } from '@/middlewares/auth.middleware'

const router = Router()

router.get('/qualifications', ServicePrivateStaffController.listQualifications)
router.get('/roles', ServicePrivateStaffController.listRoles)

export default router
