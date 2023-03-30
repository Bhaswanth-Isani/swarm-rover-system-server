import { type RequestHandler, type Request, type Response, type NextFunction } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { type BookRoomSchemaType, type CreateItemSchemaType, type CreateRoomSchemaType, type GetItemSchemaType } from './hotel.schema'
import * as HotelService from './hotel.service'

export const createItem: RequestHandler = expressAsyncHandler(async (
  req: Request<unknown, unknown, CreateItemSchemaType>,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const { itemName, itemPrice } = req.body
  const hotelId = req.id

  const item = await HotelService.createItem(itemName, itemPrice, hotelId)

  res.status(200).json({
    success: true,
    item
  })
})

export const getItems: RequestHandler = expressAsyncHandler(async (
  req: Request<unknown, unknown, GetItemSchemaType>,
  res: Response,
  _next: NextFunction
) => {
  const hotelId = req.body.hotelId

  const items = await HotelService.getItems(hotelId)

  res.status(200).json({
    success: true,
    items
  })
})

export const createRoom: RequestHandler = expressAsyncHandler(async (
  req: Request<unknown, unknown, CreateRoomSchemaType>,
  res: Response,
  _next: NextFunction
) => {
  const { roomNumber, path } = req.body
  const hotelId = req.id

  const room = await HotelService.createRoom(roomNumber, path, hotelId)

  res.status(200).json({
    success: true,
    room
  })
})

export const bookRoom: RequestHandler = expressAsyncHandler(async (
  req: Request<unknown, unknown, BookRoomSchemaType>,
  res: Response,
  _next: NextFunction
) => {
  const { roomId } = req.body
  const userId = req.id

  const room = await HotelService.bookRoom(roomId, userId)

  res.status(200).json({
    success: true,
    room
  })
})
