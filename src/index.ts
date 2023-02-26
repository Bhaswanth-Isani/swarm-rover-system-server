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
})

const PORT = process.env.PORT === undefined ? 4000 : process.env.PORT
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
