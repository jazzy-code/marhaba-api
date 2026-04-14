
import { ServiceBeautySpaService } from "./serviceBeautySpa.service.js"
import type { Response } from "express"

export const ServiceBeautySpaController = {
  list: async (_: any, res: Response) => {
    const list = await ServiceBeautySpaService.findAll()
    res.json(list)
  },

  listProducts: async (_: any, res: Response) => {
    const list = await ServiceBeautySpaService.findAllProducts()
    res.json(list)
  },

  listTreatments: async (_: any, res: Response) => {
    const list = await ServiceBeautySpaService.findAllTreatments()
    res.json(list)
  },
}
