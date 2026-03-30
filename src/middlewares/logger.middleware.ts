import pinoHttp from "pino-http"
import { logger } from "../utils/logger"
import pino from "pino"

export const httpLogger = pinoHttp({
  logger,
  autoLogging: {
    ignore: (req) => false,
  },
  serializers: {
    req: (req) => ({
      method: req.method,
      url: req.url,
    }),
    res: (res) => ({
      statusCode: res.statusCode,
    }),
    err: (err) => err,
  },

  customLogLevel: (req, res) => {
    if (res.statusCode && res.statusCode >= 400) return 'error';
    return 'info';
  },
})