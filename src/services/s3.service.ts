import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3"
import { v4 as uuid } from "uuid"
import { getFileType, FileType } from "../utils/fileType"
import { s3Client } from "@/config/s3Client"
import { env } from "@/config/env"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

export const uploadToS3 = async (
  file: Express.Multer.File,
  serviceId: number,
  folder: "heroImage" | "providerLogo" | "galleryFiles"
) => {
  const fileType: FileType = getFileType(file.mimetype)

  let basePath = ""

  if (folder === "heroImage") {
    basePath = `services/${serviceId}/heroImage`
  } else if (folder === "providerLogo") {
    basePath = `services/${serviceId}/providerLogo`
  } else {
    basePath = `services/${serviceId}/${fileType}s`
  }

  const extension = file.originalname.split(".").pop()
  const fileName = `${uuid()}.${extension}`

  const key = `${basePath}/${fileName}`

  await s3Client.send(
    new PutObjectCommand({
      Bucket: env.AWS_S3_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      // ACL: "public-read"
    })
  )

  return {
    key,
    url: `https://${env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${key}`,
    fileName,
    fileType
  }
}

export const getSignedUrlFromS3 = async (key: string) => {
  const command = new GetObjectCommand({
    Bucket: env.AWS_S3_BUCKET_NAME,
    Key: key
  })

  const url = await getSignedUrl(s3Client, command, {
    expiresIn: 60 * 5 // 5 minutos
  })

  return url
}