
import { HelpersService } from "./helpers.service.js"
import type { Request, Response } from "express"

export const HelpersController = {
  listCountries: async (_: any, res: Response) => {
    const list = await HelpersService.findAllCountries()
    res.json(list)
  },

  listMalagaRegions: async (_: any, res: Response) => {
    const list = await HelpersService.findAllMalagaRegions()
    res.json(list)
  },

  listMalagaCities: async (req: Request, res: Response) => {
    const regionId = Number(req.params.regionId)
    const list = await HelpersService.findAllMalagaCities(regionId)
    res.json(list)
  },

  listLanguages: async (_: any, res: Response) => {
    const list = await HelpersService.findAllLanguages()
    res.json(list)
  },
}
