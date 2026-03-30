import { Router } from 'express'

import clerkWebhooksRoutes from './modules/clerkWebhooks/clerkWebhooks.routes'

const router = Router()

router.use('/clerk', clerkWebhooksRoutes)

export default router
