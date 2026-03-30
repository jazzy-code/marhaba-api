import { Router } from 'express'
import { requireAuth } from './middlewares/auth.middleware'

import authRoutes from '@/modules/auth/auth.routes'
import categoryRoutes from '@/modules/categories/category.routes'
import servicesRoutes from '@/modules/services/service.routes'
import helpersRoutes from '@/modules/helpers/helpers.routes'

import serviceRealEstateRoutes from '@/modules/serviceRealEstate/serviceRealEstate.routes'
import serviceLuxuryCarRoutes from '@/modules/serviceLuxuryCar/serviceLuxuryCar.routes'
import serviceYachtRoutes from '@/modules/serviceYacht/serviceYacht.routes'
import serviceJetRoutes from '@/modules/serviceJet/serviceJet.routes'
import serviceLuxuryStayRoutes from '@/modules/serviceLuxuryStay/serviceLuxuryStay.routes'
import serviceSecurityGuardRoutes from '@/modules/serviceSecurityGuard/serviceSecurityGuard.routes'
import servicePrivateEventRoutes from '@/modules/servicePrivateEvent/servicePrivateEvent.routes'
import servicePrivateStaffRoutes from '@/modules/servicePrivateStaff/servicePrivateStaff.routes'
import serviceBeautySpaRoutes from '@/modules/serviceBeautySpa/serviceBeautySpa.routes'
import serviceGolfRoutes from '@/modules/serviceGolf/serviceGolf.routes'
import serviceMedicalCareRoutes from '@/modules/serviceMedicalCare/serviceMedicalCare.routes'
import serviceTraininCoachRoutes from '@/modules/serviceTrainingCoach/serviceTrainingCoach.routes'

const router = Router()

router.use('/auth', requireAuth, authRoutes)

router.use('/categories', categoryRoutes)
router.use('/helpers', helpersRoutes)
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
