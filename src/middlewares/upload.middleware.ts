import multer from "multer"

export const uploadFiles = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024 // por si subes video
  }
}).fields([
  { name: "heroImage", maxCount: 1 },
  { name: "providerLogo", maxCount: 1 },
  { name: "galleryFiles", maxCount: 6 }
])