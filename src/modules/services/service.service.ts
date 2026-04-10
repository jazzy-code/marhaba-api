import prisma from "@/lib/prisma";
import { HTTPError } from "@/middlewares/errorHandler";
import { ServiceRealEstateService } from "../serviceRealEstate/serviceRealEstate.service";
import { ServiceLuxuryCarService } from "../serviceLuxuryCar/serviceLuxuryCar.service";
import { ServiceYachtService } from "../serviceYacht/serviceYacht.service";
import { ServiceLuxuryStayService } from "../serviceLuxuryStay/serviceLuxuryStay.service";
import { ServiceJetService } from "../serviceJet/serviceJet.service";
import { ServiceMedicalCareService } from "../serviceMedicalCare/serviceMedicalCare.service";
import { ServiceSecurityGuardService } from "../serviceSecurityGuard/serviceSecurityGuard.service";
import { ServicePrivateEventService } from "../servicePrivateEvent/servicePrivateEvent.service";
import { ServicePrivateStaffService } from "../servicePrivateStaff/servicePrivateStaff.service";
import { ServiceBeautySpaService } from "../serviceBeautySpa/serviceBeautySpa.service";
import { ServiceGolfService } from "../serviceGolf/serviceGolf.service";
import { ServiceTrainingCoachService } from "../serviceTrainingCoach/serviceTrainingCoach.service";
import { nullToEmptyString } from "@/utils/serviceFields";
import { deleteFromS3, getSignedUrlFromS3, uploadToS3 } from "@/services/s3.service";


const serviceModules: Record<string, any> = {
  RealEstate: ServiceRealEstateService,
  LuxuryCar: ServiceLuxuryCarService,
  ServiceYacht: ServiceYachtService,
  Jet: ServiceJetService,
  LuxuryStay: ServiceLuxuryStayService,
  MedicalCare: ServiceMedicalCareService,
  SecurityGuard: ServiceSecurityGuardService,
  PrivateEvent: ServicePrivateEventService,
  PrivateStaff: ServicePrivateStaffService,
  BeautySpa: ServiceBeautySpaService,
  Golf: ServiceGolfService,
  TrainingCoach: ServiceTrainingCoachService
}

