import { type AnyZodObject } from 'zod'
import { type NextFunction, type Request, type RequestHandler, type Response } from 'express'
import { PatrioError } from '../libs/patrio-error'
import expressAsyncHandler from 'express-async-handler'

/// Validates the body of the request by using the Schema Type provided to it
const typeValidate = (schema: AnyZodObject): RequestHandler => expressAsyncHandler(async (req: Request, _res: Response, next: NextFunction) => {
  try {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params
    })

    next()
  } catch (error) {
    next(new PatrioError('INVALID_DATA'))
    return
  }
})

export default typeValidate
