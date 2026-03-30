
import { ServiceLuxuryCarService } from "./serviceLuxuryCar.service"
import type { Response } from "express"

export const ServiceLuxuryCarController = {
  list: async (_: any, res: Response) => {
    const list = await ServiceLuxuryCarService.findAll()
    res.json(list)
  },

  listAmenities: async (_: any, res: Response) => {
    const list = await ServiceLuxuryCarService.findAllAmenities()
    res.json(list)
  },

  listColors: async (_: any, res: Response) => {
    const list = await ServiceLuxuryCarService.findAllColors()
    res.json(list)
  },

  listLegalSituations: async (_: any, res: Response) => {
    const list = await ServiceLuxuryCarService.findAllLegalSituations()
    res.json(list)
  },
}
