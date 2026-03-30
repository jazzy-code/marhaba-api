// prisma/seeders/servicePrivateEvent.seeder.ts
import { PrismaClient } from "@prisma/client/extension"

export const seedServicePrivateEvent = async (prisma: PrismaClient) => {
  await prisma.privateEventType.createMany({
    data: [
      { name: "Anniversary Celebration" },
      { name: "Art Gallery / Private Viewing" },
      { name: "Award Ceremony" },
      { name: "Bachelor / Bachelorette Party" },
      { name: "Birthday Party (VIP)" },
      { name: "Board Meeting / Executive Retreat" },
      { name: "Brand / Product Launch" },
      { name: "Charity Gala / Fundraiser" },
      { name: "Cocktail Reception" },
      { name: "Corporate Conference" },
      { name: "Engagement Party" },
      { name: "Fashion Show" },
      { name: "Holiday Party" },
      { name: "Private Concert / Performance" },
      { name: "Private Dinner / Banquet" },
      { name: "Social Soirée" },
      { name: "Team Building Retreat" },
      { name: "Themed Party" },
      { name: "Themed Gala" },
      { name: "Wedding / Elopement" },
      { name: "Wine / Spirits Tasting" }
    ],
    skipDuplicates: true,
  })

  await prisma.privateEventAmenity.createMany({
    data: [
      { name: "Audio-Visual Training", lucideIcon: "MonitorPlay" },
      { name: "Bartender", lucideIcon: "Martini" },
      { name: "Candy Bar", lucideIcon: "Candy" },
      { name: "Catering & Private Chef", lucideIcon: "ChefHat" },
      { name: "Cleaning Service (Pre/Post)", lucideIcon: "Sparkles" },
      { name: "Custom Lighting", lucideIcon: "Lightbulb" },
      { name: "DJ / Live Music", lucideIcon: "Music" },
      { name: "Event Decor & Flowers", lucideIcon: "Flower" },
      { name: "Event Planner", lucideIcon: "CalendarCheck" },
      { name: "Floral Arrangements", lucideIcon: "Sprout" },
      { name: "Furniture Rental (Lounge/Formal)", lucideIcon: "Armchair" },
      { name: "Luxury Portable Toilets", lucideIcon: "Bath" },
      { name: "Personal Security", lucideIcon: "ShieldCheck" },
      { name: "Photography & Videography", lucideIcon: "Camera" },
      { name: "Premium Glassware & Tableware", lucideIcon: "Utensils" },
      { name: "Red Carpet", lucideIcon: "ArrowRightToLine" },
      { name: "Valet Parking", lucideIcon: "Car" },
      { name: "Souvenirs", lucideIcon: "Gift" },
      { name: "Stage & Dance Floor", lucideIcon: "Layers" },
      { name: "Tenting & Canopy Structures", lucideIcon: "Tent" },
      { name: "Hostess Service", lucideIcon: "Languages" },
      { name: "Waitstaff", lucideIcon: "ConciergeBell" },
      { name: "Wi-Fi for Guests", lucideIcon: "Wifi" }
    ],
    skipDuplicates: true,
  })
}