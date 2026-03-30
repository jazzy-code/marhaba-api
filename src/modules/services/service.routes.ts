import { Router } from 'express'
import { ServiceController } from './service.controller'

const router = Router()

router.get('/status', ServiceController.listStatus)
router.get('/types', ServiceController.listTypes)
router.get('/stats', ServiceController.listStats)

router.post('/', ServiceController.create)
router.get('/', ServiceController.list)
router.get('/:id', ServiceController.get)
router.put('/:id', ServiceController.update)
router.delete('/:id', ServiceController.delete)

export default router
