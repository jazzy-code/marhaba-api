// prisma/seed.ts
import prisma from "../src/lib/prisma.js"
import { seedCategories } from "./seeders/categories.seeder.js"
import { seedCountries } from "./seeders/countries.seeder.js"
import { seedLanguages } from "./seeders/languajes.seeder.js"
import { seedMalagaRegions } from "./seeders/malagaRegions.seeder.js"
import { seedServiceBeautySpa } from "./seeders/serviceBeautySpa.seeder.js"
import { seedServiceGolf } from "./seeders/serviceGolf.seeder.js"
import { seedServiceJet } from "./seeders/serviceJet.seeder.js"
import { seedServiceLuxuryCar } from "./seeders/serviceLuxuryCar.seeder.js"
import { seedServiceLuxuryStay } from "./seeders/serviceLuxuryStay.seeder.js"
import { seedServiceMedicalCare } from "./seeders/serviceMedicalCare.seeder.js"
import { seedServicePrivateEvent } from "./seeders/servicePrivateEvent.seeder.js"
import { seedServicePrivateStaff } from "./seeders/servicePrivateStaff.seeder.js"
import { seedServiceRealEstate } from "./seeders/serviceRealEstate.seeder.js"
import { seedServiceSecurityGuard } from "./seeders/serviceSecurityGuard.seeder.js"
import { seedServiceStatus } from "./seeders/serviceStatus.seeder.js"
import { seedServiceTrainingCoach } from "./seeders/serviceTrainingCoach.seeder.js"
import { seedServiceTypes } from "./seeders/serviceTypes.seeder.js"
import { seedServiceYacht } from "./seeders/serviceYacht.seeder.js"
import { seedUsers } from "./seeders/users.seeder.js"

async function main() {
  console.log("🌱 Starting seeding...")

  await seedCategories(prisma)
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