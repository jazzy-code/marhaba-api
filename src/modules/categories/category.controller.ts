import { CategoryService } from "./category.service"
import type { Response, Request } from "express"

export const CategoryController = {
  create: async (req: Request, res: Response) => {
    const category = await CategoryService.create(req.body)
    res.json(category)
  },

  list: async (_: any, res: Response) => {
    const categories = await CategoryService.findAll()
    res.json(categories)
  },

  get: async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const category = await CategoryService.findById(id)
    res.json(category)
  },

  update: async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const category = await CategoryService.update(id, req.body)
    res.json(category)
  },

  delete: async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    await CategoryService.delete(id)
    res.json({ ok: true })
  }
}
