import prisma from '../libs/prisma'

export const createItem = async (
  itemName: string,
  itemPrice: number,
  hotelId: string
) => {
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

export const getItems = async (hotelId: string) => {
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
) => {
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
  userId: string,
) => {
  return await prisma.room.update({
    where:{
      id: roomId
    },
    data: {
      user: {
        connect: {id: userId}
      }
    }
  })
}
