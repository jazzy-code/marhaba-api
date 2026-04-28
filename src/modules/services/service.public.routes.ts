import { Router } from 'express'
import { ServiceController } from './service.controller.js'

const router = Router()

router.get('/types', ServiceController.listTypes)
router.get('/latest', ServiceController.listLatestPublic)
router.get('/:id', ServiceController.getPublic)
router.get('/', ServiceController.listPublic)

export default router
