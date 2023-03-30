import { type NextFunction, type Request, type Response } from 'express'
import { PatrioError } from '../libs/patrio-error'
import { validateJWT } from '../auth/auth.service'

export const authorization = (
  req: Request<unknown>,
  _res: Response,
  next: NextFunction
): any => {
  if (req.headers.authorization === undefined || !req.headers.authorization.startsWith('Bearer ')) {
    next(new PatrioError('UNAUTHORIZED'))
    return
  }

  const token = req.headers.authorization.split(' ')[1].trim()

  if (token === null) {
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
