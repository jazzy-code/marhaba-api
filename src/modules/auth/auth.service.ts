import prisma from "../../lib/prisma.js";


export const AuthService = {
  findByClerkId: (clerkId: string) => {
    return prisma.user.findUnique({ where: { clerkId } })
  },
}
