// prisma/seeders/serviceBeautySpa.seeder.ts
import { PrismaClient } from "@prisma/client/extension"

export const seedServiceBeautySpa = async (prisma: PrismaClient) => {
  await prisma.beautySpaTreatment.createMany({
    data: [
      { name: "Aromatherapy Massage" },
      { name: "Ayurvedic Therapy" },
      { name: "Body Scrub & Polish" },
      { name: "Body Wrap (Mud/Seaweed)" },
      { name: "Deep Tissue Massage" },
      { name: "Detoxification Program" },
      { name: "Facial: Anti-Aging / Lifting" },
      { name: "Facial: Deep Cleansing" },
      { name: "Facial: Hydrating / Vitamin C" },
      { name: "Foot Reflexology" },
      { name: "Hot Stone Massage" },
      { name: "Hydrotherapy / Balneotherapy" },
      { name: "Lymphatic Drainage" },
      { name: "Manicure & Pedicure (Spa)" },
      { name: "Microdermabrasion" },
      { name: "Prenatal Massage" },
      { name: "Shiatsu / Thai Massage" },
      { name: "Sports Massage" },
      { name: "Steam Room & Sauna Access" },
      { name: "Yacht / In-Villa Spa Service" }
    ],
    skipDuplicates: true,
  })

  await prisma.beautySpaProduct.createMany({
    data: [
      { name: "Anti-Aging Serum (Hyaluronic/Retinol)" },
      { name: "Aromatic Essential Oils" },
      { name: "Cleansing Milk" },
      { name: "Detoxifying Clay Mask" },
      { name: "Exfoliating Body Scrub (Sea Salt/Sugar)" },
      { name: "Eye Contour Cream" },
      { name: "Facial Mist" },
      { name: "Facial Toner (Alcohol-Free)" },
      { name: "Foot & Hand Repair Cream" },
      { name: "Hair Mask" },
      { name: "Lip Balm" },
      { name: "Luxury Bath Salts / Soaks" },
      { name: "Massage Oil (Organic/Cold-pressed)" },
      { name: "Micellar Water" },
      { name: "Night Recovery Cream" },
      { name: "Organic Sunscreen / SPF 50+" },
      { name: "Peptide Revitalizing Cream" },
      { name: "Revitalizing Oil" },
      { name: "Rich Moisturizer" },
      { name: "Soothing Body Lotion" },
      { name: "Satin Eye Mask" },
      { name: "Thermal Water" },
      { name: "Vitamin C Brightening Concentrate" },
      { name: "Whitening Correction Treatment" }
    ],
    skipDuplicates: true,
  })
}