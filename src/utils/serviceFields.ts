export const SERVICE_FIELDS = [
  "serviceTypeId",
  "reference",
  "title",
  "subtitle",
  "shortDescription",
  "longDescription",
  "regionId",
  "cityId",
  "district",
  "address",
  "locationUrl",
  "exclusiveListing",
  "latitute",
  "longitude",
  "privacyLevel",
  "priceModel",
  "price",
  "currency",
  "heroImageUrl",
  "providerLogoUrl",
  "videoUrl",
  "serviceStatusId",
  "userId"
]

export const extractServiceData = (data: any) => {
  const serviceData: any = {}
  const restData: any = {}

  Object.entries(data).forEach(([key, value]) => {
    if (SERVICE_FIELDS.includes(key)) {
      serviceData[key] = value
    } else {
      restData[key] = value
    }
  })

  return { serviceData, restData }
}

export const transformDataForPrisma = (data: any) => {
  const result: any = {}

  Object.entries(data).forEach(([key, value]) => {
    // Si viene un xxxId vacío, lo regresamos como undefined para no crear la relation (connect: id)
    if (key.endsWith("Id") && value === "") {
      const relationName = key.replace("Id", "")

      result[relationName] = undefined

      return
    }

    // Convertir strings vacíos a null
    if (value === "") {
      result[key] = null
      return
    }

    // Detectar números
    if (typeof value === "string" && !isNaN(Number(value)) && !key.endsWith("Id") && key !== "reference") {
      result[key] = Number(value)
      return
    }

    // Detectar relaciones (xxxId) no vacías
    if (key.endsWith("Id") && value !== null && value !== undefined) {
      const relationName = key.replace("Id", "")

      result[relationName] = {
        connect: { id: Number(value) }
      }

      return
    }

    // Este es más para "updates" cuando llega un objeto de relacion con id, lo transformamos en connect
    if (value instanceof Object && "id" in value && value.id !== null && value.id !== undefined) {
      result[key] = {
        connect: { id: value.id }
      }
      return
    }

    // 🧠 Default
    result[key] = value
  })

  return result
}

// utils/transformNull.ts
export function nullToEmptyString(obj: any): any {
  // 1. Si es null, lo convertimos a string vacío
  if (obj === null) return "";

  // 2. Si no es un objeto (string, number, boolean, undefined), lo devolvemos tal cual
  if (typeof obj !== 'object') return obj;

  // 3. EXCEPCIÓN: Si es una instancia de Date, no la recorremos
  if (obj instanceof Date) return obj;

  // 4. Si es un Array, procesamos sus elementos
  if (Array.isArray(obj)) return obj.map(nullToEmptyString);

  // 5. Si es un objeto literal, procesamos sus llaves
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, nullToEmptyString(value)])
  );
}