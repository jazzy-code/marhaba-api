import { Router } from 'express'
import { ServiceSecurityGuardController } from './serviceSecurityGuard.controller'
import { requireAuth } from '@/middlewares/auth.middleware'

const router = Router()

router.get('/background-types', ServiceSecurityGuardController.listBackgroundTypes)
router.get('/profiles', ServiceSecurityGuardController.listProfiles)

export default router
