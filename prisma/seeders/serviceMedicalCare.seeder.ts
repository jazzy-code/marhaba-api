// prisma/seeders/serviceMedicalCare.seeder.ts
import { PrismaClient } from "@prisma/client/extension"

export const seedServiceMedicalCare = async (prisma: PrismaClient) => {
  await prisma.medicalCareAttention.createMany({
    data: [
      { name: "24/7 On-Call Medical Training" },
      { name: "Emergency Response Service" },
      { name: "Home Visit / In-Stay Care" },
      { name: "In-Clinic Consultation" },
      { name: "In-Patient Hospitalization" },
      { name: "Medical Escort Service" },
      { name: "Mobile Medical Unit" },
      { name: "Nursing Care (Short/Long Term)" },
      { name: "On-Site Event Medical Cover" },
      { name: "Out-Patient Care" },
      { name: "Post-Surgery Home Training" },
      { name: "Telemedicine / Remote Monitoring" },
      { name: "VIP Hospital Wing Access" }
    ],
    skipDuplicates: true,
  })

  await prisma.medicalCareSpecialty.createMany({
    data: [
      { name: "Allergy & Immunology" },
      { name: "Anesthesiology" },
      { name: "Cardiology" },
      { name: "Dermatology" },
      { name: "Endocrinology" },
      { name: "Gastroenterology" },
      { name: 'General Medicine' },
      { name: "Geriatrics" },
      { name: "Gynecology & Obstetrics" },
      { name: "Internal Medicine" },
      { name: "Nefrology" },
      { name: "Neurology" },
      { name: "Ophthalmology" },
      { name: "Orthopedics & Traumatology" },
      { name: "Otolaryngology (ENT)" },
      { name: "Pediatrics" },
      { name: "Plastic & Reconstructive Surgery" },
      { name: "Psychiatry" },
      { name: "Pulmonology" },
      { name: "Radiology" },
      { name: "Rheumatology" },
      { name: "Sports Medicine" },
      { name: "Urology" }
    ],
    skipDuplicates: true,
  })

  await prisma.medicalCareService.createMany({
    data: [
      { name: "24/7 Video Consultation", lucideIcon: "Video" },
      { name: "Advanced First Aid Kit", lucideIcon: "FirstAidKit" },
      { name: "Air Ambulance Access", lucideIcon: "Plane" },
      { name: "Automated External Defibrillator (AED)", lucideIcon: "HeartPulse" },
      { name: "Bedside Monitoring System", lucideIcon: "Activity" },
      { name: "Biometric Health Tracking", lucideIcon: "Fingerprint" },
      { name: "Blood Test On-Site", lucideIcon: "HeartPulse" },
      { name: "Diagnostic Lab On-Site", lucideIcon: "FlaskConical" },
      { name: "Emergency Oxygen Supply", lucideIcon: "Wind" },
      { name: "In-Room Hospital Bed", lucideIcon: "Bed" },
      { name: "IV Drip Therapy Station", lucideIcon: "Syringe" },
      { name: "Medical Grade Air Purifier", lucideIcon: "AirVent" },
      { name: "Medical Language Interpreter", lucideIcon: "Languages" },
      { name: "Medication Management / Pharmacy", lucideIcon: "Pill" },
      { name: "Mobile X-Ray / Ultrasound", lucideIcon: "Scan" },
      { name: "Non-Invasive Vital Sensors", lucideIcon: "Stethoscope" },
      { name: "Personal Health Coordinator", lucideIcon: "UserRoundCheck" },
      { name: "Portable Ventilator", lucideIcon: "Fan" },
      { name: "Private Medical Transport", lucideIcon: "Ambulance" },
      { name: "Rehabilitation Equipment", lucideIcon: "Accessibility" },
      { name: "Remote Patient Monitoring", lucideIcon: "Rss" },
      { name: "Telemedicine Hub", lucideIcon: "MonitorSmartphone" },
      { name: "Trauma & Wound Care Kit", lucideIcon: "Bandage" },
      { name: "VIP Hospital Fast-Track", lucideIcon: "Zap" },
      { name: "Wheelchair & Mobility Aids", lucideIcon: "CircleUser" }
    ],
    skipDuplicates: true,
  })
}