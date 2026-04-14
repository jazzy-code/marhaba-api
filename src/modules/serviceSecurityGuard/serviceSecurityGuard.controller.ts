
import { ServiceSecurityGuardService } from "./serviceSecurityGuard.service.js"
import type { Response } from "express"

export const ServiceSecurityGuardController = {
  list: async (_: any, res: Response) => {
    const list = await ServiceSecurityGuardService.findAll()
    res.json(list)
  },

  listBackgroundTypes: async (_: any, res: Response) => {
    const list = await ServiceSecurityGuardService.findAllBackgroundTypes()
    res.json(list)
  },

  listProfiles: async (_: any, res: Response) => {
    const list = await ServiceSecurityGuardService.findAllProfiles()
    res.json(list)
  },
}
