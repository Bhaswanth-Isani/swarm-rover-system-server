import { app } from './libs/server'
import { Server } from 'socket.io'
import http from 'http'

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

io.on('connection', socket => {
  console.log(socket.id)
  socket.on('add-rover', (data: {hotel: string, rover: string}) => {
    socket.join(data.rover)
    socket.join(data.hotel)
  })

  socket.on('waiting-exchange', (data: {hotel: string}) => {
    socket.to(data.hotel).emit('waiting')
  })

  socket.on('start-exchange', (data: {hotel: string}) => {
    socket.to(data.hotel).emit('exchanging')
  })

  socket.on('exchange-done', (data: { hotel: string, room: string }) => {
    socket.to(data.hotel).emit('exchanged', data.room)
  })

  socket.on('start-delivery', (data: {rover: string}) => {
    socket.to(data.rover).emit('start')
  })
})

const PORT = process.env.PORT === undefined ? 4000 : process.env.PORT
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
