import prisma from "../../lib/prisma.js"
import { HTTPError } from "../../middlewares/errorHandler.js";
import { createServiceWithRelation } from "../../services/serviceCreator.js"
import { updateServiceWithRelation } from "../../services/serviceUpdater.js"
import { nullToEmptyString } from "../../utils/serviceFields.js"
import { connect } from "node:http2";

const baseFields = [
  'modality',
  'shipyard',
  'model',
  'constructionYear',
  'refitYear',
  'minHours',
  'maxHours',
  'lengthMeters',
  'maxSpeed',
  'totalCabins',
  'passengersCapacity',
  'port',
  'fuelPerformance',
  'apa',
  'motorHours'
];

// Nombres de las relaciones (lo que queda tras quitar "Id")
const relationFields = [
  'countryId',
];

const fieldsAllowed = [...baseFields, ...relationFields];

export const ServiceYachtService = {

  create: async (data: any) => {

    const serviceType = await prisma.serviceType.findFirst({ where: { key: data.serviceType } })

    if (!serviceType) {
      throw new HTTPError(400, `Unsupported serviceType: ${data.serviceType}`)
    }

    const service = await createServiceWithRelation({
      data: { ...data, serviceTypeId: serviceType.id },
      serviceModel: "serviceYacht",
      manyToManyModels: ["yachtHasAmenities"],
      manyToManyForeignIds: ["yachtAmenityId"]
    })

    await prisma.yachtTripulation.createMany({
      data: data.yachtTripulation.map((tripulation: any) => ({
        name: tripulation.name,
        yachtTripulationRoleId: tripulation.yachtTripulationRoleId,
        serviceYachtId: service.serviceId
      }))
    })

    return service
  },

  update: (id: number, data: any) => {

    return updateServiceWithRelation({
      id,
      data,
      fieldsAllowed,
      serviceModel: "serviceYacht",
      manyToManyModels: ["yachtHasAmenities"],
      manyToManyForeignIds: ["yachtAmenityId"]
    })

  },

  findAll: async () => {
    const result = await prisma.serviceYacht.findMany({
      include: {
        service: { include: { serviceStatus: true, serviceType: true } },
        yachtHasAmenities: {
          include: {
            yachtAmenity: true
          }
        }
      }
    })

    return nullToEmptyString(result)
  },

  findById: async (id: number) => {
    const result = await prisma.serviceYacht.findUnique({
      where: { id },
      include: {
        service: { include: { serviceStatus: true, serviceType: true } },
        yachtHasAmenities: {
          include: {
            yachtAmenity: true
          }
        }
      }
    })

    return nullToEmptyString(result)
  },

  findByServiceId: async (id: number) => {
    const result = await prisma.serviceYacht.findFirst({
      where: { serviceId: id },
      include: {
        service: { include: { serviceStatus: true, serviceType: true } },
        yachtTripulation: true,
        yachtHasAmenities: true,
      }
    })

    return nullToEmptyString(result)
  },

  findAllAmenities: () => prisma.yachtAmenity.findMany(),

  findAllTripulationRoles: () => prisma.yachtTripulationRole.findMany()
}