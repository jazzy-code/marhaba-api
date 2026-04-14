
import { ServiceYachtService } from "./serviceYacht.service.js"
import type { Response } from "express"

export const ServiceYachtController = {
  list: async (_: any, res: Response) => {
    const list = await ServiceYachtService.findAll()
    res.json(list)
  },

  listAmenities: async (_: any, res: Response) => {
    const list = await ServiceYachtService.findAllAmenities()
    res.json(list)
  },

  listTripulationRoles: async (_: any, res: Response) => {
    const list = await ServiceYachtService.findAllTripulationRoles()
    res.json(list)
  }
}
