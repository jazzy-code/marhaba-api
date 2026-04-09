// prisma/seeders/serviceTypes.seeder.ts
import { PrismaClient } from "@prisma/client/extension"

export const seedServiceTypes = async (prisma: PrismaClient) => {
  await prisma.serviceType.createMany({
    data: [
      { name: "Real Estate", key: "RealEstate", slug: "real-estate", categoryId: 1 },
      { name: "Luxury Car", key: "LuxuryCar", slug: "luxury-car", categoryId: 2 },
      { name: "Yacht", key: "Yacht", slug: "yacht", categoryId: 2 },
      { name: "Jet", key: "Jet", slug: "jet", categoryId: 2 },
      { name: "Luxury Stay", key: "LuxuryStay", slug: "luxury-stay", categoryId: 1 },
      { name: "Medical Care", key: "MedicalCare", slug: "medical-care", categoryId: 3 },
      { name: "Security Guard", key: "SecurityGuard", slug: "security-guard", categoryId: 4 },
      { name: "Private Event", key: "PrivateEvent", slug: "private-event", categoryId: 3 },
      { name: "Private Staff", key: "PrivateStaff", slug: "private-staff", categoryId: 4 },
      { name: "Beauty Spa", key: "BeautySpa", slug: "beauty-spa", categoryId: 3 },
      { name: "Golf", key: "Golf", slug: "golf", categoryId: 3 },
      { name: "Training Coach", key: "TrainingCoach", slug: "training-coach", categoryId: 3 },
    ],
    skipDuplicates: true,
  })
}