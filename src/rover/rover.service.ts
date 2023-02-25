import prisma from '../libs/prisma'

export const createRover = async (hotelId: string) => {
  return await prisma.rover.create({
    data: {
      hotel: {
        connect: { id: hotelId }
      }
    }
  })
}

export const addOrder = async (roverId: string, orderId: string, exchange: boolean) => {
  return await prisma.rover.update({
    where: {
      id: roverId
    },
    data: {
      orderIds: {
        push: orderId
      },
      exchange
    }
  })
}

export const deliveredOrder = async (roverId: string, orderId: string, exchange: boolean) => {
  const rover = await prisma.rover.findUnique({
    where: {
      id: roverId
    }
  })

  const orders = rover?.orderIds.filter((value) => value !== orderId)

  return await prisma.rover.update({
    where: {
      id: roverId
    },
    data: {
      orderIds: orders,
      exchange
    }
  })
}

export const getFullPaths = async (roverId: string) => {
  const rover = await prisma.rover.findUnique({
    where: {
      id: roverId
    },
    include: {
      order: {
        include: {
          user: {
            include: {
              room: true
            }
          }
        }
      }
    }
  })

  let paths = []

  if (rover !== null) {
    for (let i = 0; i < rover.order.length; i++) {
      if(rover.exchange) {
        paths.push(rover.order[i].user.room!.path)
      } else {
        paths.push(rover.order[i].user.room!.path.filter((value) => value !== 'E'))
      }
    }
  }

  return paths
}

export const getOptimizedPath = async (path1: string[], path2: string[]) => {
  let path = []

  let sameLength = 0;

  if(path1.length > path2.length) {
    for(let i = 0; i<path2.length; i++) {
      if(path1[i] === path2[i]) {
        path.push(path1[i])
        sameLength++
      } else {
        break
      }
    }

    for(let i = sameLength; i< path2.length; i++) {
      path.push(path2[i])
    }

    path.push('D')

    const path2Reverse = path2.reverse()

    for(let i = 0; i< path2.length - sameLength; i++) {
      switch (path2Reverse[i]) {
        case 'F':
          path.push('F')
          break
        case 'B':
          path.push('B')
          break
        case 'R':
          path.push('L')
          break
        case 'L':
          path.push('R')
          break
        default:
          break
      }
    }

    path.push('D')

    for(let i = sameLength; i<path1.length; i++) {
      path.push(path1[i])
    }

    path.push('D')

    const path1Reverse = path1.reverse()

    for(let i = 0; i< path1.length; i++) {
      switch (path1Reverse[i]) {
        case 'F':
          path.push('F')
          break
        case 'B':
          path.push('B')
          break
        case 'R':
          path.push('L')
          break
        case 'L':
          path.push('R')
          break
        default:
          break
      }
    }

    path.push('D')
  } else {
    for(let i = 0; i<path1.length; i++) {
      if(path1[i] === path2[i]) {
        path.push(path2[i])
        sameLength++
      } else {
        break
      }
    }

    path.push('D')

    for(let i = sameLength; i< path1.length; i++) {
      path.push(path1[i])
    }

    path.push('D')

    const path1Reverse = path1.reverse()

    for(let i = 0; i< path1.length-sameLength; i++) {
      switch (path1Reverse[i]) {
        case 'F':
          path.push('F')
          break
        case 'B':
          path.push('B')
          break
        case 'R':
          path.push('L')
          break
        case 'L':
          path.push('R')
          break
        default:
          break
      }
    }

    for(let i = sameLength; i<path2.length; i++) {
      path.push(path2[i])
    }

    path.push('D')

    const path2Reverse = path2.reverse()

    for(let i = 0; i< path2.length; i++) {
      switch (path2Reverse[i]) {
        case 'F':
          path.push('F')
          break
        case 'B':
          path.push('B')
          break
        case 'R':
          path.push('L')
          break
        case 'L':
          path.push('R')
          break
        default:
          break
      }
    }

    path.push('D')
  }

  return path
}
