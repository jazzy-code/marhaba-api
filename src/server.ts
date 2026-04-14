import express from "express"
import cors from "cors"
import "dotenv/config"
import routes from "./routes.js"
import webhooksRoutes from "./webhooks.routes"
import { clerkClient, clerkMiddleware, getAuth } from "@clerk/express"
import { requireAuth } from "./middlewares/auth.middleware"
import { errorHandlerMiddleware, NotFoundError } from "./middlewares/errorHandler"
import { httpLogger } from "./middlewares/logger.middleware"

const app = express()

app.use(cors())

app.get("/health", (_req, res) => {
  res.json({ ok: true })
})
// Webhooks must be initialized before express.json() because we need the raw request
app.use('/webhooks', webhooksRoutes)

app.use(express.json())

// Apply `clerkMiddleware()` to all routes
app.use(clerkMiddleware())

// Logger
app.use(httpLogger)

app.get('/user', requireAuth, async (req, res) => {

  console.log("AUTH DATA:", req.headers)

  // Use `getAuth()` to access `isAuthenticated` and the user's ID
  const { isAuthenticated, userId } = getAuth(req)

  console.log("AUTH DATA:", { isAuthenticated, userId })

  // If user isn't authenticated, return a 401 error
  if (!isAuthenticated) {
    return res.status(401).json({ error: 'User not authenticated' })
  }

  // Use `clerkClient` to access Clerk's JS Backend SDK methods
  // and get the user's User object
  const user = await clerkClient.users.getUser(userId)

  res.json(user)
})

// API Routes
app.use("/api", routes)

// Error Fallback for unhandled routes
app.use((req, res, next) => {
  next(new NotFoundError(`Route ${req.originalUrl} not found`))
})

app.use(errorHandlerMiddleware)

const PORT = process.env.PORT ?? 4000

app.listen(PORT, () => {
  console.log(`🚀 API running on port ${PORT}`)
})
