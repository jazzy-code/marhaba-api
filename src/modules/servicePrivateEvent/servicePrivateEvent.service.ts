import prisma from "../../lib/prisma.js"
import { HTTPError } from "../../middlewares/errorHandler.js";
import { createServiceWithRelation } from "../../services/serviceCreator.js"
import { updateServiceWithRelation } from "../../services/serviceUpdater.js"
import { nullToEmptyString } from "../../utils/serviceFields.js"

const baseFields = [
  'capacity',
  'leadTimeDays',
];

// Nombres de las relaciones (lo que queda tras quitar "Id")
const relationFields = [
  'privateEventTypeId',
];

const fieldsAllowed = [...baseFields, ...relationFields];

export const ServicePrivateEventService = {

  create: async (data: any) => {

    const serviceType = await prisma.serviceType.findFirst({ where: { key: data.serviceType } })

    if (!serviceType) {
      throw new HTTPError(400, `Unsupported serviceType: ${data.serviceType}`)
    }

    return createServiceWithRelation({
      data: { ...data, serviceTypeId: serviceType.id },
      serviceModel: "servicePrivateEvent",
      manyToManyModels: ["privateEventHasAmenities"],
      manyToManyForeignIds: ["privateEventAmenityId"]
    })

  },

  update: (id: number, data: any) => {

    return updateServiceWithRelation({
      id,
      data,
      fieldsAllowed,
      serviceModel: "servicePrivateEvent",
      manyToManyModels: ["privateEventHasAmenities"],
      manyToManyForeignIds: ["privateEventAmenityId"]
    })

  },

  findAll: async () => {
    const result = await prisma.servicePrivateEvent.findMany({
      include: {
        service: { include: { serviceStatus: true, serviceType: true } },
        privateEventType: true,
        privateEventHasAmenities: {
          include: {
            privateEventAmenity: true
          }
        }
      }
    })

    return nullToEmptyString(result)
  },

  findById: async (id: number) => {
    const result = await prisma.servicePrivateEvent.findUnique({
      where: { id },
      include: {
        service: { include: { serviceStatus: true, serviceType: true } },
        privateEventType: true,
        privateEventHasAmenities: {
          include: {
            privateEventAmenity: true
          }
        }
      }
    })

    return nullToEmptyString(result)
  },

  findByServiceId: async (id: number) => {
    const result = await prisma.servicePrivateEvent.findFirst({
      where: { serviceId: id },
      include: {
        service: { include: { serviceStatus: true, serviceType: true } },
        privateEventType: true,
        privateEventHasAmenities: {
          include: {
            privateEventAmenity: true
          }
        }
      }
    })

    return nullToEmptyString(result)
  },

  findAllTypes: () => prisma.privateEventType.findMany(),
  
  findAllAmenities: () => prisma.privateEventAmenity.findMany(),
}