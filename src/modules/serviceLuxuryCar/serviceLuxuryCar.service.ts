import prisma from "@/lib/prisma"
import { HTTPError } from "@/middlewares/errorHandler";
import { createServiceWithRelation } from "@/services/serviceCreator"
import { updateServiceWithRelation } from "@/services/serviceUpdater"
import { nullToEmptyString } from "@/utils/serviceFields"

const baseFields = [
  'modality',
  'brand',
  'model',
  'edition',
  'year',
  'transmission',
  'motorType',
  'cv',
  'passengersCapacity',
  'fullServiceHistory',
  'driveMode',
  'securityDeposit',
  'dailyKilometers',
  'minAge',
  'kilometers',
  'ownerType',
];

// Nombres de las relaciones (lo que queda tras quitar "Id")
const relationFields = [
  'luxuryCarLegalSituationId',
  'luxuryCarExteriorColorId',
  'luxuryCarInteriorColorId'
];

const fieldsAllowed = [...baseFields, ...relationFields];

export const ServiceLuxuryCarService = {

  create: async (data: any) => {

    const serviceType = await prisma.serviceType.findFirst({ where: { key: data.serviceType } })

    if (!serviceType) {
      throw new HTTPError(400, `Unsupported serviceType: ${data.serviceType}`)
    }

    return createServiceWithRelation({
      data: { ...data, serviceTypeId: serviceType.id },
      serviceModel: "serviceLuxuryCar",
      manyToManyModels: ["luxuryCarHasAmenities"],
      manyToManyForeignIds: ["luxuryCarAmenityId"]
    })

  },

  update: (id: number, data: any) => {

    return updateServiceWithRelation({
      id,
      data,
      fieldsAllowed,
      serviceModel: "serviceLuxuryCar",
      manyToManyModels: ["luxuryCarHasAmenities"],
      manyToManyForeignIds: ["luxuryCarAmenityId"]
    })

  },

  findAll: async () => {
    const result = await prisma.serviceLuxuryCar.findMany({
      include: {
        service: { include: { serviceStatus: true, serviceType: true } },
        luxuryCarHasAmenities: {
          include: {
            luxuryCarAmenity: true
          }
        }
      }
    })

    return nullToEmptyString(result)
  },

  findById: async (id: number) => {
    const result = await prisma.serviceLuxuryCar.findUnique({
      where: { id },
      include: {
        service: { include: { serviceStatus: true, serviceType: true } },
        luxuryCarHasAmenities: {
          include: {
            luxuryCarAmenity: true
          }
        }
      }
    })

    return nullToEmptyString(result)
  },

  findByServiceId: async (id: number) => {
    const result = await prisma.serviceLuxuryCar.findFirst({
      where: { serviceId: id },
      include: {
        service: { include: { serviceStatus: true, serviceType: true } },
        luxuryCarExteriorColor: true,
        luxuryCarInteriorColor: true,
        luxuryCarLegalSituation: true,
        luxuryCarHasAmenities: true,
      }
    })

    return nullToEmptyString(result)
  },

  findAllAmenities: () => prisma.luxuryCarAmenity.findMany(),

  findAllColors: () => prisma.luxuryCarColor.findMany(),

  findAllLegalSituations: () => prisma.luxuryCarLegalSituation.findMany(),
}