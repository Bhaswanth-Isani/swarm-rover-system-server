import { Router } from 'express'
import typeValidate from '../middleware/type-validate'
import { CreateAccountSchema, LoginSchema } from './auth.schemas'
import * as AuthController from './auth.controller'

const router = Router()

router.post('/create-account', typeValidate(CreateAccountSchema), AuthController.createAccount)
router.post('/login', typeValidate(LoginSchema), AuthController.login)

export default router
