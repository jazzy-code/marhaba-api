import { Router } from 'express'
import { ServiceRealEstateController } from './serviceRealEstate.controller.js'


const router = Router()

router.get('/services', ServiceRealEstateController.listServices)
router.get('/amenities', ServiceRealEstateController.listAmenities)
router.get('/types', ServiceRealEstateController.listTypes)
router.get('/stay-types', ServiceRealEstateController.listStayTypes)
router.get('/housing-status', ServiceRealEstateController.listHousingStatus)

export default router
