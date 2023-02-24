import { type NextFunction, type Request, type RequestHandler, type Response } from 'express'
import * as AuthService from './auth.service'
import {
  type CreateAccountSchemaType,
  type LoginSchemaType
} from './auth.schemas'
import { PatrioError } from '../libs/patrio-error'
import expressAsyncHandler from 'express-async-handler'

/// Creates a user by taking CreateAccountSchemaType as an input through request and responds with {success: true, user: User, token: string}
export const createAccount: RequestHandler = expressAsyncHandler(async (
  req: Request<unknown, unknown, CreateAccountSchemaType>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userData = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }

  if ((await AuthService.findUserByEmail(userData.email)) !== null) {
    next(new PatrioError('USER_ALREADY_EXISTS'))
    return
  }

  const newUser = await AuthService.createUser(userData)
  newUser.password = ''

  const token = AuthService.generateJWT(newUser.id)

  res.status(200).json({
    success: true,
    user: newUser,
    token
  })
})

/// Logs the user in by taking LoginSchemaType as an input through request and responds with {success: true, user: User, token: string}
export const login: RequestHandler = expressAsyncHandler(async (
  req: Request<unknown, unknown, LoginSchemaType>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userData = {
    email: req.body.email,
    password: req.body.password
  }

  const existing = await AuthService.findUserByEmail(userData.email)

  if (existing === null) {
    next(new PatrioError('INVALID_CREDENTIALS'))
    return
  }

  if (!AuthService.comparePasswords(userData.password, existing.password)) {
    next(new PatrioError('INVALID_CREDENTIALS'))
    return
  }
  existing.password = ''

  const token = AuthService.generateJWT(existing.id)

  res.status(200).json({
    success: true,
    user: existing,
    token
  })
})
