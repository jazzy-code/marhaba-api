import { Request, Response, NextFunction } from "express"
// import multer from "multer"

export class HTTPError extends Error {
  statusCode: number

  constructor(statusCode: number, message: string) {
    super(message)
    this.statusCode = statusCode

    // Mantiene el stack trace correcto
    Error.captureStackTrace(this, this.constructor)
  }
}

// Ejemplos opcionales
export class UnauthorizedError extends HTTPError {
  constructor(message = "Unauthorized") {
    super(401, message)
  }
}

export class NotFoundError extends HTTPError {
  constructor(message = "Resource not found") {
    super(404, message)
  }
}

export const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // res.log.error(err)
  // logger.error(err)
  (res as any).err = err; 

  if (res.headersSent) return next(err)

  // Prisma errors (comunes)
  if (err.code === "P2002") {
    return res.status(400).json({
      statusCode: 400,
      message: "Unique constraint failed"
    })
  }

  if (err.code === "P2025") {
    return res.status(404).json({
      statusCode: 404,
      message: "Record not found"
    })
  }

  //  Custom HTTP errors 
  if (err instanceof HTTPError) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message,
      err
    })
  }

  // Fallback
  return res.status(500).json({
    statusCode: 500,
    message: err?.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack
    })
  })
}