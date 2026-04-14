import prisma from "../../lib/prisma.js";


export const HelpersService = {
  findAllCountries: () => {
    return prisma.country.findMany()
  },

  findAllMalagaRegions: () => {
    return prisma.malagaRegion.findMany()
  },

  findAllMalagaCities: (regionId?: number | null) => {
    if (regionId) {
      return prisma.malagaCity.findMany({ where: { regionId } })
    }

    return prisma.malagaCity.findMany()
  },  

  findAllLanguages: () => {
    return prisma.language.findMany()
  },
}
