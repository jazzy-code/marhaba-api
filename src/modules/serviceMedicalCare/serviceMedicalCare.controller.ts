
import { ServiceMedicalCareService } from "./serviceMedicalCare.service.js"
import type { Response } from "express"

export const ServiceMedicalCareController = {
  list: async (_: any, res: Response) => {
    const list = await ServiceMedicalCareService.findAll()
    res.json(list)
  },

  listAttentions: async (_: any, res: Response) => {
    const list = await ServiceMedicalCareService.findAllAttentions()
    res.json(list)
  },

  listServices: async (_: any, res: Response) => {
    const list = await ServiceMedicalCareService.findAllServices()
    res.json(list)
  },

  listSpecialties: async (_: any, res: Response) => {
    const list = await ServiceMedicalCareService.findAllSpecialties()
    res.json(list)
  }
}
