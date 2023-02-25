import express, { type Express } from 'express'
import cors from 'cors'
import errorHandler from '../middleware/error-handler'
import AuthRouter from '../auth/auth.router'
import HotelRouter from '../hotel/hotel.router'

const createPatrioServer = (): Express => {
  const app = express()

  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.use('/auth', AuthRouter)
  app.use('/hotel', HotelRouter)
  app.use(errorHandler)

  return app
}

/// Returns the express app for easy integration testing
export const app = createPatrioServer()
