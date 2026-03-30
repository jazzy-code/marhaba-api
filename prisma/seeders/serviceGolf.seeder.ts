// prisma/seeders/serviceGolf.seeder.ts
import { PrismaClient } from "@prisma/client/extension"

export const seedServiceGolf = async (prisma: PrismaClient) => {
  await prisma.golfAmenity.createMany({
    data: [
      { name: "Beverage Cart Service", lucideIcon: "Wine" },
      { name: "Caddie Service", lucideIcon: "UserRound" },
      { name: "Club Fitting & Repair", lucideIcon: "Wrench" },
      { name: "Clubhouse / Lounge", lucideIcon: "Hotel" },
      { name: "Driving Range (Unlimited)", lucideIcon: "Flag" },
      { name: "Electric Golf Carts (GPS)", lucideIcon: "Zap" },
      { name: "Golf Bag Storage", lucideIcon: "Briefcase" },
      { name: "Golf Lessons (PGA Pro)", lucideIcon: "GraduationCap" },
      { name: "Golf Simulator (Trackman)", lucideIcon: "Monitor" },
      { name: "Snack Bar", lucideIcon: "Utensils" },
      { name: "Locker Rooms & Showers", lucideIcon: "Lock" },
      { name: "Luxury Pro Shop", lucideIcon: "ShoppingBag" },
      { name: "Night Golf (Floodlit)", lucideIcon: "Moon" },
      { name: "Practice Putting Green", lucideIcon: "Target" },
      { name: "Premium Club Rentals", lucideIcon: "Stick" },
      { name: "Private Caddie Master", lucideIcon: "Contact" },
      { name: "Refreshment Stations", lucideIcon: "CupSoda" },
      { name: "Short Game Area", lucideIcon: "Landplot" },
      { name: "Tee Time Management App", lucideIcon: "Smartphone" },
      { name: "VIP Locker Area", lucideIcon: "Gem" }
    ],
    skipDuplicates: true,
  })
}