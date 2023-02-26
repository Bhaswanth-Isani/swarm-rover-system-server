import { Router } from 'express'
import { authorization } from '../middleware/authorization'
import typeValidate from '../middleware/type-validate'
import { AddOrderSchema, CreateRoverSchema, DeliveredOrderSchema, GetRoverPathSchema } from './rover.schema'
import * as RoverController from './rover.controller'

const router = Router()

router.post('/create-rover', authorization, typeValidate(CreateRoverSchema), RoverController.createRover)
router.patch('/add-order', typeValidate(AddOrderSchema), RoverController.addOrder)
router.patch('/delivered-order', typeValidate(DeliveredOrderSchema), RoverController.deliveredOrder)
router.post('/get-rover-path', typeValidate(GetRoverPathSchema), RoverController.getRoverPath)

export default router
