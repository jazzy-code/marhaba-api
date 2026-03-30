import prisma from "@/lib/prisma"
import { HTTPError } from "@/middlewares/errorHandler";
import { createServiceWithRelation } from "@/services/serviceCreator"
import { updateServiceWithRelation } from "@/services/serviceUpdater"
import { nullToEmptyString } from "@/utils/serviceFields"

const baseFields = [
  'durationMinutes',
  'hasEquipment',
];

// Nombres de las relaciones (lo que queda tras quitar "Id")
const relationFields: string[] = [];

const fieldsAllowed = [...baseFields, ...relationFields];

export const ServiceBeautySpaService = {

  create: async (data: any) => {

    const serviceType = await prisma.serviceType.findFirst({ where: { key: data.serviceType } })

    if (!serviceType) {
      throw new HTTPError(400, `Unsupported serviceType: ${data.serviceType}`)
    }

    return createServiceWithRelation({
      data: { ...data, serviceTypeId: serviceType.id },
      serviceModel: "serviceBeautySpa",
      manyToManyModels: ["beautySpaHasTreatments", "beautySpaHasProducts"],
      manyToManyForeignIds: ["beautySpaTreatmentId", "beautySpaProductId"]
    })

  },

  update: (id: number, data: any) => {

    return updateServiceWithRelation({
      id,
      data,
      fieldsAllowed,
      serviceModel: "serviceBeautySpa",
      manyToManyModels: ["beautySpaHasTreatments", "beautySpaHasProducts"],
      manyToManyForeignIds: ["beautySpaTreatmentId", "beautySpaProductId"]
    })

  },

  findAll: async () => {
    const result = await prisma.serviceBeautySpa.findMany({
      include: {
        service: { include: { serviceStatus: true, serviceType: true } },
        beautySpaHasProducts: {
          include: {
            beautySpaProduct: true
          }
        },
        beautySpaHasTreatments: {
          include: {
            beautySpaTreatment: true
          }
        }
      }
    })

    return nullToEmptyString(result)
  },

  findById: async (id: number) => {
    const result = await prisma.serviceBeautySpa.findUnique({
      where: { id },
      include: {
        service: { include: { serviceStatus: true, serviceType: true } },
        beautySpaHasProducts: {
          include: {
            beautySpaProduct: true
          }
        },
        beautySpaHasTreatments: {
          include: {
            beautySpaTreatment: true
          }
        }
      }
    })

    return nullToEmptyString(result)
  },

  findByServiceId: async (id: number) => {
    const result = await prisma.serviceBeautySpa.findFirst({
      where: { serviceId: id },
      include: {
        service: { include: { serviceStatus: true, serviceType: true } },
        beautySpaHasProducts: {
          include: {
            beautySpaProduct: true
          }
        },
        beautySpaHasTreatments: {
          include: {
            beautySpaTreatment: true
          }
        }
      }
    })

    return nullToEmptyString(result)
  },
  
  findAllProducts: () => prisma.beautySpaProduct.findMany(),
  
  findAllTreatments: () => prisma.beautySpaTreatment.findMany(),
}