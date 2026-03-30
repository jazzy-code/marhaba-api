// prisma/seeders/serviceStatus.seeder.ts
import { PrismaClient } from "@prisma/client/extension"

export const seedServiceStatus = async (prisma: PrismaClient) => {
  await prisma.serviceStatus.createMany({
    data: [
      { name: "Pending" },
      { name: "Approved" },
      { name: "Rejected" },
    ],
    skipDuplicates: true,
  })
}