// prisma/seeders/serviceLuxuryCar.seeder.ts
import { PrismaClient } from "@prisma/client/extension"

export const seedServiceLuxuryCar = async (prisma: PrismaClient) => {
  await prisma.luxuryCarColor.createMany({
    data: [
      // --- ACROMÁTICOS (Negros, Grises, Blancos) ---
      { name: "Obsidian Black Metallic", hex: "#0A0A0A" },
      { name: "Night Black Magno", hex: "#121212" },
      { name: "Graphite Grey Magno", hex: "#35393C" },
      { name: "Mountain Grey Magno", hex: "#4E5154" },
      { name: "Selenite Grey Metallic", hex: "#5F6366" },
      { name: "Titanium Grey Pearl", hex: "#707070" },
      { name: "Iridium Silver Metallic", hex: "#CECECE" },
      { name: "Chalk / Crayon", hex: "#E1E1E1" },
      { name: "Cashmere White Magno", hex: "#F2F2F2" },
      { name: "Diamond White Bright", hex: "#FDFDFD" },
      { name: "Deep White", hex: "#FFFFFF" },

      // --- CROMÁTICOS: CÁLIDOS (Rojos, Naranjas, Amarillos) ---
      { name: "Deep Bordeaux Metallic", hex: "#4C1C24" },
      { name: "Classic Red Leather", hex: "#8B0000" },
      { name: "Hyacinth Red Metallic", hex: "#A61016" },
      { name: "Guards Red", hex: "#E30000" },
      { name: "Arancio Atlas", hex: "#FF6600" },
      { name: "Papaya Orange", hex: "#FF8C00" },
      { name: "Champagne Gold", hex: "#D4AF37" },
      { name: "Giallo Modena", hex: "#FFD700" },
      { name: "Racing Yellow", hex: "#F4D03F" },

      // --- CROMÁTICOS: NATURALEZA (Verdes) ---
      { name: "Emerald Green Metallic", hex: "#022D15" },
      { name: "Lizard Green", hex: "#66FF00" },

      // --- CROMÁTICOS: FRÍOS (Azules) ---
      { name: "Nautical Blue Metallic", hex: "#152238" },
      { name: "Yacht Blue Leather", hex: "#2C3E50" },
      { name: "Spectral Blue Magno", hex: "#2B3D52" },
      { name: "Miami Blue", hex: "#00B2EE" },

      // --- CROMÁTICOS: MÍSTICOS (Morados y Rosas) ---
      { name: "Deep Purple Metallic", hex: "#301934" },
      { name: "Viola Parsifae", hex: "#4B0082" },
      { name: "Ultraviolet Purple", hex: "#663399" },
      { name: "Rose Gold Metallic", hex: "#B76E79" },

      // --- INTERIORES / TIERRAS (Cafés y Beiges) ---
      { name: "Nappa Black", hex: "#1A1A1A" },
      { name: "Truffle Brown", hex: "#523B30" },
      { name: "Bahia Brown", hex: "#63422B" },
      { name: "Saddle Brown Leather", hex: "#734A32" },
      { name: "Sienna Brown", hex: "#8A5A44" },
      { name: "Macchiato Beige", hex: "#E5D3B3" },
      { name: "Neva Grey", hex: "#D3D3D3" }
    ],
    skipDuplicates: true,
  })

  await prisma.luxuryCarLegalSituation.createMany({
    data: [
      // --- 1. ADMINISTRACIÓN (Estado DGT) ---
      { name: "Active / Registered" },
      { name: "Temporary De-registration" },
      { name: "Permanent De-registration" },
      { name: "Off-the-road (Automatic De-registration)" },

      // --- 2. CARGAS Y RESTRICCIONES ---
      { name: "Lien / Embargo" },
      { name: "Sealed / Seized (Precinto)" },
      { name: "Retention of Title (Reserva de Dominio)" },
      { name: "Pending Taxes or Inspection (ITV)" },

      // --- 3. ESTADOS ESPECIALES ---
      { name: "Historical Vehicle" },
      { name: "Unregistered / Import in Progress" },
      { name: "Diplomatic Plates" }
    ],
    skipDuplicates: true,
  })

  await prisma.luxuryCarAmenity.createMany({
    data: [
      { name: "Adaptive Cruise Control", lucideIcon: "Gauge" },
      { name: "Adaptive Suspension", lucideIcon: "Activity" },
      { name: "Air Conditioning", lucideIcon: "Wind" },
      { name: "Airbags", lucideIcon: "Shield" },
      { name: "All-Wheel Drive (AWD)", lucideIcon: "Axis3d" },
      { name: "Ambient Lighting", lucideIcon: "Lightbulb" },
      { name: "Anti-lock Braking System (ABS)", lucideIcon: "CircleStop" },
      { name: "Apple CarPlay / Android Auto", lucideIcon: "SmartphoneNfc" },
      { name: "Blind Spot Assist", lucideIcon: "EyeOff" },
      { name: "Bluetooth Connectivity", lucideIcon: "Bluetooth" },
      { name: "Burmester / Bose Sound System", lucideIcon: "Speaker" },
      { name: "Carbon Ceramic Brakes", lucideIcon: "Disc" },
      { name: "Convertible / Soft Top", lucideIcon: "Sun" },
      { name: "GPS Navigation System", lucideIcon: "MapPinned" },
      { name: "Head-Up Display (HUD)", lucideIcon: "Projector" },
      { name: "Heated & Ventilated Seats", lucideIcon: "ThermometerSnowflake" },
      { name: "Keyless Entry & Go", lucideIcon: "Key" },
      { name: "LED Matrix Headlights", lucideIcon: "Zap" },
      { name: "Luggage Rack / Trunk Space", lucideIcon: "Briefcase" },
      { name: "Massage Seats", lucideIcon: "Waves" },
      { name: "Night Vision Assist", lucideIcon: "Moon" },
      { name: "Panoramic Sunroof", lucideIcon: "View" },
      { name: "Parking Assistant", lucideIcon: "ParkingCircle" },
      { name: "Premium Audio System", lucideIcon: "Music" },
      { name: "Refrigerator / Cool Box", lucideIcon: "Refrigerator" },
      { name: "Shatterproof Sunroof (Quemacocos)", lucideIcon: "Square" },
      { name: "Snacks & Refreshments", lucideIcon: "Utensils" },
      { name: "Soft Close Doors", lucideIcon: "LockKeyhole" },
      { name: "Sport Exhaust System", lucideIcon: "Wind" },
      { name: "Wi-Fi Hotspot", lucideIcon: "Wifi" },
      { name: "Wireless Charging", lucideIcon: "BatteryCharging" },
      { name: "360° Surround View Camera", lucideIcon: "ScanEye" }
    ],
    skipDuplicates: true,
  })
}