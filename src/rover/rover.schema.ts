import { z } from 'zod'

export const CreateRoverSchema = z.object({
  body: z.object({})
})
export type CreateRoverSchemaType = z.infer<typeof CreateRoverSchema>['body']

export const AddOrderSchema = z.object({
  body: z.object({
    roverId: z.string(),
    orderId: z.string(),
    exchange: z.boolean().nullable()
  })
})
export type AddOrderSchemaType = z.infer<typeof AddOrderSchema>['body']

export const DeliveredOrderSchema = z.object({
  body: z.object({
    roverId: z.string(),
    orderId: z.string(),
    exchange: z.boolean().nullable()
  })
})
export type DeliveredOrderSchemaType = z.infer<typeof DeliveredOrderSchema>['body']

export const GetRoverPathSchema = z.object({
  body: z.object({
    roverId: z.string()
  })
})
export type GetRoverPathSchemaType = z.infer<typeof GetRoverPathSchema>['body']
