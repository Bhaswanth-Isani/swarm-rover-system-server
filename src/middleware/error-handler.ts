import { type NextFunction, type Request, type Response } from 'express'
import { PatrioError } from '../libs/patrio-error'

/// Handles any type of error that is thrown in the routes and responds with {success: false, error: string}
const errorHandler = (error: Error, _: Request, response: Response, _next?: NextFunction): void => {
  response.status('statusCode' in error ? (error.statusCode as number) : 500).json({
    success: false,
    error: error instanceof PatrioError ? error.message : 'SERVER_ERROR'
  })
}

export default errorHandler
