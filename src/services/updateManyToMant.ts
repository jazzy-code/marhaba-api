export const updateManyToMany = async ({
  manyToManyModel,
  serviceForeignId,
  serviceId,
  items,
  itemField
}: {
  manyToManyModel: any
  serviceForeignId: string
  serviceId: number
  items: number[]
  itemField: string
}) => {

  await manyToManyModel.deleteMany({
    where: {
      [serviceForeignId]: serviceId
    }
  })

  if (!items?.length) return

  await manyToManyModel.createMany({
    data: items.map(id => ({
      [serviceForeignId]: serviceId,
      [itemField]: Number(id)
    }))
  })
}