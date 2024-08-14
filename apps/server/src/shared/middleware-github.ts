import { NextFunction, Request, Response } from 'express'

function authenticationGithub(req: Request, res: Response, next: NextFunction) {
  try {
    const token = (req.headers.authorization ?? '').split(' ')[1]
    if (token === process.env.AUTH_TOKEN) {
      next()
      return
    }
    return res.status(403).send({
      code: 403,
      message: 'Token is invalid!',
    })
  } catch (error) {
    return res.status(403).send({
      code: 500,
      message: error?.message ?? 'Something went wrong',
    })
  }
}

export { authenticationGithub }
