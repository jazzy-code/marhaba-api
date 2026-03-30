
import { ServiceJetService } from "./serviceJet.service"
import type { Response } from "express"

export const ServiceJetController = {
  list: async (_: any, res: Response) => {
    const list = await ServiceJetService.findAll()
    res.json(list)
  },

  listAmenities: async (_: any, res: Response) => {
    const list = await ServiceJetService.findAllAmenities()
    res.json(list)
  },

  listCategories: async (_: any, res: Response) => {
    const list = await ServiceJetService.findAllCategories()
    res.json(list)
  },

  listCaterings: async (_: any, res: Response) => {
    const list = await ServiceJetService.findAllCaterings()
    res.json(list)
  },
}
