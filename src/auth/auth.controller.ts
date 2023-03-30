import { type NextFunction, type Request, type RequestHandler, type Response } from 'express'
import * as AuthService from './auth.service'
import {
  type CreateAccountSchemaType, type CreateHotelSchemaType, type LoginHotelSchemaType, type LoginSchemaType, type OrderSchemaType
} from './auth.schema'
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

export const createHotel: RequestHandler = expressAsyncHandler(async (
  req: Request<unknown, unknown, CreateHotelSchemaType>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const hotelData = {
    hotelName: req.body.hotelName,
    password: req.body.password
  }

  if ((await AuthService.findHotelByName(hotelData.hotelName)) !== null) {
    next(new PatrioError('USER_ALREADY_EXISTS'))
    return
  }

  const newHotel = await AuthService.createHotel(hotelData)
  newHotel.password = ''

  const token = AuthService.generateJWT(newHotel.id)

  res.status(200).json({
    success: true,
    hotel: newHotel,
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

export const loginHotel: RequestHandler = expressAsyncHandler(async (
  req: Request<unknown, unknown, LoginHotelSchemaType>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const hotelData = {
    hotelName: req.body.hotelName,
    password: req.body.password
  }

  const existing = await AuthService.findHotelByName(hotelData.hotelName)

  if (existing === null) {
    next(new PatrioError('INVALID_CREDENTIALS'))
    return
  }

  if (!AuthService.comparePasswords(hotelData.password, existing.password)) {
    next(new PatrioError('INVALID_CREDENTIALS'))
    return
  }
  existing.password = ''

  const token = AuthService.generateJWT(existing.id)

  res.status(200).json({
    success: true,
    hotel: existing,
    token
  })
})

export const createOrder = expressAsyncHandler(async (
  req: Request<unknown, unknown, OrderSchemaType>,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const { itemId } = req.body
  const userId = req.id

  const order = await AuthService.createOrder(itemId, userId)

  res.status(200).json({
    success: true,
    order
  })
})

export const getOrders = expressAsyncHandler(async (req: Request<unknown, unknown, unknown>, res: Response, _next: NextFunction): Promise<void> => {
  const userID = req.id

  const orders = await AuthService.getOrders(userID)

  res.status(200).json({
    success: true,
    orders
  })
})

export const updateOrder = expressAsyncHandler(async (
  req: Request<unknown, unknown, OrderSchemaType>,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const { itemId } = req.body
  const userId = req.id

  const order = await AuthService.updateOrder(itemId, userId)

  res.status(200).json({
    success: true,
    order
  })
})
