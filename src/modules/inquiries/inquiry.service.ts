import prisma from "../../lib/prisma.js";
import { HTTPError } from "../../middlewares/errorHandler.js";
import { sendTemplateEmail } from "../../services/email/email.service.js";


export const InquiryService = {
  create: async (data: any) => {
    const { acceptTerms } = data

    if (!acceptTerms) {
      throw new HTTPError(400, "acceptTerms is required and must be true")
    }
    delete data.acceptTerms

    const inquire = await prisma.inquiry.create({ data })

    const service = await prisma.service.findUnique({
      where: {
        id: inquire.serviceId
      },
      include: {
        user: true,
        serviceType: true
      }
    })

    if (!service) {
      throw new HTTPError(400, "Service not found")
    }

    await sendTemplateEmail({
      to: process.env.MAIL_ADMIN_RECIPIENT_EMAIL || "javiertorresm2000@gmail.com", 
      subject: "New Inquire Submitted", 
      templateName: "inquiry-submitted", 
      variables: { 
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phone,
        message: data.message,
        serviceTitle: service.title,
        serviceId: service.id,
        serviceType: service.serviceType.name,
        userName: service.user.firstName + " " + service.user.lastName,
        userEmail: service.user.email
      }
    })
    return inquire
  },

  findAll: async (params: any, user: any) => {
    const page = Number(params.page) || 1
    const size = Number(params.size) || 10
    const skip = (page - 1) * size
    const sort = params.sort || "createdAt"
    const order = params.order || "desc"
    const search = params.search

    const where: any = {
      isArchived: false,
      service: {
        userId: user.id,
      }
    }

    if (search) {
      where.OR = [
        { service: { title: { contains: search, mode: "insensitive" } } },
        { fullName: { contains: search, mode: "insensitive" } }
      ]
    }

    const [data, total] = await Promise.all([
      prisma.inquiry.findMany({
        where,
        skip,
        take: size,
        orderBy: { [sort]: order },
        include: {
          service: true
        }
      }),
      prisma.inquiry.count({ where })
    ])

    return {
      data,
      total,
      page,
      size,
      totalPages: Math.ceil(total / size)
    }
  },

  findById: (id: number, user: any) => {
    return prisma.inquiry.findUnique({
      where: { id, service: { userId: user.id } },
      include: { service: true }
    })
  },

  update: (id: number, data: any, user: any) => {
    return prisma.inquiry.update({
      where: { id, service: { userId: user.id } },
      data
    })
  },

  delete: (id: number, user: any) => {
    return prisma.inquiry.delete({ where: { id, service: { userId: user.id } }})
  },

  findAllArchived: async (params: any, user: any) => {
    const page = Number(params.page) || 1
    const size = Number(params.size) || 10
    const skip = (page - 1) * size
    const sort = params.sort || "createdAt"
    const order = params.order || "desc"
    const search = params.search

    const where: any = {
      isArchived: true,
      service: {
        userId: user.id
      }
    }

    if (search) {
      where.OR = [
        { service: { title: { contains: search, mode: "insensitive" } } },
        { fullName: { contains: search, mode: "insensitive" } }
      ]
    }

    const [data, total] = await Promise.all([
      prisma.inquiry.findMany({
        where,
        skip,
        take: size,
        orderBy: { [sort]: order },
        include: {
          service: true
        }
      }),
      prisma.inquiry.count({ where })
    ])

    return {
      data,
      total,
      page,
      size,
      totalPages: Math.ceil(total / size)
    }
  },

  findAllStats: async (user: any) => {
    const where: any = {
      service: {
        userId: user.id
      }
    }

    const [total, totalNew, totalContacted, totalArchived] = await Promise.all([
      prisma.inquiry.count({
        where
      }),
      prisma.inquiry.count({
        where: { ...where, status: "NEW" },
      }),
      prisma.inquiry.count({
        where: { ...where, status: "CONTACTED" },
      }),
      prisma.inquiry.count({
        where: { ...where, isArchived: true },
      }),
    ])

    return {
      total,
      totalNew,
      totalContacted,
      totalArchived
    }
  },

  archive: (id: number, user: any) => {
    return prisma.inquiry.update({
      where: { id, service: { userId: user.id } },
      data: { isArchived: true }
    })
  },

  contact: (id: number, user: any) => {
    return prisma.inquiry.update({
      where: { id, service: { userId: user.id } },
      data: { status: "CONTACTED" }
    })
  },
}
