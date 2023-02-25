import { NextFunction, Request, Response } from 'express'
import { PatrioError } from '../libs/patrio-error'
import { validateJWT } from '../auth/auth.service'

export const authorization = (
  req: Request<unknown>,
  _res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    next(new PatrioError('UNAUTHORIZED'))
    return
  }

  const token = req.headers.authorization.split(' ')[1].trim()

  if (!token) {
    next(new PatrioError('UNAUTHORIZED'))
    return
  }

  try {
    req.id = validateJWT(token)
    next()
  } catch (e) {
    next(new PatrioError('UNAUTHORIZED'))
    return
  }
}
