import { Router } from 'express'
import { ServiceController } from './service.controller.js'
import { requireAdmin } from '@/middlewares/admin.middleware.js'
import { uploadFiles } from '@/middlewares/upload.middleware.js'

const router = Router()

router.get('/status', ServiceController.listStatus)
router.get('/types', ServiceController.listTypes)
router.get('/stats', ServiceController.listStats)

router.post('/', ServiceController.create)
router.get('/', ServiceController.list)
router.get('/:id', ServiceController.get)
router.put('/:id', ServiceController.update)
router.put('/:id/approve', requireAdmin, ServiceController.approve)
router.put('/:id/reject', requireAdmin, ServiceController.reject)
router.post('/:id/files', uploadFiles, ServiceController.uploadFiles)
router.delete('/:id', ServiceController.delete)

export default router