export const ServiceService = {
  create: (data: any) => {
    const { serviceType } = data

    if (!serviceType) {
      throw new HTTPError(400, "serviceType is required")
    }

    const module = serviceModules[serviceType]

    if (!module) {
      throw new HTTPError(400, `Unsupported serviceType: ${serviceType}`)
    }

    return module.create(data)
  },

  findAll: async (params: any, user: any) => {
    const page = Number(params.page) || 1
    const size = Number(params.size) || 10
    const skip = (page - 1) * size
    const sort = params.sort || "createdAt"
    const order = params.order || "desc"
    const search = params.search
    const serviceSlug = params.slug
    const statusIds = params.statusIds

    const where: any = {}
    if (search) {
      where.title = { contains: search, mode: "insensitive" }
    }
    // Validate if user is ADMIN or USER to fetch all or only user's services
    if (user.userType !== "ADMIN") {
      where.userId = user.id
    }

    if (serviceSlug) {
      where.serviceType = { slug: serviceSlug }
    }

    // Validate statusIds
    if (statusIds) {
      const statusIdsArray = statusIds.split(',').map((id: string) => Number(id))
      where.serviceStatusId = { in: statusIdsArray }
    }

    const [data, total] = await Promise.all([
      prisma.service.findMany({
        where,
        skip,
        take: size,
        orderBy: { [sort]: order },
        include: {
          serviceType: true,
          serviceStatus: true,
          user: true,
          city: true,
          region: true,

          // Services
          serviceRealEstate: true,
          serviceLuxuryCar: true,
          serviceYacht: true,
          serviceJet: true,
          serviceLuxuryStay: true,
          serviceMedicalCare: true,
          serviceSecurityGuard: true,
          servicePrivateEvent: true,
          servicePrivateStaff: true,
          serviceBeautySpa: true,
          serviceGolf: true,
          serviceTrainingCoach: true,
        }
      }),
      prisma.service.count({
        where
      }),
    ])

    // const dataWithSignedUrls = await Promise.all(
    //   data.map(async (service) => ({
    //     ...service,
    //     heroImageUrl: service.heroImageUrl
    //       ? await getSignedUrlFromS3(service.heroImageUrl)
    //       : null,
    //     providerLogoUrl: service.providerLogoUrl
    //       ? await getSignedUrlFromS3(service.providerLogoUrl)
    //       : null,
    //   }))
    // )

    return {
      data,
      total,
      page,
      size,
      totalPages: Math.ceil(total / size)
    }
  },

  findAllPublic: async (params: any) => {
    const page = Number(params.page) || 1
    const size = Number(params.size) || 10
    const skip = (page - 1) * size
    const sort = params.sort || "createdAt"
    const order = params.order || "desc"
    const search = params.search
    const serviceSlug = params.slug

    const where: any = {
      serviceStatusId: 2 // Only fetch Approved services
    }
    if (search) {
      where.title = { contains: search, mode: "insensitive" }
    }

    if (serviceSlug) {
      where.serviceType = { slug: serviceSlug }
    }

    const [data, total] = await Promise.all([
      prisma.service.findMany({
        where,
        skip,
        take: size,
        orderBy: { [sort]: order },
        include: {
          serviceType: true,
          serviceStatus: true,
          user: true,
          city: true,
          region: true,

          // Services
          serviceRealEstate: true,
          serviceLuxuryCar: true,
          serviceYacht: true,
          serviceJet: true,
          serviceLuxuryStay: true,
          serviceMedicalCare: true,
          serviceSecurityGuard: true,
          servicePrivateEvent: true,
          servicePrivateStaff: true,
          serviceBeautySpa: true,
          serviceGolf: true,
          serviceTrainingCoach: true,
        }
      }),
      prisma.service.count({
        where
      }),
    ])

    return {
      data,
      total,
      page,
      size,
      totalPages: Math.ceil(total / size)
    }
  },

  findById: async (id: number, user: any) => {
    const where: any = { id }

    if (user.userType !== "ADMIN") {
      where.userId = user.id
    }
    const service = await prisma.service.findUnique({
      where,
      include: {
        serviceType: true,
        serviceStatus: true,
        user: true,
        city: true,
        region: true,
        serviceFiles: true,

        // Services
        serviceRealEstate: {
          include: {
            realEstateType: true,
            realEstateHasAmenities: {
              include: {
                realEstateAmenity: true
              }
            },
            realEstateHasServices: {
              include: {
                realEstateService: true
              }
            }
          }
        },
        serviceLuxuryCar: {
          include: {
            luxuryCarHasAmenities: {
              include: {
                luxuryCarAmenity: true
              }
            },
            luxuryCarExteriorColor: true,
            luxuryCarInteriorColor: true,
            luxuryCarLegalSituation: true
          }
        },
        serviceYacht: {
          include: {
            yachtHasAmenities: {
              include: {
                yachtAmenity: true
              }
            },
            yachtTripulation: true,
            country: true
          }
        },
        serviceJet: {
          include: {
            jetHasAmenities: {
              include: {
                jetAmenity: true
              }
            },
            jetCategory: true,
            jetCatering: true
          }
        },
        serviceLuxuryStay: {
          include: {
            luxuryStayCategory: true,
            luxuryStayRoom: true,
            luxuryStayHasAmenities: {
              include: {
                luxuryStayAmenity: true
              }
            }
          }
        },
        serviceMedicalCare: {
          include: {
            medicalCareHasServices: { include: { serviceMedicalCare: true } },
            medicalCareHasLanguages: { include: { language: true } },
            medicalCareHasSpecialties: { include: { medicalCareSpecialty: true } },
            medicalCareHasAttentions: { include: { medicalCareAttention: true } }
          }
        },
        serviceSecurityGuard: { include: { securityGuardHasProfiles: true, securityGuardHasLanguages: true } },
        servicePrivateEvent: {
          include: {
            privateEventHasAmenities: {
              include: {
                privateEventAmenity: true
              }
            }
          }
        },
        servicePrivateStaff: {
          include: {
            privateStaffRole: true,
            privateStaffHasQualifications: {
              include: {
                privateStaffQualification: true
              }
            },
            privateStaffHasLanguages: {
              include: {
                language: true
              }
            }
          }
        },
        serviceBeautySpa: {
          include: {
            beautySpaHasProducts: {
              include: {
                beautySpaProduct: true
              }
            },
            beautySpaHasTreatments: {
              include: {
                beautySpaTreatment: true
              }
            }
          }
        },
        serviceGolf: {
          include: {
            golfHasAmenities: {
              include: {
                golfAmenity: true
              }
            }
          }
        },
        serviceTrainingCoach: {
          include: {
            trainingCoachHasDisciplines: {
              include: {
                trainingCoachDiscipline: true
              }
            },
            trainingCoachHasLanguages: {
              include: {
                language: true
              }
            }
          }
        },
      }
    })

    if (!service) {
      throw new HTTPError(404, "Service not found")
    }

    return nullToEmptyString(service)
  },

  findByIdPublic: async (id: number) => {
    const service = await prisma.service.findUnique({
      where: { serviceStatusId: 2, id },
      include: {
        serviceType: true,
        user: true,
        city: true,
        region: true,
        serviceFiles: true,

        // Services
        serviceRealEstate: {
          include: {
            realEstateType: true,
            realEstateHasAmenities: {
              include: {
                realEstateAmenity: true
              }
            },
            realEstateHasServices: {
              include: {
                realEstateService: true
              }
            }
          }
        },
        serviceLuxuryCar: {
          include: {
            luxuryCarHasAmenities: {
              include: {
                luxuryCarAmenity: true
              }
            },
            luxuryCarExteriorColor: true,
            luxuryCarInteriorColor: true,
            luxuryCarLegalSituation: true
          }
        },
        serviceYacht: {
          include: {
            yachtHasAmenities: {
              include: {
                yachtAmenity: true
              }
            },
            yachtTripulation: true,
            country: true
          }
        },
        serviceJet: {
          include: {
            jetHasAmenities: {
              include: {
                jetAmenity: true
              }
            },
            jetCategory: true,
            jetCatering: true
          }
        },
        serviceLuxuryStay: {
          include: {
            luxuryStayCategory: true,
            luxuryStayRoom: true,
            luxuryStayHasAmenities: {
              include: {
                luxuryStayAmenity: true
              }
            }
          }
        },
        serviceMedicalCare: {
          include: {
            medicalCareHasServices: { include: { serviceMedicalCare: true } },
            medicalCareHasLanguages: { include: { language: true } },
            medicalCareHasSpecialties: { include: { medicalCareSpecialty: true } },
            medicalCareHasAttentions: { include: { medicalCareAttention: true } }
          }
        },
        serviceSecurityGuard: { include: { securityGuardHasProfiles: true, securityGuardHasLanguages: true } },
        servicePrivateEvent: {
          include: {
            privateEventHasAmenities: {
              include: {
                privateEventAmenity: true
              }
            }
          }
        },
        servicePrivateStaff: {
          include: {
            privateStaffRole: true,
            privateStaffHasQualifications: {
              include: {
                privateStaffQualification: true
              }
            },
            privateStaffHasLanguages: {
              include: {
                language: true
              }
            }
          }
        },
        serviceBeautySpa: {
          include: {
            beautySpaHasProducts: {
              include: {
                beautySpaProduct: true
              }
            },
            beautySpaHasTreatments: {
              include: {
                beautySpaTreatment: true
              }
            }
          }
        },
        serviceGolf: {
          include: {
            golfHasAmenities: {
              include: {
                golfAmenity: true
              }
            }
          }
        },
        serviceTrainingCoach: {
          include: {
            trainingCoachHasDisciplines: {
              include: {
                trainingCoachDiscipline: true
              }
            },
            trainingCoachHasLanguages: {
              include: {
                language: true
              }
            }
          }
        },
      }
    })

    if (!service) {
      throw new HTTPError(404, "Service not found")
    }

    return nullToEmptyString(service)
  },

  update: (id: number, data: any) => {
    const { serviceType } = data

    const module = serviceModules[serviceType]

    if (!module) {
      throw new HTTPError(400, `Unsupported serviceType: ${serviceType}`)
    }

    return module.update(id, data)
  },

  approve: async (id: number) => {
    const service = await prisma.service.findUnique({
      where: { id }
    })

    if (!service) {
      throw new HTTPError(404, "Service not found")
    }

    return await prisma.service.update({
      where: { id },
      data: { serviceStatusId: 2 }
    })
  },

  reject: async (id: number) => {
    const service = await prisma.service.findUnique({
      where: { id }
    })

    if (!service) {
      throw new HTTPError(404, "Service not found")
    }

    return await prisma.service.update({
      where: { id },
      data: { serviceStatusId: 3 }
    })
  },

  delete: async (id: number) => {
    const service = await prisma.service.findUnique({
      where: { id }
    })

    if (!service) {
      throw new HTTPError(404, "Service not found")
    }

    return await prisma.service.delete({
      where: { id }
    })
  },

  // Files
  uploadFiles: async (
    serviceId: number,
    files: any,
    existingFileIds: number[] = []
  ) => {
    const currentFiles = await prisma.serviceFile.findMany({
      where: { serviceId }
    })

    console.log("existingFileIds", existingFileIds)

    const filesToDelete = currentFiles.filter(
      (file) => !existingFileIds.includes(file.id)
    )

    console.log("filesToDelete", filesToDelete)

    await Promise.all(
      filesToDelete.map(async (file) => {
        await deleteFromS3(file.url)

        await prisma.serviceFile.delete({
          where: { id: file.id }
        })
      })
    )

    // 🟡 HERO IMAGE
    if (files?.heroImage?.[0]) {
      const result = await uploadToS3(
        files.heroImage[0],
        serviceId,
        "heroImage"
      )

      // 🔥 opcional: borrar anterior
      const service = await prisma.service.findUnique({
        where: { id: serviceId }
      })

      if (service?.heroImageUrl) {
        await deleteFromS3(service.heroImageUrl)
      }

      await prisma.service.update({
        where: { id: serviceId },
        data: {
          heroImageUrl: result.url
        }
      })
    }

    // 🟡 PROVIDER LOGO
    if (files?.providerLogo?.[0]) {
      const result = await uploadToS3(
        files.providerLogo[0],
        serviceId,
        "providerLogo"
      )

      const service = await prisma.service.findUnique({
        where: { id: serviceId }
      })

      if (service?.providerLogoUrl) {
        await deleteFromS3(service.providerLogoUrl)
      }

      await prisma.service.update({
        where: { id: serviceId },
        data: {
          providerLogoUrl: result.url
        }
      })
    }

    // 🟢 NUEVOS GALLERY FILES
    if (files?.galleryFiles?.length) {
      await Promise.all(
        files.galleryFiles.map(async (file: any) => {
          const result = await uploadToS3(file, serviceId, "galleryFiles")

          await prisma.serviceFile.create({
            data: {
              filename: result.fileName,
              mimeType: file.mimetype,
              url: result.url,
              type: result.fileType,
              serviceId
            }
          })
        })
      )
    }

    return { message: "Files synced successfully" }
  },

  // Helpers
  findAllTypes: () => prisma.serviceType.findMany(),

  findAllStatus: () => prisma.serviceStatus.findMany(),

  findAllStats: async (user: any) => {
    const where: any = {}

    if (user.userType !== "ADMIN") {
      where.userId = user.id
    }

    const [total, totalPending, totalApproved, totalRejected] = await Promise.all([
      prisma.service.count({
        where
      }),
      prisma.service.count({
        where: { ...where, serviceStatusId: 1 },
      }),
      prisma.service.count({
        where: { ...where, serviceStatusId: 2 },
      }),
      prisma.service.count({
        where: { ...where, serviceStatusId: 3 },
      }),
    ])

    return {
      total,
      totalPending,
      totalApproved,
      totalRejected
    }
  }
}
