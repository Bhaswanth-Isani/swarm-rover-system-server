import expressAsyncHandler from 'express-async-handler'
import { type Request, type Response, type NextFunction } from 'express'
import {
  type AddOrderSchemaType,
  type CreateRoverSchemaType,
  type DeliveredOrderSchemaType,
  type GetRoverPathSchemaType
} from './rover.schema'
import * as RoverService from './rover.service'

export const createRover = expressAsyncHandler(async (
  req: Request<unknown, unknown, CreateRoverSchemaType>,
  res: Response,
  _next: NextFunction
) => {
  const hotelId = req.id

  const rover = await RoverService.createRover(hotelId)

  res.status(200).json({
    success: true,
    rover
  })
})

export const addOrder = expressAsyncHandler(async (
  req: Request<unknown, unknown, AddOrderSchemaType>,
  res: Response,
  _next: NextFunction
) => {
  const { roverId, orderId, exchange } = req.body

  const rover = await RoverService.addOrder(roverId, orderId, exchange ?? false)

  res.status(200).json({
    success: true,
    rover
  })
})

export const deliveredOrder = expressAsyncHandler(async (
  req: Request<unknown, unknown, DeliveredOrderSchemaType>,
  res: Response,
  _next: NextFunction
) => {
  const { roverId, orderId, exchange } = req.body

  const rover = await RoverService.deliveredOrder(roverId, orderId, exchange ?? false)

  res.status(200).json({
    success: true,
    rover
  })
})

export const getRoverPath = expressAsyncHandler(async (
  req: Request<unknown, unknown, GetRoverPathSchemaType>,
  res: Response,
  _next: NextFunction
) => {
  const { roverId } = req.body

  const paths = await RoverService.getFullPaths(roverId)
  console.log(paths)
  const optimizedPath = await RoverService.getOptimizedPath(paths[0], paths[1])
  console.log(optimizedPath)

  res.status(200).json({
    success: true,
    path: optimizedPath
  })
})
