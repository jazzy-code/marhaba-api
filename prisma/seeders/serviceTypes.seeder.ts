// prisma/seeders/serviceTypes.seeder.ts
import { PrismaClient } from "@prisma/client/extension"

export const seedServiceTypes = async (prisma: PrismaClient) => {
  await prisma.serviceType.createMany({
    data: [
      { name: "Real Estate", key: "RealEstate", slug: "real-estate" },
      { name: "Luxury Car", key: "LuxuryCar", slug: "luxury-car" },
      { name: "Yacht", key: "Yacht", slug: "yacht" },
      { name: "Jet", key: "Jet", slug: "jet" },
      { name: "Luxury Stay", key: "LuxuryStay", slug: "luxury-stay" },
      { name: "Medical Care", key: "MedicalCare", slug: "medical-care" },
      { name: "Security Guard", key: "SecurityGuard", slug: "security-guard" },
      { name: "Private Event", key: "PrivateEvent", slug: "private-event" },
      { name: "Private Staff", key: "PrivateStaff", slug: "private-staff" },
      { name: "Beauty Spa", key: "BeautySpa", slug: "beauty-spa" },
      { name: "Golf", key: "Golf", slug: "golf" },
      { name: "Training Coach", key: "TrainingCoach", slug: "training-coach" },
    ],
    skipDuplicates: true,
  })
}