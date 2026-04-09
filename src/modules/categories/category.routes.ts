import { Router } from 'express'
import { CategoryController } from './category.controller'

const router = Router()

router.post('/', CategoryController.create)
router.get('/', CategoryController.list)
router.get('/:id', CategoryController.get)
router.put('/:id', CategoryController.update)
router.delete('/:id', CategoryController.delete)

export default router
