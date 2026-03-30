// prisma/seeders/serviceSecurityGuard.seeder.ts
import { PrismaClient } from "@prisma/client/extension"

export const seedServiceSecurityGuard = async (prisma: PrismaClient) => {
  await prisma.securityGuardBackgroundType.createMany({
    data: [
      { name: "Civilian Security Professional" },
      { name: "Ex-Law Enforcement / Police" },
      { name: "Ex-Military / Special Forces" },
      { name: "Government Intelligence Agency" },
      { name: "Intelligence & Counter-Surveillance" },
      { name: "Private Security Specialist" },
      { name: "Tactical Response Unit" }
    ],
    skipDuplicates: true,
  })

  await prisma.securityGuardProfile.createMany({
    data: [
      { name: "Armed Security" },
      { name: "Asset Protection" },
      { name: "Bodyguard / Close Protection (CP)" },
      { name: "Cybersecurity" },
      { name: "Driver / Security Chauffeur" },
      { name: "Electronic Surveillance" },
      { name: "Event Security" },
      { name: "Executive Protection (EP)" },
      { name: "K9 Security Handler" },
      { name: "Maritime Security" },
      { name: "Paramedic Security" },
      { name: "Residential Security Team (RST)" },
      { name: "Static Security" },
      { name: "Tactical Response" },
      { name: "Unarmed Security" },
      { name: "VIP Escort" }
    ],
    skipDuplicates: true,
  })
}