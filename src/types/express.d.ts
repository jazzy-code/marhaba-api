import { AuthObject } from "@clerk/express"

declare global {
  namespace Express {
    interface Request {
      auth?: any
      user?: any
    }
  }
}

export {}