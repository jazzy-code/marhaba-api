// prisma/seeders/languages.seeder.ts
import { PrismaClient } from "@prisma/client/extension"

export const seedLanguages = async (prisma: PrismaClient) => {
  await prisma.language.createMany({
    data: [
      { name: "Arabic" },
      { name: "Bulgarian" },
      { name: "Chinese" },
      { name: "Croatian" },
      { name: "Czech" },
      { name: "Danish" },
      { name: "Dutch" },
      { name: "English" },
      { name: "Finnish" },
      { name: "French" },
      { name: "German" },
      { name: "Greek" },
      { name: "Hindi" },
      { name: "Icelandic" },
      { name: "Italian" },
      { name: "Japanese" },
      { name: "Korean" },
      { name: "Norwegian" },
      { name: "Polish" },
      { name: "Portuguese" },
      { name: "Romanian" },
      { name: "Russian" },
      { name: "Slovak" },
      { name: "Spanish" },
      { name: "Swedish" },
      { name: "Turkish" },
      { name: "Ukrainian" },
    ],
    skipDuplicates: true,
  })
}