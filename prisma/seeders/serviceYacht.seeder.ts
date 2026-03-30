// prisma/seeders/serviceYacht.seeder.ts
import { PrismaClient } from "@prisma/client/extension"

export const seedServiceYacht = async (prisma: PrismaClient) => {
  await prisma.yachtTripulationRole.createMany({
    data: [
      { name: "Bosun" },
      { name: "Captain" },
      { name: "Chef" },
      { name: "Chief Engineer" },
      { name: "Chief Officer" },
      { name: "Deckhand" },
      { name: "Dive Master" },
      { name: "Electrical Engineer / ETO" },
      { name: "Fitness Instructor" },
      { name: "Interior Manager / Purser" },
      { name: "Massage Therapist" },
      { name: "Personal Assistant" },
      { name: "Second Engineer" },
      { name: "Steward / Stewardess" }
    ],
    skipDuplicates: true,
  })

  await prisma.yachtAmenity.createMany({
    data: [
      { name: "Air Conditioning", lucideIcon: "AirVent" },
      { name: "Beach Club", lucideIcon: "Palmtree" },
      { name: "Cinema Room", lucideIcon: "Film" },
      { name: "Crew Quarters", lucideIcon: "Users" },
      { name: "Deck Jacuzzi", lucideIcon: "Bath" },
      { name: "Diving Equipment", lucideIcon: "Waves" },
      { name: "Fishing Gear", lucideIcon: "Fish" },
      { name: "Gym / Fitness Center", lucideIcon: "Dumbbell" },
      { name: "Helipad", lucideIcon: "CircleDot" },
      { name: "Indoor/Outdoor Dining", lucideIcon: "Utensils" },
      { name: "Jet Skis", lucideIcon: "Zap" },
      { name: "Kayaks & Paddleboards", lucideIcon: "Anchor" },
      { name: "Outdoor Bar", lucideIcon: "Wine" },
      { name: "Satellite TV & Internet", lucideIcon: "Satellite" },
      { name: "Sauna & Steam Room", lucideIcon: "Sprout" },
      { name: "Snorkeling Gear", lucideIcon: "Waves" },
      { name: "Stabilizers at Anchor", lucideIcon: "Scale" },
      { name: "State-of-the-Art Audio System", lucideIcon: "Music" },
      { name: "Sun Deck", lucideIcon: "Sun" },
      { name: "Swimming Platform", lucideIcon: "ArrowDown" },
      { name: "Tender Garage", lucideIcon: "Ship" },
      { name: "Underwater Lights", lucideIcon: "Lightbulb" },
      { name: "VIP Cabins", lucideIcon: "Crown" },
      { name: "Water Slide", lucideIcon: "TrendingDown" },
      { name: "Wi-Fi Hotspot", lucideIcon: "Wifi" }
    ],
    skipDuplicates: true,
  })  
}