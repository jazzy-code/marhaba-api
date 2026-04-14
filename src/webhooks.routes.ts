import { Router } from 'express'

import clerkWebhooksRoutes from './modules/clerkWebhooks/clerkWebhooks.routes.js'

const router = Router()

router.use('/clerk', clerkWebhooksRoutes)

export default router
