import { z } from 'zod'

/// Schema contains username, email and password for Creating Account
/// - username: Length should be more than 3 characters long
/// - email: Should be of type Email
/// - password: Length should be more than 6 characters long
export const CreateAccountSchema = z.object({
  body: z.object({
    username: z.string().min(3).trim(),
    email: z.string().email(),
    password: z.string().min(6)
  })
})
export type CreateAccountSchemaType = z.infer<typeof CreateAccountSchema>['body']

/// Schema contains email and password for Login
/// - email: Should be of type Email
/// - password: Length should be more than 6 characters long
export const LoginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })
})
export type LoginSchemaType = z.infer<typeof LoginSchema>['body']
