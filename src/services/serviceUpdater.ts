import prisma from "@/lib/prisma.js"
import { extractServiceData, transformDataForPrisma } from "@/utils/serviceFields.js"
import { updateManyToMany } from "./updateManyToMany.js"

export const updateServiceWithRelation = async ({
  id,
  data,
  fieldsAllowed,
  serviceModel,
  manyToManyModels,
  manyToManyForeignIds,
}: {
  id: number
  data: any
  fieldsAllowed: string[]
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
     * 1️⃣ Obtener registro actual
     */
    const relation = await (tx as any)[serviceModel].findFirst({
      where: { serviceId: id }
    })

    if (!relation) {
      throw new Error("Service relation not found")
    }

    /**
     * 2️⃣ Actualizar Service
     */
    if (Object.keys(serviceData).length > 0) {
      await tx.service.update({
        where: { id: relation.serviceId },
        data: transformedServiceData
      })
    }

    /**
     * 3️⃣ Actualizar modelo específico
     */
    // 3. Filtrar el objeto con campos permitidos en fieldRelation 
    const filteredRestData = Object.keys(restData)
      .filter(key => fieldsAllowed.includes(key))
      .reduce((obj, key) => {
        obj[key] = restData[key];
        return obj;
      }, {} as any);


    const transformedRestData = transformDataForPrisma(filteredRestData)

    console.log("transformedRestData", transformedRestData)
  
    const updatedRelation = await (tx as any)[serviceModel].update({
      where: { id: relation.id },
      data: transformedRestData
    })

    if (manyToManys.length && manyToManyForeignIds && manyToManyForeignIds.length && serviceForeignId) {

      for (const [index, { model, items }] of manyToManys.entries()) {
        await updateManyToMany({
          manyToManyModel: (tx as any)[model],
          serviceForeignId,
          serviceId: relation.id,
          items,
          itemField: String(manyToManyForeignIds[index])
        })
      }
    }

    return updatedRelation
  })
}