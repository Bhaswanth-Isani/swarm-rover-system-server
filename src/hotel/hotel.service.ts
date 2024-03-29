import prisma from '../libs/prisma'

export const createItem = async (
  itemName: string,
  itemPrice: number,
  hotelId: string
): Promise<any> => {
  return await prisma.item.create({
    data: {
      itemName,
      itemPrice,
      hotel: {
        connect: { id: hotelId }
      }
    }
  })
}

export const getItems = async (hotelId: string): Promise<any> => {
  return await prisma.item.findMany({
    where: {
      hotelId
    }
  })
}

export const createRoom = async (
  roomNumber: number,
  path: string[],
  hotelId: string
): Promise<any> => {
  return await prisma.room.create({
    data: {
      roomNumber,
      path,
      hotel: {
        connect: { id: hotelId }
      }
    }
  })
}

export const bookRoom = async (
  roomId: string,
  userId: string
): Promise<any> => {
  return await prisma.room.update({
    where: {
      id: roomId
    },
    data: {
      user: {
        connect: { id: userId }
      }
    }
  })
}

export const getOrders = async (): Promise<any> => {
  return await prisma.order.findMany({
    include: {
      items: true
    }
  })
}
