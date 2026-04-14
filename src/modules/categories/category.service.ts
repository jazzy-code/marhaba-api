import prisma from "../../lib/prisma.js";


export const CategoryService = {
  create: (data: { name: string; categoryGroupId: number }) => {
    return prisma.category.create({ data })
  },

  findAll: () => {
    return prisma.category.findMany({
      orderBy: { id: "asc" },
      include: { serviceTypes: true }
    })
  },

  findById: (id: number) => {
    return prisma.category.findUnique({
      where: { id },
      include: { serviceTypes: true }
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
