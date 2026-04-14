
import { ServiceTrainingCoachService } from "./serviceTrainingCoach.service.js"
import type { Response } from "express"

export const ServiceTrainingCoachController = {
  list: async (_: any, res: Response) => {
    const list = await ServiceTrainingCoachService.findAll()
    res.json(list)
  },

  listDisciplines: async (_: any, res: Response) => {
    const list = await ServiceTrainingCoachService.findAllDisciplines()
    res.json(list)
  }
}
