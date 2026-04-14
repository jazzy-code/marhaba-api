import prisma from "../../lib/prisma.js"
import { HTTPError } from "../../middlewares/errorHandler.js";
import { createServiceWithRelation } from "../../services/serviceCreator.js"
import { updateServiceWithRelation } from "../../services/serviceUpdater.js"
import { nullToEmptyString } from "../../utils/serviceFields.js"

const baseFields = [
  'level',
  'place',
  'equipment',
];

// Nombres de las relaciones (lo que queda tras quitar "Id")
const relationFields: string[] = [];

const fieldsAllowed = [...baseFields, ...relationFields];

export const ServiceTrainingCoachService = {

  create: async (data: any) => {

    const serviceType = await prisma.serviceType.findFirst({ where: { key: data.serviceType } })

    if (!serviceType) {
      throw new HTTPError(400, `Unsupported serviceType: ${data.serviceType}`)
    }

    return createServiceWithRelation({
      data: { ...data, serviceTypeId: serviceType.id },
      serviceModel: "serviceTrainingCoach",
      manyToManyModels: ["trainingCoachHasDisciplines", "trainingCoachHasLanguages"],
      manyToManyForeignIds: ["trainingCoachDisciplineId", "languageId"]
    })

  },

  update: (id: number, data: any) => {

    return updateServiceWithRelation({
      id,
      data,
      fieldsAllowed,
      serviceModel: "serviceTrainingCoach",
      manyToManyModels: ["trainingCoachHasDisciplines", "trainingCoachHasLanguages"],
      manyToManyForeignIds: ["trainingCoachDisciplineId", "languageId"]
    })

  },

  findAll: async () => {
    const result = await prisma.serviceTrainingCoach.findMany({
      include: {
        service: { include: { serviceStatus: true, serviceType: true } },
        trainingCoachHasDisciplines: {
          include: {
            trainingCoachDiscipline: true
          }
        },
        trainingCoachHasLanguages: {
          include: {
            language: true
          }
        }
      }
    })

    return nullToEmptyString(result)
  },

  findById: async (id: number) => {
    const result = await prisma.serviceTrainingCoach.findUnique({
      where: { id },
      include: {
        service: { include: { serviceStatus: true, serviceType: true } },
        trainingCoachHasDisciplines: {
          include: {
            trainingCoachDiscipline: true
          }
        },
        trainingCoachHasLanguages: {
          include: {
            language: true
          }
        }
      }
    })

    return nullToEmptyString(result)
  },

  findByServiceId: async (id: number) => {
    const result = await prisma.serviceTrainingCoach.findFirst({
      where: { serviceId: id },
      include: {
        service: { include: { serviceStatus: true, serviceType: true } },
        trainingCoachHasDisciplines: {
          include: {
            trainingCoachDiscipline: true
          }
        },
        trainingCoachHasLanguages: {
          include: {
            language: true
          }
        }
      }
    })

    return nullToEmptyString(result)
  },

  findAllDisciplines: () => prisma.trainingCoachDiscipline.findMany()
}