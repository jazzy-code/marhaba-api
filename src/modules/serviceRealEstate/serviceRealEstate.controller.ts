
import { ServiceRealEstateService } from "./serviceRealEstate.service.js"
import type { Response } from "express"

export const ServiceRealEstateController = {
  list: async (_: any, res: Response) => {
    const list = await ServiceRealEstateService.findAll()
    res.json(list)
  },

  listAmenities: async (_: any, res: Response) => {
    const list = await ServiceRealEstateService.findAllAmenities()
    res.json(list)
  },

  listServices: async (_: any, res: Response) => {
    const list = await ServiceRealEstateService.findAllServices()
    res.json(list)
  },

  listTypes: async (_: any, res: Response) => {
    const list = await ServiceRealEstateService.findAllTypes()
    res.json(list)
  },

  listStayTypes: async (_: any, res: Response) => {
    const list = await ServiceRealEstateService.findAllStayTypes()
    res.json(list)
  },

  listHousingStatus: async (_: any, res: Response) => {
    const list = await ServiceRealEstateService.findAllHousingStatus()
    res.json(list)
  },
}
