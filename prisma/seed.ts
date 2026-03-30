// prisma/seed.ts
import prisma from "../src/lib/prisma"
import { seedCountries } from "./seeders/countries.seeder"
import { seedLanguages } from "./seeders/languajes.seeder"
import { seedMalagaRegions } from "./seeders/malagaRegions.seeder"
import { seedServiceBeautySpa } from "./seeders/serviceBeautySpa.seeder"
import { seedServiceGolf } from "./seeders/serviceGolf.seeder"
import { seedServiceJet } from "./seeders/serviceJet.seeder"
import { seedServiceLuxuryCar } from "./seeders/serviceLuxuryCar.seeder"
import { seedServiceLuxuryStay } from "./seeders/serviceLuxuryStay.seeder"
import { seedServiceMedicalCare } from "./seeders/serviceMedicalCare.seeder"
import { seedServicePrivateEvent } from "./seeders/servicePrivateEvent.seeder"
import { seedServicePrivateStaff } from "./seeders/servicePrivateStaff.seeder"
import { seedServiceRealEstate } from "./seeders/serviceRealEstate.seeder"
import { seedServiceSecurityGuard } from "./seeders/serviceSecurityGuard.seeder"
import { seedServiceStatus } from "./seeders/serviceStatus.seeder"
import { seedServiceTrainingCoach } from "./seeders/serviceTrainingCoach.seeder"
import { seedServiceTypes } from "./seeders/serviceTypes.seeder"
import { seedServiceYacht } from "./seeders/serviceYacht.seeder"
import { seedUsers } from "./seeders/users.seeder"

async function main() {
  console.log("🌱 Starting seeding...")

  await seedCountries(prisma)
  await seedMalagaRegions(prisma)
  await seedLanguages(prisma)

  await seedServiceStatus(prisma)
  await seedServiceTypes(prisma)

  await seedServiceBeautySpa(prisma)
  await seedServiceGolf(prisma)
  await seedServiceJet(prisma)
  await seedServiceLuxuryCar(prisma)
  await seedServiceLuxuryStay(prisma)
  await seedServiceMedicalCare(prisma)
  await seedServicePrivateEvent(prisma)
  await seedServicePrivateStaff(prisma)
  await seedServiceRealEstate(prisma)
  await seedServiceSecurityGuard(prisma)
  await seedServiceTrainingCoach(prisma)
  await seedServiceYacht(prisma)

  await seedUsers(prisma)

  console.log("✅ Seeding finished")
}

main()
  .catch((error) => {
    console.error("❌ Seeding error:", error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })