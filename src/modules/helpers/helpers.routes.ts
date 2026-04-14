import { Router } from 'express'
import { HelpersController } from './helpers.controller.js'

const router = Router()

router.get('/countries', HelpersController.listCountries)
router.get('/malaga-regions', HelpersController.listMalagaRegions)
router.get(['/malaga-cities', '/malaga-cities/:regionId'], HelpersController.listMalagaCities)
router.get('/languages', HelpersController.listLanguages)

export default router
