import prisma from "@/lib/prisma";


export const CategoryService = {
  create: (data: { name: string; categoryGroupId: number }) => {
    return prisma.category.create({ data })
  },

  findAll: () => {
    return prisma.category.findMany()
  },

  findById: (id: number) => {
    return prisma.category.findUnique({
      where: { id }
    })
  },

  update: (id: number, data: any) => {
    return prisma.category.update({
      where: { id },
      data
    })
  },

  delete: (id: number) => {
    return prisma.category.delete({ where: { id } })
  }
}
