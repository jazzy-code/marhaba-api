import prisma from "@/lib/prisma.js"
import { HTTPError } from "@/middlewares/errorHandler.js";
import { createServiceWithRelation } from "@/services/serviceCreator.js"
import { updateServiceWithRelation } from "@/services/serviceUpdater.js"
import { nullToEmptyString } from "@/utils/serviceFields.js"

const baseFields = [
  'totalHoles',
  'handicapRequiredMale',
  'handicapRequiredFemale',
  'maxPlayers',
  'greenFee',
  'conciergeFee',
  'isElectricBuggyIncluded',
];

// Nombres de las relaciones (lo que queda tras quitar "Id")
const relationFields: string[] = [];

const fieldsAllowed = [...baseFields, ...relationFields];

export const ServiceGolfService = {

  create: async (data: any) => {

    const serviceType = await prisma.serviceType.findFirst({ where: { key: data.serviceType } })

    if (!serviceType) {
      throw new HTTPError(400, `Unsupported serviceType: ${data.serviceType}`)
    }

    return createServiceWithRelation({
      data: { ...data, serviceTypeId: serviceType.id },
      serviceModel: "serviceGolf",
      manyToManyModels: ["golfHasAmenities"],
      manyToManyForeignIds: ["golfAmenityId"]
    })

  },

  update: (id: number, data: any) => {

    return updateServiceWithRelation({
      id,
      data,
      fieldsAllowed,
      serviceModel: "serviceGolf",
      manyToManyModels: ["golfHasAmenities"],
      manyToManyForeignIds: ["golfAmenityId"]
    })

  },

  findAll: async () => {
    const result = await prisma.serviceGolf.findMany({
      include: {
        service: { include: { serviceStatus: true, serviceType: true } },
        golfHasAmenities: {
          include: {
            golfAmenity: true
          }
        }
      }
    })

    return nullToEmptyString(result)
  },

  findById: async (id: number) => {
    const result = await prisma.serviceGolf.findUnique({
      where: { id },
      include: {
        service: { include: { serviceStatus: true, serviceType: true } },
        golfHasAmenities: {
          include: {
            golfAmenity: true
          }
        }
      }
    })

    return nullToEmptyString(result)
  },

  findByServiceId: async (id: number) => {
    const result = await prisma.serviceGolf.findFirst({
      where: { serviceId: id },
      include: {
        service: { include: { serviceStatus: true, serviceType: true } },
        golfHasAmenities: {
          include: {
            golfAmenity: true
          }
        }
      }
    })

    return nullToEmptyString(result)
  },

  findAllAmenities: () => prisma.golfAmenity.findMany(),
}