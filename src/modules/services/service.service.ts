import prisma from "@/lib/prisma";
import { HTTPError } from "@/middlewares/errorHandler";
import { ServiceRealEstateService } from "../serviceRealEstate/serviceRealEstate.service";
import { ServiceLuxuryCarService } from "../serviceLuxuryCar/serviceLuxuryCar.service";
import { ServiceYachtService } from "../serviceYacht/serviceYacht.service";
import { ServiceLuxuryStayService } from "../serviceLuxuryStay/serviceLuxuryStay.service";
import { ServiceJetService } from "../serviceJet/serviceJet.service";
import { ServiceMedicalCareService } from "../serviceMedicalCare/serviceMedicalCare.service";
import { ServiceSecurityGuardService } from "../serviceSecurityGuard/serviceSecurityGuard.service";
import { ServicePrivateEventService } from "../servicePrivateEvent/servicePrivateEvent.service";
import { ServicePrivateStaffService } from "../servicePrivateStaff/servicePrivateStaff.service";
import { ServiceBeautySpaService } from "../serviceBeautySpa/serviceBeautySpa.service";
import { ServiceGolfService } from "../serviceGolf/serviceGolf.service";
import { ServiceTrainingCoachService } from "../serviceTrainingCoach/serviceTrainingCoach.service";
import { nullToEmptyString } from "@/utils/serviceFields";


const serviceModules: Record<string, any> = {
  RealEstate: ServiceRealEstateService,
  LuxuryCar: ServiceLuxuryCarService,
  ServiceYacht: ServiceYachtService,
  Jet: ServiceJetService,
  LuxuryStay: ServiceLuxuryStayService,
  MedicalCare: ServiceMedicalCareService,
  SecurityGuard: ServiceSecurityGuardService,
  PrivateEvent: ServicePrivateEventService,
  PrivateStaff: ServicePrivateStaffService,
  BeautySpa: ServiceBeautySpaService,
  Golf: ServiceGolfService,
  TrainingCoach: ServiceTrainingCoachService
}

export const ServiceService = {
  create: (data: any) => {
    const { serviceType } = data

    if (!serviceType) {
      throw new HTTPError(400, "serviceType is required")
    }

    const module = serviceModules[serviceType]

    if (!module) {
      throw new HTTPError(400, `Unsupported serviceType: ${serviceType}`)
    }

    return module.create(data)
  },

  findAll: async (params: any, user: any) => {
    const page = Number(params.page) || 1
    const size = Number(params.size) || 10
    const skip = (page - 1) * size
    const sort = params.sort || "createdAt"
    const order = params.order || "desc"
    const search = params.search
    const serviceSlug = params.slug

    const where: any = {}
    if (search) {
      where.title = { contains: search }
    }
    // Validate if user is ADMIN or USER to fetch all or only user's services
    if (user.userType !== "ADMIN") {
      where.userId = user.id
    }

    if (serviceSlug) {
      where.serviceType = { slug: serviceSlug }
    }

    const [data, total] = await Promise.all([
      prisma.service.findMany({
        where,
        skip,
        take: size,
        orderBy: { [sort]: order },
        include: {
          serviceType: true,
          serviceStatus: true,
          user: true,

          // Services
          serviceRealEstate: true,
          serviceLuxuryCar: true,
          serviceYacht: true,
          serviceJet: true,
          serviceLuxuryStay: true,
          serviceMedicalCare: true,
          serviceSecurityGuard: true,
          servicePrivateEvent: true,
          servicePrivateStaff: true,
          serviceBeautySpa: true,
          serviceGolf: true,
          serviceTrainingCoach: true,
        }
      }),
      prisma.service.count({
        where
      }),
    ])

    return {
      data,
      total,
      page,
      size,
      totalPages: Math.ceil(total / size)
    }
  },

  findById: async (id: number, user: any) => {
    const where: any = { id }

    if (user.userType !== "ADMIN") {
      where.userId = user.id
    }
    const service = await prisma.service.findUnique({
      where,
      include: {
        serviceType: true,
        serviceStatus: true,
        user: true,
        city: true,
        region: true,

        // Services
        serviceRealEstate: {
          include: {
            realEstateType: true,
            realEstateHasAmenities: {
              include: {
                realEstateAmenity: true
              }
            },
            realEstateHasServices: { 
              include: { 
                realEstateService: true
              } 
            }
          } 
        },
        serviceLuxuryCar: { include: { luxuryCarHasAmenities: { include: { luxuryCarAmenity: true } } } },
        serviceYacht: true,
        serviceJet: true,
        serviceLuxuryStay: {
          include: {
            luxuryStayCategory: true,
            luxuryStayRoom: true,
            luxuryStayHasAmenities: {
              include: {
                luxuryStayAmenity: true
              }
            }
          }
        },
        serviceMedicalCare: true,
        serviceSecurityGuard: { include: { securityGuardHasProfiles: true, securityGuardHasLanguages: true } },
        servicePrivateEvent: true,
        servicePrivateStaff: true,
        serviceBeautySpa: true,
        serviceGolf: true,
        serviceTrainingCoach: true,
      }
    })

    if (!service) {
      throw new HTTPError(404, "Service not found")
    }

    return nullToEmptyString(service)
  },

  update: (id: number, data: any) => {
    const { serviceType } = data

    const module = serviceModules[serviceType]

    if (!module) {
      throw new HTTPError(400, `Unsupported serviceType: ${serviceType}`)
    }

    return module.update(id, data)
  },

  delete: async (id: number) => {
    const service = await prisma.service.findUnique({
      where: { id }
    })

    if (!service) {
      throw new HTTPError(404, "Service not found")
    }

    return await prisma.service.delete({
      where: { id }
    })
  },

  findAllTypes: () => prisma.serviceType.findMany(),

  findAllStatus: () => prisma.serviceStatus.findMany(),

  findAllStats: async (user: any) => {
    const where: any = {}

    if (user.userType !== "ADMIN") {
      where.userId = user.id
    }
    
    const [total, totalPending, totalApproved, totalRejected] = await Promise.all([
      prisma.service.count({
        where
      }),
      prisma.service.count({
        where: { ...where, serviceStatusId: 1 },
      }),
      prisma.service.count({
        where: { ...where, serviceStatusId: 2 },
      }),
      prisma.service.count({
        where: { ...where, serviceStatusId: 3 },
      }),
    ])

    return {
      total,
      totalPending,
      totalApproved,
      totalRejected
    }
  }
}
