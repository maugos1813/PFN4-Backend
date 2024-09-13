import express from 'express'
import morgan from 'morgan'
import { PORT } from './config/config.js'
import usersRoutes from './routes/users.routes.js'
import incidenciasRouter from './routes/incidencia.routes.js'
import comentariosRouter from './routes/comentario.routes.js'
import http from 'http'
import { Server } from 'socket.io'
import { validateCORS } from './middlewares/cors.middleware.js'
import authRoutes from './routes/auth.routes.js'
import imageRoutes from './routes/images.routes.js'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['my-custom-header'],
    credentials: true
  }
})

app.use(morgan('dev'))
app.use(express.json())
app.use(validateCORS)

app.use('/api/users', usersRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/incidencias', incidenciasRouter)
app.use('/api/comentarios', comentariosRouter)
app.use('/api/images', imageRoutes)

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado')
  socket.on('newComentario', (data) => {
    io.emit('updateComentario', data)
  })

  socket.on('disconnect', () => {
    console.log('Cliente desconectado')
  })
})

server.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))
