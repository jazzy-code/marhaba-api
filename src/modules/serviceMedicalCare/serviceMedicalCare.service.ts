import prisma from "../../lib/prisma.js"
import { HTTPError } from "../../middlewares/errorHandler.js";
import { createServiceWithRelation } from "../../services/serviceCreator.js"
import { updateServiceWithRelation } from "../../services/serviceUpdater.js"
import { nullToEmptyString } from "../../utils/serviceFields.js"

const baseFields = [
  'certifications',
  'response',
  'isCleanupIncluded',
  'isServiceAndTravelIncluded',
];

// Nombres de las relaciones (lo que queda tras quitar "Id")
const relationFields: string[] = [];

const fieldsAllowed = [...baseFields, ...relationFields];

export const ServiceMedicalCareService = {

  create: async (data: any) => {

    const serviceType = await prisma.serviceType.findFirst({ where: { key: data.serviceType } })

    if (!serviceType) {
      throw new HTTPError(400, `Unsupported serviceType: ${data.serviceType}`)
    }

    return createServiceWithRelation({
      data: { ...data, serviceTypeId: serviceType.id },
      serviceModel: "serviceMedicalCare",
      manyToManyModels: ["medicalCareHasServices", "medicalCareHasLanguages", "medicalCareHasSpecialties", "medicalCareHasAttentions"],
      manyToManyForeignIds: ["medicalCareServiceId", "languageId", "medicalCareSpecialtyId", "medicalCareAttentionId"]
    })

  },

  update: (id: number, data: any) => {

    return updateServiceWithRelation({
      id,
      data,
      fieldsAllowed,
      serviceModel: "serviceMedicalCare",
      manyToManyModels: ["medicalCareHasServices", "medicalCareHasLanguages", "medicalCareHasSpecialties", "medicalCareHasAttentions"],
      manyToManyForeignIds: ["medicalCareServiceId", "languageId", "medicalCareSpecialtyId", "medicalCareAttentionId"]
    })

  },

  findAll: async () => {
    const result = await prisma.serviceMedicalCare.findMany({
      include: {
        service: { include: { serviceStatus: true, serviceType: true } },
        medicalCareHasServices: true,
        medicalCareHasLanguages: true,
        medicalCareHasSpecialties: true,
        medicalCareHasAttentions: {
          include: {
            medicalCareAttention: true
          }
        }
      }
    })

    return nullToEmptyString(result)
  },

  findById: async (id: number) => {
    const result = await prisma.serviceMedicalCare.findUnique({
      where: { id },
      include: {
        service: { include: { serviceStatus: true, serviceType: true } },
        medicalCareHasServices: {
          include: { serviceMedicalCare: true }
        },
        medicalCareHasLanguages: {
          include: { language: true }
        },
        medicalCareHasSpecialties: {
          include: { medicalCareSpecialty: true }
        },
        medicalCareHasAttentions: {
          include: {
            medicalCareAttention: true
          }
        }
      }
    })

    return nullToEmptyString(result)
  },

  findByServiceId: async (id: number) => {
    const result = await prisma.serviceMedicalCare.findFirst({
      where: { serviceId: id },
      include: {
        service: { include: { serviceStatus: true, serviceType: true } },
        medicalCareHasServices: {
          include: { serviceMedicalCare: true }
        },
        medicalCareHasLanguages: {
          include: { language: true }
        },
        medicalCareHasSpecialties: {
          include: { medicalCareSpecialty: true }
        },
        medicalCareHasAttentions: {
          include: {
            medicalCareAttention: true
          }
        }
      }
    })

    return nullToEmptyString(result)
  },
  
  findAllAttentions: () => prisma.medicalCareAttention.findMany(),
  
  findAllSpecialties: () => prisma.medicalCareSpecialty.findMany(),

  findAllServices: () => prisma.medicalCareService.findMany(),
}