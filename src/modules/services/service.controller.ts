
import { getAuth } from "@clerk/express"
import { ServiceService } from "./service.service.js"
import type { Response, Request } from "express"
import { AuthService } from "../auth/auth.service.js"
import { HTTPError } from "@/middlewares/errorHandler.js"

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

    const service = await ServiceService.create({ ...req.body, userId: user.id })

    res.json(service)
  },

  list: async (req: Request, res: Response) => {
    const categories = await ServiceService.findAll(req.query, req.user)
    res.json(categories)
  },

  listPublic: async (req: Request, res: Response) => {
    const categories = await ServiceService.findAllPublic(req.query)
    res.json(categories)
  },

  get: async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const service = await ServiceService.findById(id, req.user)
    res.json(service)
  },

  getPublic: async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const service = await ServiceService.findByIdPublic(id)
    res.json(service)
  },

  update: async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const service = await ServiceService.update(id, req.body)
    res.json(service)
  },

  approve: async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const service = await ServiceService.approve(id)
    res.json(service)
  },

  reject: async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const reason = req.body.reason
    const service = await ServiceService.reject(id, reason, req.user)
    res.json(service)
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

  uploadFiles: async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    const files = req.files as {
      heroImage?: Express.Multer.File[]
      providerLogo?: Express.Multer.File[]
      galleryFiles?: Express.Multer.File[]
    }

    const existingFileIds = req.body.existingFileIds

    const result = await ServiceService.uploadFiles(id, files, existingFileIds)

    res.json(result)
  }
}
