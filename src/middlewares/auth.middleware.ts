import { getAuth } from "@clerk/express"
import { RequestHandler } from "express"
import { HTTPError } from "./errorHandler.js"
import prisma from "@/lib/prisma";

export const requireAuth: RequestHandler = async (req, res, next) => {
  const auth = getAuth(req)
  const { isAuthenticated, userId } = auth

  if (!isAuthenticated) {
    throw new HTTPError(401, 'Unauthenticated user from Clerk')
  }

  const user = await prisma.user.findUnique({ where: { clerkId: userId } })

  req.user = user

  next()
}
