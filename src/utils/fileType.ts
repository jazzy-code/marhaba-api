export type FileType = "IMAGE" | "VIDEO" | "DOCUMENT"

export const getFileType = (mime: string): FileType => {
  if (mime.startsWith("image/")) return "IMAGE"
  if (mime.startsWith("video/")) return "VIDEO"
  return "DOCUMENT"
}