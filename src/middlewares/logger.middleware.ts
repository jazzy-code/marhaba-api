import { logger } from "../utils/logger.js"
import { Request, Response } from "express"
import { pinoHttp } from "pino-http";

export const httpLogger = pinoHttp({
  logger,
  autoLogging: {
    ignore: (req: any) => false,
  },
  serializers: {
    req: (req: Request) => ({
      method: req.method,
      url: req.url,
    }),
    res: (res: Response) => ({
      statusCode: res.statusCode,
    }),
    err: (err: any) => err,
  },

  customLogLevel: (req: Request, res: Response) => {
    if (res.statusCode && res.statusCode >= 400) return 'error';
    return 'info';
  },
})