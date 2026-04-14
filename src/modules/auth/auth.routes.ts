import { Router } from 'express'
import { AuthController } from './auth.controller.js'

const router = Router()

router.get('/me', AuthController.getAuthUser)

export default router
