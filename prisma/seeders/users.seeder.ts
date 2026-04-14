// prisma/seeders/serviceUser.seeder.ts
import { PrismaClient } from "@prisma/client/extension"

export const seedUsers = async (prisma: PrismaClient) => {
  await prisma.user.createMany({
    data: [
      { firstName: "Javier", lastName: "Torres Admin", email: "javiertorresm2000@gmail.com", userType: "ADMIN", clerkId: 'user_3BhWWqjym9zaljuCvPw0CjeRrIM', createdAt: new Date(), updatedAt: new Date() },
      { firstName: "Javier", lastName: "Torres", email: "javtorres.devtest@gmail.com", userType: "USER", clerkId: 'user_3BOzK0EUK876DhOaLL0IE97X1gb', createdAt: new Date(), updatedAt: new Date() },
      { firstName: "Rodrigo", lastName: "Días Palacios", email: "rodrigo@rdbranding.com", userType: "ADMIN", clerkId: 'user_38fCQ8eAg3UwrxI3SruAD8WNYMk', createdAt: new Date(), updatedAt: new Date() },
    ],
    skipDuplicates: true,
  })
}