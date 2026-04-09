// prisma/seeders/categories.seeder.ts
import { PrismaClient } from "@prisma/client/extension"

export const seedCategories = async (prisma: PrismaClient) => {
  await prisma.category.createMany({
    data: [
      { name: "Living" },
      { name: "Mobility" },
      { name: "Lifestyle" },
      { name: "Personal Services" },
    ],
    skipDuplicates: true,
  })
}