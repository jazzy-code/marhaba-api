import { Router } from 'express'
import { InquiryController } from './inquiry.controller'
import { requireAuth } from '@/middlewares/auth.middleware'

const router = Router()

router.post('/', InquiryController.create)
router.get('/', requireAuth, InquiryController.list)
router.get('/archived', requireAuth, InquiryController.listArchived)
router.get('/stats', requireAuth, InquiryController.listStats)
router.get('/:id', requireAuth, InquiryController.get)
router.put('/:id', requireAuth, InquiryController.update)
router.put('/:id/archive', requireAuth, InquiryController.archive)
router.put('/:id/contact', requireAuth, InquiryController.contact)
router.delete('/:id', requireAuth, InquiryController.delete)

export default router
