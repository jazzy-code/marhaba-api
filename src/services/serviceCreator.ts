import prisma from "../lib/prisma.js"
import { extractServiceData, transformDataForPrisma } from "../utils/serviceFields.js"

export const createServiceWithRelation = async ({
  data,
  serviceModel,
  manyToManyModels,
  manyToManyForeignIds
}: {
  data: any
  serviceModel: any
  manyToManyModels?: string[]
  manyToManyForeignIds?: string[]
}) => {
  const serviceForeignId = `${serviceModel}Id`

  const { serviceData, restData } = extractServiceData(data)

  const transformedServiceData = transformDataForPrisma(serviceData)

  let manyToManys = []

  if (manyToManyModels && manyToManyModels.length) {
    for (const model of manyToManyModels) {
      const items = restData[model]
      delete restData[model]
      manyToManys.push({ model, items })
    }
  }

  return prisma.$transaction(async (tx: any) => {
    /**
     * 1️⃣ Crear service
     */
    const service = await tx.service.create({
      data: {
        ...transformedServiceData,
        user: {
          connect: { id: data.userId || 1 }
        }
      }
    })

    /**
     * 2️⃣ Crear modelo específico
     */
    const transformedRestData = transformDataForPrisma(restData)

    delete transformedRestData.serviceType
    delete transformedRestData.isServiceInitialized
    const relation = await (tx as any)[serviceModel].create({
      data: {
        ...transformedRestData,
        service: {
          connect: { id: service.id } 
        }
      },
      include: {
        service: {
          include: { serviceType: true, serviceStatus: true }
        },
      }
    })

    if (manyToManys.length && manyToManyForeignIds && manyToManyForeignIds.length && serviceForeignId) {
      for (const [index, { model, items }] of manyToManys.entries()) {
        await (tx as any)[model].createMany({
          data: items.map((id: number) => ({
            [serviceForeignId]: relation.id,
            [String(manyToManyForeignIds[index])]: Number(id)
          }))
        })
      }
    }

    return relation
  })
}