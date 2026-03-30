import prisma from "@/lib/prisma";


export const AuthService = {
  findByClerkId: (clerkId: string) => {
    return prisma.user.findUnique({ where: { clerkId } })
  },
}
