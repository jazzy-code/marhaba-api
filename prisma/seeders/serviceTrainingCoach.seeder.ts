// prisma/seeders/serviceTrainingCoach.seeder.ts
import { PrismaClient } from "@prisma/client/extension"

export const seedServiceTrainingCoach = async (prisma: PrismaClient) => {
  await prisma.trainingCoachDiscipline.createMany({
    data: [
      { name: "Bodybuilding / Hypertrophy" },
      { name: "Boxing / Kickboxing / Martial Arts" },
      { name: "Calisthenics / Bodyweight Training" },
      { name: "Cardiovascular / HIIT Training" },
      { name: "Crossfit / Functional Fitness" },
      { name: "Corrective Exercise / Posture Correction" },
      { name: "Endurance Training (Marathon/Triathlon)" },
      { name: "Flexibility & Mobility Training" },
      { name: "Golf-Specific Fitness Training" },
      { name: "Low-Impact Training (Senior/Injury)" },
      { name: "Olympic Weightlifting" },
      { name: "Outdoor / Boot Camp Training" },
      { name: "Pilates (Mat & Reformer)" },
      { name: "Powerlifting / Strength Training" },
      { name: "Pre-Natal & Post-Natal Fitness" },
      { name: "Sports-Specific Conditioning (Tennis, Ski, etc.)" },
      { name: "Swimming / Aquatic Training" },
      { name: "TRX / Suspension Training" },
      { name: "Yoga (Vinyasa, Hatha, Ashtanga)" }
    ],
    skipDuplicates: true,
  })
}