import prisma from "@/lib/prisma.js";
import { clerkClient } from "@clerk/express";

export const ClerkWebhooksService = {
  userCreated: async (data: any) => {
    const { email_addresses, first_name, last_name, id } = data
    if (email_addresses.length > 0) {
      const user = await prisma.user.create({
        data: {
          clerkId: id,
          email: email_addresses[0].email_address,
          firstName: first_name,
          lastName: last_name,
          userType: "USER",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      })

      // Add public Metadata to set userType in Clerk
      await clerkClient.users.updateUser(id, { publicMetadata: { userType: "USER" } })
  
      return user
    }

    return { email: 'Not email provided, testing purposes' }
  },

  userUpdated: async (data: any) => {
    const { email_addresses, first_name, last_name, id, public_metadata } = data
    if (email_addresses.length > 0) {
      const userType = public_metadata?.userType || "USER"

      return await prisma.user.update({
        where: { clerkId: id },
        data: {
          clerkId: id,
          email: email_addresses[0].email_address,
          firstName: first_name,
          lastName: last_name,
          userType: userType,
          updatedAt: new Date(),
        }
      })
    }
  },

  userDeleted: async (data: any) => {
    const { id, deleted } = data
    if (!deleted) return

    const user = await prisma.user.findUnique({ where: { clerkId: id } })
    if (!user) return { error: 'User not found, testing purposes' }
  
    return await prisma.user.delete({ where: { clerkId: id } })
  },
}
