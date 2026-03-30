// prisma/seeders/serviceRealEstate.seeder.ts
import { PrismaClient } from "@prisma/client/extension"

export const seedServiceRealEstate = async (prisma: PrismaClient) => {
  await prisma.realEstateType.createMany({
    data: [
      { name: "Villa" },
      { name: "Town House" },
      { name: "Cottage House" },
      { name: "Apartment" },
      { name: "Duplex" },
      { name: "Loft" },
      { name: "Condo" },
      { name: "Mansion" },
      { name: "Bungalow" },
      { name: "Office" },
      { name: "Warehouse" },
      { name: "Land" }
    ],
    skipDuplicates: true,
  })

  await prisma.realEstateStayType.createMany({
    data: [
      { name: "Short Stay" },
      { name: "Medium Stay" },
      { name: "Long Stay" },
      { name: "Students Stay" },
      { name: "Business Stay" },
    ],
    skipDuplicates: true,
  })

  await prisma.realEstateHousingStatus.createMany({
    data: [
      { name: "Good Condition" },
      { name: "Average Condition" },
      { name: "Bad Condition" },
      { name: "New Construction" },
      { name: "Under Construction" },
      { name: "Needs Renovation" },
    ],
    skipDuplicates: true,
  })

  await prisma.realEstateAmenity.createMany({
    data: [
      { name: "Air Conditioning", lucideIcon: "AirVent" },
      { name: "Alarm System", lucideIcon: "BellRing" },
      { name: "Balcony", lucideIcon: "Fence" },
      { name: "Barbecue Area", lucideIcon: "UtensilsCrossed" },
      { name: "Beachfront", lucideIcon: "Palmtree" },
      { name: "Billiard Room", lucideIcon: "CircleDollarSign" },
      { name: "Business Center", lucideIcon: "Briefcase" },
      { name: "Central Heating", lucideIcon: "Thermometer" },
      { name: "Cinema Room", lucideIcon: "Film" },
      { name: "Club House", lucideIcon: "Building2" },
      { name: "Cigar Lounge", lucideIcon: "Cigarette" },
      { name: "Covered Parking", lucideIcon: "CarFront" },
      { name: "Elevator", lucideIcon: "ArrowDownUp" },
      { name: "Equipped Kitchen", lucideIcon: "ChefHat" },
      { name: "Fireplace", lucideIcon: "FlameKindling" },
      { name: "Furnished", lucideIcon: "Armchair" },
      { name: "Game Room", lucideIcon: "Dices" },
      { name: "Garden", lucideIcon: "Flower2" },
      { name: "Golf Course View", lucideIcon: "FlagTriangleRight" },
      { name: "Gym", lucideIcon: "Dumbbell" },
      { name: "Guest House", lucideIcon: "Home" },
      { name: "Hot Tub / Jacuzzi", lucideIcon: "Bath" },
      { name: "Infinity Pool", lucideIcon: "Waves" },
      { name: "Laundry Room", lucideIcon: "WashingMachine" },
      { name: "Library", lucideIcon: "LibraryBig" },
      { name: "Ocean View", lucideIcon: "Binoculars" },
      { name: "Outdoor Kitchen", lucideIcon: "Soup" },
      { name: "Panic Room", lucideIcon: "ShieldAlert" },
      { name: "Private Dock", lucideIcon: "Anchor" },
      { name: "Private Entrance", lucideIcon: "DoorOpen" },
      { name: "Rooftop Terrace", lucideIcon: "MapPin" },
      { name: "Sauna", lucideIcon: "Sprout" },
      { name: "Security 24/7", lucideIcon: "ShieldCheck" },
      { name: "Smart Home System", lucideIcon: "Cpu" },
      { name: "Solar Panels", lucideIcon: "Sun" },
      { name: "Spa", lucideIcon: "Flower" },
      { name: "Tennis Court", lucideIcon: "Goal" },
      { name: "Walk-in Closet", lucideIcon: "Shirt" },
      { name: "Wine Cellar", lucideIcon: "Wine" },
    ],
    skipDuplicates: true,
  })

  await prisma.realEstateService.createMany({
    data: [
      { name: "24/7 Concierge", lucideIcon: "ConciergeBell" },
      { name: "Airport Transfer", lucideIcon: "PlaneTakeoff" },
      { name: "Babysitting Service", lucideIcon: "Baby" },
      { name: "Breakfast Included", lucideIcon: "Coffee" },
      { name: "Car Rental", lucideIcon: "Car" },
      { name: "Daily Cleaning", lucideIcon: "Sparkles" },
      { name: "Dry Cleaning & Laundry", lucideIcon: "Shirt" },
      { name: "Grocery Pre-stocking", lucideIcon: "ShoppingCart" },
      { name: "Massage & Wellness", lucideIcon: "Flower" },
      { name: "Menu à la Carte", lucideIcon: "BookOpen" },
      { name: "Personal Chef", lucideIcon: "ChefHat" },
      { name: "Personal Driver", lucideIcon: "SteeringWheel" },
      { name: "Personal Trainer", lucideIcon: "Dumbbell" },
      { name: "Pet Friendly", lucideIcon: "PawPrint" },
      { name: "Private Security", lucideIcon: "ShieldCheck" },
      { name: "Tour Guide", lucideIcon: "Map" },
      { name: "VIP Nightlife Access", lucideIcon: "Music" },
      { name: "Welcome Pack", lucideIcon: "Gift" },
      { name: "Yoga Classes", lucideIcon: "Sun" },
    ],
    skipDuplicates: true,
  })
}