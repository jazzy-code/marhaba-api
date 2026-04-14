import { Router } from 'express'
import { ServicePrivateStaffController } from './servicePrivateStaff.controller.js'


const router = Router()

router.get('/qualifications', ServicePrivateStaffController.listQualifications)
router.get('/roles', ServicePrivateStaffController.listRoles)

export default router
