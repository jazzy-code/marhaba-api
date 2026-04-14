import prisma from "@/lib/prisma.js"
import { HTTPError } from "@/middlewares/errorHandler.js";
import { createServiceWithRelation } from "@/services/serviceCreator.js"
import { updateServiceWithRelation } from "@/services/serviceUpdater.js"
import { nullToEmptyString } from "@/utils/serviceFields.js"

const baseFields = [
  'isArmed',
  'discretion',
  'minContractUnity',
  'minContractPeriod',
];

// Nombres de las relaciones (lo que queda tras quitar "Id")
const relationFields = [
  'securityGuardBackgroundTypeId'
];

const fieldsAllowed = [...baseFields, ...relationFields];

export const ServiceSecurityGuardService = {

  create: async (data: any) => {

    const serviceType = await prisma.serviceType.findFirst({ where: { key: data.serviceType } })

    if (!serviceType) {
      throw new HTTPError(400, `Unsupported serviceType: ${data.serviceType}`)
    }

    return createServiceWithRelation({
      data: { ...data, serviceTypeId: serviceType.id },
      serviceModel: "serviceSecurityGuard",
      manyToManyModels: ["securityGuardHasProfiles", "securityGuardHasLanguages"],
      manyToManyForeignIds: ["securityGuardProfileId", "languageId"]
    })

  },

  update: (id: number, data: any) => {

    return updateServiceWithRelation({
      id,
      data,
      fieldsAllowed,
      serviceModel: "serviceSecurityGuard",
      manyToManyModels: ["securityGuardHasProfiles", "securityGuardHasLanguages"],
      manyToManyForeignIds: ["securityGuardProfileId", "languageId"]
    })

  },

  findAll: async () => {
    const result = await prisma.serviceSecurityGuard.findMany({
      include: {
        service: { include: { serviceStatus: true, serviceType: true } },
        securityGuardHasProfiles: {
          include: {
            securityGuardProfile: true
          }
        },
        securityGuardHasLanguages: {
          include: {
            language: true
          }
        }
      }
    })

    return nullToEmptyString(result)
  },

  findById: async (id: number) => {
    const result = await prisma.serviceSecurityGuard.findUnique({
      where: { id },
      include: {
        service: { include: { serviceStatus: true, serviceType: true } },
        securityGuardHasProfiles: {
          include: {
            securityGuardProfile: true
          }
        },
        securityGuardHasLanguages: {
          include: {
            language: true
          }
        }
      }
    })

    return nullToEmptyString(result)
  },

  findByServiceId: async (id: number) => {
    const result = await prisma.serviceSecurityGuard.findFirst({
      where: { serviceId: id },
      include: {
        service: { include: { serviceStatus: true, serviceType: true } },
        securityGuardHasProfiles: {
          include: {
            securityGuardProfile: true
          }
        },
        securityGuardHasLanguages: {
          include: {
            language: true
          }
        }
      }
    })

    return nullToEmptyString(result)
  },

  findAllBackgroundTypes: () => prisma.securityGuardBackgroundType.findMany(),

  findAllProfiles: () => prisma.securityGuardProfile.findMany(),
}