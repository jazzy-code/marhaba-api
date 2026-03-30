import { Router } from 'express'
import { CategoryController } from './category.controller'
import { clerkMiddleware } from '@clerk/express'
import { requireAuth } from '@/middlewares/auth.middleware'

const router = Router()

router.post('/', CategoryController.create)
router.get('/', requireAuth, CategoryController.list)
router.get('/:id', CategoryController.get)
router.put('/:id', CategoryController.update)
router.delete('/:id', CategoryController.delete)

export default router
