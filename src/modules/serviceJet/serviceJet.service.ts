import prisma from "@/lib/prisma"
import { HTTPError } from "@/middlewares/errorHandler";
import { createServiceWithRelation } from "@/services/serviceCreator"
import { updateServiceWithRelation } from "@/services/serviceUpdater"
import { nullToEmptyString } from "@/utils/serviceFields"

const baseFields = [
  'modality',
  'model',
  'nmRange',
  'passengersCapacity',
  'lengthMeters',
  'maxSpeed',
  'totalHours'
];

// Nombres de las relaciones (lo que queda tras quitar "Id")
const relationFields = [
  'jetCategoryId',
  'jetCateringId',
];

const fieldsAllowed = [...baseFields, ...relationFields];

export const ServiceJetService = {

  create: async (data: any) => {

    const serviceType = await prisma.serviceType.findFirst({ where: { key: data.serviceType } })

    if (!serviceType) {
      throw new HTTPError(400, `Unsupported serviceType: ${data.serviceType}`)
    }

    return createServiceWithRelation({
      data: { ...data, serviceTypeId: serviceType.id },
      serviceModel: "serviceJet",
      manyToManyModels: ["jetHasAmenities"],
      manyToManyForeignIds: ["jetAmenityId"]
    })

  },

  update: (id: number, data: any) => {

    return updateServiceWithRelation({
      id,
      data,
      fieldsAllowed,
      serviceModel: "serviceJet",
      manyToManyModels: ["jetHasAmenities"],
      manyToManyForeignIds: ["jetAmenityId"]
    })

  },

  findAll: async () => {
    const result = await prisma.serviceJet.findMany({
      include: {
        service: { include: { serviceStatus: true, serviceType: true } },
        jetHasAmenities: {
          include: {
            jetAmenity: true
          }
        }
      }
    })

    return nullToEmptyString(result)
  },

  findById: async (id: number) => {
    const result = await prisma.serviceJet.findUnique({
      where: { id },
      include: {
        service: { include: { serviceStatus: true, serviceType: true } },
        jetHasAmenities: {
          include: {
            jetAmenity: true
          }
        }
      }
    })

    return nullToEmptyString(result)
  },

  findByServiceId: async (id: number) => {
    const result = await prisma.serviceJet.findFirst({
      where: { serviceId: id },
      include: {
        service: { include: { serviceStatus: true, serviceType: true } },
        jetCategory: true,
        jetCatering: true,
        jetHasAmenities: true,
      }
    })

    return nullToEmptyString(result)
  },

  findAllAmenities: () => prisma.jetAmenity.findMany(),

  findAllCategories: () => prisma.jetCategory.findMany(),

  findAllCaterings: () => prisma.jetCatering.findMany(),
}