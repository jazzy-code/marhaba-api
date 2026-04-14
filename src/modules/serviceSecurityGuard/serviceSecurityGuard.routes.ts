import { Router } from 'express'
import { ServiceSecurityGuardController } from './serviceSecurityGuard.controller.js'


const router = Router()

router.get('/background-types', ServiceSecurityGuardController.listBackgroundTypes)
router.get('/profiles', ServiceSecurityGuardController.listProfiles)

export default router
