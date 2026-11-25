import express from 'express'
import { errorHandler, notFound } from './errors.js'
import itemsRouter from './entities/items/router.js'

export const app = express()

app.use((req, res, next) => {
  console.log(req.method, req.url)
  next()
})

app.get('/api/health', (req, res) => {
  res.json({ ok: true, time: new Date() })
})

app.use(express.json())

app.use('/api/items', itemsRouter)

app.use((req, res, next) => {
  next(notFound(`no route for ${req.method} ${req.originalUrl}`))
})

app.use(errorHandler)