
import { ServiceLuxuryStayService } from "./serviceLuxuryStay.service"
import type { Response } from "express"

export const ServiceLuxuryStayController = {
  list: async (_: any, res: Response) => {
    const list = await ServiceLuxuryStayService.findAll()
    res.json(list)
  },

  listAmenities: async (_: any, res: Response) => {
    const list = await ServiceLuxuryStayService.findAllAmenities()
    res.json(list)
  },

  listCategories: async (_: any, res: Response) => {
    const list = await ServiceLuxuryStayService.findAllCategories()
    res.json(list)
  },

  listRooms: async (_: any, res: Response) => {
    const list = await ServiceLuxuryStayService.findAllRooms()
    res.json(list)
  },
}
