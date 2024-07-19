import { transformAndValidate } from 'class-transformer-validator'
import { Request, Response, NextFunction } from 'express'

const isProd = process.env.NODE_ENV === 'production'

type RequestType = 'body' | 'query' | 'params' | 'headers'

function makeValidate<T>(
  c: T,
  type: RequestType = 'body',
  whitelist = true,
  errorHandler?: (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
  ) => void,
) {
  return function ExpressClassValidate(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const toValidate = req[type]
    transformAndValidate(c as any, toValidate, { validator: { whitelist } })
      .then((transformed) => {
        req[type] = transformed
        next()
      })
      .catch((err) => {
        if (errorHandler) {
          errorHandler(err, req, res, next)
        } else {
          res.status(400).json({
            code: 400,
            message: 'Validation failed',
            ...(isProd ? {} : { originalError: err }),
          })
        }
      })
  }
}

export { makeValidate }
