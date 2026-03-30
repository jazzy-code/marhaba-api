import { Router } from 'express'
import { ClerkWebhooksController } from './clerkWebhooks.controller'
import bodyParser from 'body-parser'

const router = Router()

router.post('/user', bodyParser.raw({ type: 'application/json' }), ClerkWebhooksController.userWebhooks)

export default router
