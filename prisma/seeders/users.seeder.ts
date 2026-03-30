// prisma/seeders/serviceUser.seeder.ts
import { PrismaClient } from "@prisma/client/extension"

export const seedUsers = async (prisma: PrismaClient) => {
  await prisma.user.createMany({
    data: [
      { firstName: "Javier", lastName: "Torres", email: "javtorres.devtest@gmail.com", userType: "USER", clerkId: 'user_3BOzK0EUK876DhOaLL0IE97X1gb', createdAt: new Date(), updatedAt: new Date() },
    ],
    skipDuplicates: true,
  })
}