require('dotenv').config({ path: '../.env' })
const functions = require('firebase-functions')
const express = require('express')
const cors = require('cors')
const { uid } = require('uid')

const Logger = require('./lib/logger')
const morganMiddleware = require('./lib/morgan')
const jwt = require('./lib/jwt')


const app = express()
app.use(express.json())
app.use(cors())
app.use(morganMiddleware)

app.use((req, res, next) => {
   req.eventId = uid()
   Logger.info(`>>>>>>>`)
   Logger.info(`> (${req.eventId}) REQUEST starting...`)
   Logger.info(`> (${req.eventId}) Remote IP: ${req.ip ? req.ip : 'Unable to determine'}`)
   Logger.info(`> (${req.eventId}) Method: ${req.method}`)
   Logger.info(`> (${req.eventId}) Endpoint: ${req.originalUrl}`)
   Logger.info(`> (${req.eventId}) Params: ${JSON.stringify(req.params)}`)
   Logger.info(`> (${req.eventId}) Query: ${JSON.stringify(req.query)}`)
   // Logger.info(`> (${req.eventId}) Header (foo): ${req.header('foo')}`) // alias for req.get('foo')

   const url = req.originalUrl.split('/')
   req.collection = url[1]

   res.on('finish', () => {
      Logger.info(`< (${req.eventId}) REQUEST ending...`)
      Logger.info(`<<<<<<<`)
   })
   next()
})

const collectionRoutes = require('./routes/collections')
app.use('/users', jwt.authorize, collectionRoutes)
app.use('/roles', jwt.authorize, collectionRoutes)

const publicRoutes = require('./routes/public')
app.use('/public', publicRoutes)

app.use(function (req, res) {
   res.status(404).send()
})

exports.api = functions.https.onRequest(app)

const triggers = require('./lib/dbTriggers')
exports.createUser = triggers.createUser
exports.updateUser = triggers.updateUser
exports.deleteUser = triggers.deleteUser
