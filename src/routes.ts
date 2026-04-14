import { Router } from 'express'
import { requireAuth } from './middlewares/auth.middleware.js'

import authRoutes from './modules/auth/auth.routes.js'
import categoryRoutes from './modules/categories/category.routes.js'
import servicesRoutes from './modules/services/service.routes.js'
import servicesPublicRoutes from './modules/services/service.public.routes.js'
import helpersRoutes from './modules/helpers/helpers.routes.js'
import inquiriesRoutes from './modules/inquiries/inquiry.routes.js'

import serviceRealEstateRoutes from './modules/serviceRealEstate/serviceRealEstate.routes.js'
import serviceLuxuryCarRoutes from './modules/serviceLuxuryCar/serviceLuxuryCar.routes.js'
import serviceYachtRoutes from './modules/serviceYacht/serviceYacht.routes.js'
import serviceJetRoutes from './modules/serviceJet/serviceJet.routes.js'
import serviceLuxuryStayRoutes from './modules/serviceLuxuryStay/serviceLuxuryStay.routes.js'
import serviceSecurityGuardRoutes from './modules/serviceSecurityGuard/serviceSecurityGuard.routes.js'
import servicePrivateEventRoutes from './modules/servicePrivateEvent/servicePrivateEvent.routes.js'
import servicePrivateStaffRoutes from './modules/servicePrivateStaff/servicePrivateStaff.routes.js'
import serviceBeautySpaRoutes from './modules/serviceBeautySpa/serviceBeautySpa.routes.js'
import serviceGolfRoutes from './modules/serviceGolf/serviceGolf.routes.js'
import serviceMedicalCareRoutes from './modules/serviceMedicalCare/serviceMedicalCare.routes.js'
import serviceTraininCoachRoutes from './modules/serviceTrainingCoach/serviceTrainingCoach.routes.js'

const router = Router()

router.use('/public/services', servicesPublicRoutes)

router.use('/auth', requireAuth, authRoutes)

router.use('/categories', categoryRoutes)
router.use('/helpers', helpersRoutes)
router.use('/inquiries', inquiriesRoutes)
router.use('/services', requireAuth, servicesRoutes)

router.use('/service-real-estate', serviceRealEstateRoutes)
router.use('/service-luxury-car', serviceLuxuryCarRoutes)
router.use('/service-yacht', serviceYachtRoutes)
router.use('/service-jet', serviceJetRoutes)
router.use('/service-luxury-stay', serviceLuxuryStayRoutes)
router.use('/service-medical-care', serviceMedicalCareRoutes)
router.use('/service-security-guard', serviceSecurityGuardRoutes)
router.use('/service-private-event', servicePrivateEventRoutes)
router.use('/service-private-staff', servicePrivateStaffRoutes)
router.use('/service-beauty-spa', serviceBeautySpaRoutes)
router.use('/service-golf', serviceGolfRoutes)
router.use('/service-training-coach', serviceTraininCoachRoutes)

export default router
