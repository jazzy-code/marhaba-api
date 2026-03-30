import prisma from "@/lib/prisma"
import { HTTPError } from "@/middlewares/errorHandler";
import { createServiceWithRelation } from "@/services/serviceCreator"
import { updateServiceWithRelation } from "@/services/serviceUpdater"
import { nullToEmptyString } from "@/utils/serviceFields"

const baseFields = [
  'regime',
  'hasVetting',
];

// Nombres de las relaciones (lo que queda tras quitar "Id")
const relationFields = [
  'privateStaffRoleId'
];

const fieldsAllowed = [...baseFields, ...relationFields];

export const ServicePrivateStaffService = {

  create: async (data: any) => {

    const serviceType = await prisma.serviceType.findFirst({ where: { key: data.serviceType } })

    if (!serviceType) {
      throw new HTTPError(400, `Unsupported serviceType: ${data.serviceType}`)
    }

    return createServiceWithRelation({
      data: { ...data, serviceTypeId: serviceType.id },
      serviceModel: "servicePrivateStaff",
      manyToManyModels: ["privateStaffHasQualifications", "privateStaffHasLanguages"],
      manyToManyForeignIds: ["privateStaffQualificationId", "languageId"]
    })

  },

  update: (id: number, data: any) => {

    return updateServiceWithRelation({
      id,
      data,
      fieldsAllowed,
      serviceModel: "servicePrivateStaff",
      manyToManyModels: ["privateStaffHasQualifications", "privateStaffHasLanguages"],
      manyToManyForeignIds: ["privateStaffQualificationId", "languageId"]
    })

  },

  findAll: async () => {
    const result = await prisma.servicePrivateStaff.findMany({
      include: {
        service: { include: { serviceStatus: true, serviceType: true } },
        privateStaffRole: true,
        privateStaffHasQualifications: {
          include: {
            privateStaffQualification: true
          }
        },
        privateStaffHasLanguages: {
          include: {
            language: true
          }
        }
      }
    })

    return nullToEmptyString(result)
  },

  findById: async (id: number) => {
    const result = await prisma.servicePrivateStaff.findUnique({
      where: { id },
      include: {
        service: { include: { serviceStatus: true, serviceType: true } },
        privateStaffRole: true,
        privateStaffHasQualifications: {
          include: {
            privateStaffQualification: true
          }
        },
        privateStaffHasLanguages: {
          include: {
            language: true
          }
        }
      }
    })

    return nullToEmptyString(result)
  },

  findByServiceId: async (id: number) => {
    const result = await prisma.servicePrivateStaff.findFirst({
      where: { serviceId: id },
      include: {
        service: { include: { serviceStatus: true, serviceType: true } },
        privateStaffRole: true,
        privateStaffHasQualifications: {
          include: {
            privateStaffQualification: true
          }
        },
        privateStaffHasLanguages: {
          include: {
            language: true
          }
        }
      }
    })

    return nullToEmptyString(result)
  },

  findAllQualifications: () => prisma.privateStaffQualification.findMany(),

  findAllRoles: () => prisma.privateStaffRole.findMany(),
}