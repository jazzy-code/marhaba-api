
import { getAuth } from "@clerk/express"
import { ServiceService } from "./service.service"
import type { Response, Request } from "express"
import { AuthService } from "../auth/auth.service"
import { HTTPError } from "@/middlewares/errorHandler"

export const ServiceController = {
  create: async (req: Request, res: Response) => {
    const { userId } = getAuth(req)
    if (!userId) {
      throw new HTTPError(401, "User not exists in Clerk")
    }
    const user = await AuthService.findByClerkId(userId)

    if (!user) {
      throw new HTTPError(401, "User not exists internally")
    }

    const category = await ServiceService.create({ ...req.body, userId: user.id })

    res.json(category)
  },

  list: async (req: Request, res: Response) => {
    const categories = await ServiceService.findAll(req.query, req.user)
    res.json(categories)
  },

  get: async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const category = await ServiceService.findById(id, req.user)
    res.json(category)
  },

  update: async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const category = await ServiceService.update(id, req.body)
    res.json(category)
  },

  delete: async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    await ServiceService.delete(id)
    res.json({ ok: true })
  },

  listTypes: async (_: any, res: Response) => {
    const list = await ServiceService.findAllTypes()
    res.json(list)
  },

  listStatus: async (_: any, res: Response) => {
    const list = await ServiceService.findAllStatus()
    res.json(list)
  },

  listStats: async (req: Request, res: Response) => {
    const list = await ServiceService.findAllStats(req.user)
    res.json(list)
  },
}
