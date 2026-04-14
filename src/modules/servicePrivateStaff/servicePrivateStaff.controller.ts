
import { ServicePrivateStaffService } from "./servicePrivateStaff.service.js"
import type { Response } from "express"

export const ServicePrivateStaffController = {
  list: async (_: any, res: Response) => {
    const list = await ServicePrivateStaffService.findAll()
    res.json(list)
  },

  listQualifications: async (_: any, res: Response) => {
    const list = await ServicePrivateStaffService.findAllQualifications()
    res.json(list)
  },

  listRoles: async (_: any, res: Response) => {
    const list = await ServicePrivateStaffService.findAllRoles()
    res.json(list)
  },
}
