import { Router } from 'express'
import typeValidate from '../middleware/type-validate'
import { CreateAccountSchema, CreateHotelSchema, LoginHotelSchema, LoginSchema, OrderSchema } from './auth.schema'
import * as AuthController from './auth.controller'
import { authorization } from '../middleware/authorization'

const router = Router()

router.post('/create-account', typeValidate(CreateAccountSchema), AuthController.createAccount)
router.post('/create-hotel', typeValidate(CreateHotelSchema), AuthController.createHotel)
router.post('/login', typeValidate(LoginSchema), AuthController.login)
router.post('/login-hotel', typeValidate(LoginHotelSchema), AuthController.loginHotel)
router.post('/create-order', authorization, typeValidate(OrderSchema), AuthController.createOrder)
router.patch('/update-order', authorization, typeValidate(OrderSchema), AuthController.updateOrder)

export default router
