
import { ServiceGolfService } from "./serviceGolf.service"
import type { Response } from "express"

export const ServiceGolfController = {
  list: async (_: any, res: Response) => {
    const list = await ServiceGolfService.findAll()
    res.json(list)
  },

  listAmenities: async (_: any, res: Response) => {
    const list = await ServiceGolfService.findAllAmenities()
    res.json(list)
  },
}
