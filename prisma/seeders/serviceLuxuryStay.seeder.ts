// prisma/seeders/serviceLuxuryStay.seeder.ts
import { PrismaClient } from "@prisma/client/extension"

export const seedServiceLuxuryStay = async (prisma: PrismaClient) => {
  await prisma.luxuryStayCategory.createMany({
    data: [
      { name: "Apartment / Penthouse" },
      { name: "Boutique Hotel" },
      { name: "Castle / Chateâu" },
      { name: "Eco-Luxury Lodge" },
      { name: "Glamping / Luxury Camp" },
      { name: "Historic Mansion" },
      { name: "Private Island" },
      { name: "Resort & Spa" },
      { name: "Safari Lodge" },
      { name: "Ski Chalet" },
      { name: "Urban Loft" },
      { name: "Villa / Estate" }
    ],
    skipDuplicates: true,
  })

  await prisma.luxuryStayRoom.createMany({
    data: [
      { name: "Connecting Rooms" },
      { name: "Deluxe Room" },
      { name: "Duplex Suite" },
      { name: "Executive Suite" },
      { name: "Family Suite" },
      { name: "Grand Suite" },
      { name: "Junior Suite" },
      { name: "Loft Suite" },
      { name: "Master Suite" },
      { name: "Oceanfront Suite" },
      { name: "Penthouse Suite" },
      { name: "Presidential Suite" },
      { name: "Presidential Villa" },
      { name: "Royal Suite" },
      { name: "Standard Luxury Room" },
      { name: "Studio Suite" },
      { name: "Superior Room" },
      { name: "Swim-up Suite" },
      { name: "Two-Story Suite" }
    ],
    skipDuplicates: true,
  })

  await prisma.luxuryStayAmenity.createMany({
    data: [
      { name: "24/7 Butler Service", lucideIcon: "BellRing" },
      { name: "Air Conditioning / Climate Control", lucideIcon: "Wind" },
      { name: "Airport Transfer (Luxury Car)", lucideIcon: "Car" },
      { name: "Babysitting / Childcare", lucideIcon: "Baby" },
      { name: "Breakfast Included / Buffet", lucideIcon: "Coffee" },
      { name: "Chef / Private Cook", lucideIcon: "ChefHat" },
      { name: "Concierge Service", lucideIcon: "ConciergeBell" },
      { name: "Daily Housekeeping", lucideIcon: "Sparkles" },
      { name: "EV Charging Station", lucideIcon: "ChargingStation" },
      { name: "Fine Dining Restaurant", lucideIcon: "Utensils" },
      { name: "Fitness Center / Gym", lucideIcon: "Dumbbell" },
      { name: "Game Room / Entertainment", lucideIcon: "Gamepad2" },
      { name: "Garden / Private Park", lucideIcon: "Trees" },
      { name: "Heated Pool / Infinity Pool", lucideIcon: "Waves" },
      { name: "Home Cinema / Movie Room", lucideIcon: "Film" },
      { name: "Hot Tub / Jacuzzi", lucideIcon: "Bath" },
      { name: "In-room Bar / Wine Cellar", lucideIcon: "Wine" },
      { name: "In-room Safe", lucideIcon: "Safe" },
      { name: "Laundry / Dry Cleaning", lucideIcon: "Shirt" },
      { name: "Luxury Toiletry Kits", lucideIcon: "SprayCan" },
      { name: "Ocean / Mountain View", lucideIcon: "Mountain" },
      { name: "Office / Workspace", lucideIcon: "Briefcase" },
      { name: "Outdoor Grill / BBQ", lucideIcon: "Flame" },
      { name: "Parking (Valet Service)", lucideIcon: "ParkingCircle" },
      { name: "Pets Allowed", lucideIcon: "PawPrint" },
      { name: "Private Entrance", lucideIcon: "DoorOpen" },
      { name: "Private Terrace / Balcony", lucideIcon: "Sun" },
      { name: "Room Service", lucideIcon: "DoorClosed" },
      { name: "Sauna / Steam Room", lucideIcon: "Sprout" },
      { name: "Smart Home Controls", lucideIcon: "Tablet" },
      { name: "Spa / Wellness Center", lucideIcon: "Flower2" },
      { name: "Wi-Fi High Speed", lucideIcon: "Wifi" }
    ],
    skipDuplicates: true,
  })
}