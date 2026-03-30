import prisma from "@/lib/prisma"
import { HTTPError } from "@/middlewares/errorHandler";
import { createServiceWithRelation } from "@/services/serviceCreator"
import { updateServiceWithRelation } from "@/services/serviceUpdater"
import { nullToEmptyString } from "@/utils/serviceFields"

const baseFields = [
  'totalGuests',
  'checkIn',
  'checkOut',
  'cancelation',
];

// Nombres de las relaciones (lo que queda tras quitar "Id")
const relationFields = [
  'luxuryStayCategoryId',
  'luxuryStayRoomId',
];

const fieldsAllowed = [...baseFields, ...relationFields];

export const ServiceLuxuryStayService = {

  create: async (data: any) => {

    const serviceType = await prisma.serviceType.findFirst({ where: { key: data.serviceType } })

    if (!serviceType) {
      throw new HTTPError(400, `Unsupported serviceType: ${data.serviceType}`)
    }

    return createServiceWithRelation({
      data: { ...data, serviceTypeId: serviceType.id },
      serviceModel: "serviceLuxuryStay",
      manyToManyModels: ["luxuryStayHasAmenities"],
      manyToManyForeignIds: ["luxuryStayAmenityId"]
    })

  },

  update: (id: number, data: any) => {

    return updateServiceWithRelation({
      id,
      data,
      fieldsAllowed,
      serviceModel: "serviceLuxuryStay",
      manyToManyModels: ["luxuryStayHasAmenities"],
      manyToManyForeignIds: ["luxuryStayAmenityId"]
    })

  },

  findAll: async () => {
    const result = await prisma.serviceLuxuryStay.findMany({
      include: {
        service: { include: { serviceStatus: true, serviceType: true } },
        luxuryStayHasAmenities: {
          include: {
            luxuryStayAmenity: true
          }
        }
      }
    })

    return nullToEmptyString(result)
  },

  findById: async (id: number) => {
    const result = await prisma.serviceLuxuryStay.findUnique({
      where: { id },
      include: {
        service: { include: { serviceStatus: true, serviceType: true } },
        luxuryStayHasAmenities: {
          include: {
            luxuryStayAmenity: true
          }
        }
      }
    })

    return nullToEmptyString(result)
  },

  findByServiceId: async (id: number) => {
    const result = await prisma.serviceLuxuryStay.findFirst({
      where: { serviceId: id },
      include: {
        service: { include: { serviceStatus: true, serviceType: true } },
        luxuryStayCategory: true,
        luxuryStayRoom: true,
        luxuryStayHasAmenities: true,
      }
    })

    return nullToEmptyString(result)
  },

  findAllAmenities: () => prisma.luxuryStayAmenity.findMany(),

  findAllCategories: () => prisma.luxuryStayCategory.findMany(),

  findAllRooms: () => prisma.luxuryStayRoom.findMany(),
}