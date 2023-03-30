import { Router } from 'express'
import { authorization } from '../middleware/authorization'
import typeValidate from '../middleware/type-validate'
import { BookRoomSchema, CreateItemSchema, CreateRoomSchema, GetItemSchema } from './hotel.schema'
import * as HotelController from './hotel.controller'

const router = Router()

router.post('/create-item', authorization, typeValidate(CreateItemSchema), HotelController.createItem)
router.get('/get-items', typeValidate(GetItemSchema), HotelController.getItems)
router.post('/create-room', authorization, typeValidate(CreateRoomSchema), HotelController.createRoom)
router.patch('/book-room', authorization, typeValidate(BookRoomSchema), HotelController.bookRoom)

export default router
