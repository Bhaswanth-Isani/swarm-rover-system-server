import { z } from 'zod'

export const CreateItemSchema = z.object({
  body: z.object({
    itemName: z.string().min(3),
    itemPrice: z.number().gt(0)
  })
})
export type CreateItemSchemaType = z.infer<typeof CreateItemSchema>['body']

export const GetItemSchema = z.object({
  body: z.object({
    hotelId: z.string()
  })
})
export type GetItemSchemaType = z.infer<typeof GetItemSchema>['body']

export const CreateRoomSchema = z.object({
  body: z.object({
    roomNumber: z.number(),
    path: z.array(z.string()).min(2)
  })
})
export type CreateRoomSchemaType = z.infer<typeof CreateRoomSchema>['body']

export const BookRoomSchema = z.object({
  body: z.object({
    roomId: z.string()
  })
})
export type BookRoomSchemaType = z.infer<typeof BookRoomSchema>['body']
