
import { ServicePrivateEventService } from "./servicePrivateEvent.service.js"
import type { Response } from "express"

export const ServicePrivateEventController = {
  list: async (_: any, res: Response) => {
    const list = await ServicePrivateEventService.findAll()
    res.json(list)
  },

  listAmenities: async (_: any, res: Response) => {
    const list = await ServicePrivateEventService.findAllAmenities()
    res.json(list)
  },

  listTypes: async (_: any, res: Response) => {
    const list = await ServicePrivateEventService.findAllTypes()
    res.json(list)
  },
}
