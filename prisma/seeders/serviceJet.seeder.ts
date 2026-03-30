// prisma/seeders/serviceJet.seeder.ts
import { PrismaClient } from "@prisma/client/extension"

export const seedServiceJet = async (prisma: PrismaClient) => {
  await prisma.jetCategory.createMany({
    data: [
      { name: "Heavy Jet" },
      { name: "Light Jet" },
      { name: "Midsize Jet" },
      { name: "Super Heavy / Executive Airliner" },
      { name: "Super Light Jet" },
      { name: "Super Midsize Jet" },
      { name: "Turboprop" },
      { name: "Very Light Jet (VLJ)" }
    ],
    skipDuplicates: true,
  })

  await prisma.jetCatering.createMany({
    data: [
      { name: "A la Carte Dining" },
      { name: "Breakfast & Brunch" },
      { name: "Cold Platter (Deli & Seafood)" },
      { name: "Fine Dining (Multi-course)" },
      { name: "Premium & Open Bar" },
      { name: "Standard & Open Bar" },
      { name: "Snacks & Refreshments" },
      { name: "Special Dietary (Vegan/GF)" },
    ],
    skipDuplicates: true,
  })

  await prisma.jetAmenity.createMany({
    data: [
      { name: "Air Conditioning", lucideIcon: "Wind" },
      { name: "Apple CarPlay / Android Auto", lucideIcon: "SmartphoneNfc" },
      { name: "Bluetooth Connectivity", lucideIcon: "Bluetooth" },
      { name: "Cabin Humidification System", lucideIcon: "Droplets" },
      { name: "Coffee & Espresso Station", lucideIcon: "Coffee" },
      { name: "Conference Table / Meeting Area", lucideIcon: "Users" },
      { name: "En-suite Bathroom (Lavatory)", lucideIcon: "Bath" },
      { name: "Flat-bed Seats", lucideIcon: "Bed" },
      { name: "Flight Attendant Service", lucideIcon: "ConciergeBell" },
      { name: "Full Galley (Kitchen)", lucideIcon: "ChefHat" },
      { name: "In-flight Entertainment (IFE)", lucideIcon: "Play" },
      { name: "Large Luggage Compartment", lucideIcon: "Briefcase" },
      { name: "Luxury Interior (Leather/Wood)", lucideIcon: "Gem" },
      { name: "Noise-Canceling Headphones", lucideIcon: "Headphones" },
      { name: "On-board Shower", lucideIcon: "ShowerHead" },
      { name: "Panoramic Windows", lucideIcon: "View" },
      { name: "Personal Reading Lights", lucideIcon: "Lamp" },
      { name: "Pet Friendly", lucideIcon: "PawPrint" },
      { name: "Premium Audio System", lucideIcon: "Music" },
      { name: "Private Bedroom / Master Suite", lucideIcon: "DoorClosed" },
      { name: "Refreshment Center / Minibar", lucideIcon: "Wine" },
      { name: "Satellite Phone", lucideIcon: "Phone" },
      { name: "Satellite Wi-Fi (Starlink/Ka-Band)", lucideIcon: "Wifi" },
      { name: "Sky Chef", lucideIcon: "Utensils" },
      { name: "Smoking Area / Lounge", lucideIcon: "Cigarette" },
      { name: "TV & Video Entertainment", lucideIcon: "Tv" },
      { name: "Wireless Charging", lucideIcon: "BatteryCharging" }
    ],
    skipDuplicates: true,
  })
}