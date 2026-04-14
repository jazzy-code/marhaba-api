
import { getAuth } from "@clerk/express"
import { AuthService } from "./auth.service.js"
import type { Request, Response } from "express"
import { HTTPError } from "../../middlewares/errorHandler.js"

export const AuthController = {
  getAuthUser: async (req: Request, res: Response) => {
    // Use `getAuth()` to access user's ID in Clerk
    const { userId } = getAuth(req)

    if (!userId) {
      throw new HTTPError(401, "User not exists")
    }

    // Use userId as clerkId to get the user from internal Database
    const user = await AuthService.findByClerkId(userId)

    res.json(user)
  },
}
