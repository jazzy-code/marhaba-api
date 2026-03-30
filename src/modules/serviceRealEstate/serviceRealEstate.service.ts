import prisma from "@/lib/prisma"
import { HTTPError } from "@/middlewares/errorHandler";
import { createServiceWithRelation } from "@/services/serviceCreator"
import { updateServiceWithRelation } from "@/services/serviceUpdater"
import { nullToEmptyString } from "@/utils/serviceFields"

const baseFields = [
  'modality',
  'surfaceBuiltMt2',
  'surfaceTerraceMt2',
  'surfacePlotMt2',
  'rooms',
  'fullBathrooms',
  'halfBathrooms',
  'touristLicense',
  'guestsCapacity'
];

// Nombres de las relaciones (lo que queda tras quitar "Id")
const relationFields = [
  'realEstateTypeId',
  'realEstateStayTypeId',
  'realEstateHousingStatusId'
];

const fieldsAllowed = [...baseFields, ...relationFields];

export const ServiceRealEstateService = {

  create: async (data: any) => {

    const serviceType = await prisma.serviceType.findFirst({ where: { key: data.serviceType } })

    if (!serviceType) {
      throw new HTTPError(400, `Unsupported serviceType: ${data.serviceType}`)
    }

    return createServiceWithRelation({
      data: { ...data, serviceTypeId: serviceType.id },
      serviceModel: "serviceRealEstate",
      manyToManyModels: ["realEstateHasAmenities", "realEstateHasServices"],
      manyToManyForeignIds: ["realEstateAmenityId", "realEstateServiceId"]
    })

  },

  update: (id: number, data: any) => {

    return updateServiceWithRelation({
      id,
      data,
      fieldsAllowed,
      serviceModel: "serviceRealEstate",
      manyToManyModels: ["realEstateHasAmenities", "realEstateHasServices"],
      manyToManyForeignIds: ["realEstateAmenityId", "realEstateServiceId"]
    })

  },

  findAll: async () => {
    const result = await prisma.serviceRealEstate.findMany({
      include: {
        service: { include: { serviceStatus: true, serviceType: true } },
        realEstateType: true,
        realEstateStayType: true,
        realEstateHousingStatus: true,
        realEstateHasAmenities: {
          include: {
            realEstateAmenity: true
          }
        }
      }
    })

    return nullToEmptyString(result)
  },

  findById: async (id: number) => {
    const result = await prisma.serviceRealEstate.findUnique({
      where: { id },
      include: {
        service: { include: { serviceStatus: true, serviceType: true } },
        realEstateType: true,
        realEstateStayType: true,
        realEstateHousingStatus: true,
        realEstateHasAmenities: {
          include: {
            realEstateAmenity: true
          }
        }
      }
    })

    return nullToEmptyString(result)
  },

  findByServiceId: async (id: number) => {
    const result = await prisma.serviceRealEstate.findFirst({
      where: { serviceId: id },
      include: {
        service: { include: { serviceStatus: true, serviceType: true } },
        realEstateType: true,
        realEstateStayType: true,
        realEstateHousingStatus: true,
        realEstateHasAmenities: true,
        realEstateHasServices: true
      }
    })

    return nullToEmptyString(result)
  },
  
  findAllHousingStatus: () => prisma.realEstateHousingStatus.findMany(),
  
  findAllTypes: () => prisma.realEstateType.findMany(),
  
  findAllStayTypes: () => prisma.realEstateStayType.findMany(),
  
  findAllAmenities: () => prisma.realEstateAmenity.findMany(),

  findAllServices: () => prisma.realEstateService.findMany(),
}