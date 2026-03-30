// prisma/seeders/servicePrivateStaff.seeder.ts
import { PrismaClient } from "@prisma/client/extension"

export const seedServicePrivateStaff = async (prisma: PrismaClient) => {
  await prisma.privateStaffRole.createMany({
    data: [
      { name: "Butler / Majordomo" },
      { name: "Chauffeur / Private Driver" },
      { name: "Child Academy Tutor" },
      { name: "Private Chef" },
      { name: "Executive Assistant (EA)" },
      { name: "Gardener / Landscaper" },
      { name: "House Manager" },
      { name: "Housekeeper / Maid" },
      { name: "Lady's Maid / Valet" },
      { name: "Laundress / Wardrobe Manager" },
      { name: "Nanny / Childcare Specialist" },
      { name: "Personal Assistant (PA)" },
      { name: "Personal Chef" },
      { name: "Property Maintenance Technician" },
      { name: "Steward / Stewardess" },
      { name: "Waiter / Waitress" }
    ],
    skipDuplicates: true,
  })

  await prisma.privateStaffQualification.createMany({
    data: [
      { name: "First Aid & CPR", lucideIcon: "HeartPulse" },
      { name: "Background Check Verified", lucideIcon: "ShieldCheck" },
      { name: "Household Management Diploma", lucideIcon: "Award" },
      { name: "Childcare Certification", lucideIcon: "Baby" },
      { name: "Confidentiality Agreement (NDA)", lucideIcon: "FileKey" },
      { name: "Culinary Arts Degree", lucideIcon: "ChefHat" },
      { name: "Defensive & Evasive Driving Certificate", lucideIcon: "Car" },
      { name: "Etiquette Training", lucideIcon: "UserCheck" },
      { name: "International Driver's License", lucideIcon: "IdCard" },
      { name: "Police Service Record", lucideIcon: "Milestone" },
      { name: "Fitness Certification", lucideIcon: "Dumbbell" },
      { name: "Security Training", lucideIcon: "Lock" },
      { name: "Medical License", lucideIcon: "Stethoscope" },
      { name: "Lifeguard Certification", lucideIcon: "Waves" },
      { name: "Valid Passport & Travel Visas", lucideIcon: "Plane" }
    ],
    skipDuplicates: true,
  })
}