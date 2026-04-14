import { InquiryService } from "./inquiry.service.js"
import type { Response, Request } from "express"

export const InquiryController = {
  create: async (req: Request, res: Response) => {
    const inquiry = await InquiryService.create(req.body)
    res.json(inquiry)
  },

  list: async (req: Request, res: Response) => {
    const categories = await InquiryService.findAll(req.query, req.user)
    res.json(categories)
  },

  get: async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const inquiry = await InquiryService.findById(id, req.user)
    res.json(inquiry)
  },

  update: async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const inquiry = await InquiryService.update(id, req.body, req.user)
    res.json(inquiry)
  },

  delete: async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    await InquiryService.delete(id, req.user)
    res.json({ ok: true })
  },

  listArchived: async (req: Request, res: Response) => {
    const categories = await InquiryService.findAllArchived(req.query, req.user)
    res.json(categories)
  },

  listStats: async (req: Request, res: Response) => {
    const categories = await InquiryService.findAllStats(req.user)
    res.json(categories)
  },

  archive: async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const inquiry = await InquiryService.archive(id, req.user)
    res.json(inquiry)
  },

  contact: async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const inquiry = await InquiryService.contact(id, req.user)
    res.json(inquiry)
  }  
}
