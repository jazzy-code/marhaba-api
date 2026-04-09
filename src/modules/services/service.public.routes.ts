import { Router } from 'express'
import { ServiceController } from './service.controller'

const router = Router()

router.get('/types', ServiceController.listTypes)
router.get('/:id', ServiceController.getPublic)
router.get('/', ServiceController.listPublic)

export default router
