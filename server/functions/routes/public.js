const express = require('express')
const router = express.Router()

const Logger = require('../lib/logger')
const jwt = require('../lib/jwt')
const db = require('../lib/db')

router.post('/search', async (req, res) => {
   const fn = 'PUBLIC-FIND-USER'
   try {
      Logger.info(`> (${req.eventId}) Starting ${fn}...`)
      const reqUser = req.body
      let startTime = new Date().valueOf()
      let dbUserResult = []
      if (reqUser.username) {
         dbUserResult = await db.getDocs({
            eventId: req.eventId,
            collection: 'users',
            where: [{ field: 'username', operator: '==', value: reqUser.username }],
         })
      }
      let endTime = new Date().valueOf()
      Logger.info(`> (${req.eventId}) ${fn} took ${endTime - startTime}ms...`)
      let profile = false
      if (dbUserResult.length === 1) {
         const dbUser = dbUserResult[0]
         profile = {
            id: dbUser.id,
            provider: dbUser.provider,
         }
         Logger.info(`> (${req.eventId}) User found in database...`)
         Logger.debug(`**** (${req.eventId}) ${dbUser}`)
      } else {
         Logger.info(`> (${req.eventId}) User not found in database...`)
      }
      res.status(200).send(profile)
   } catch (error) {
      Logger.info(`< (${req.eventId}) ${fn} failed...`)
      Logger.error(`!!!!`)
      Logger.error(`! Source: ${fn}`)
      Logger.error(`! Event ID: ${req.eventId}`)
      Logger.error(`! ${error.message}`)
      Logger.error(`!!!!`)
      res.status(400).send()
   } finally {
      Logger.info(`< (${req.eventId}) ${fn} ending...`)
   }
})

router.post('/register/:id', async (req, res) => {
   const fn = 'PUBLIC-REGISTER-USER'
   try {
      Logger.info(`> (${req.eventId}) Starting ${fn}...`)
      const id = req.params.id
      const data = req.body
      let startTime = new Date().valueOf()
      await db.setDoc({
         eventId: req.eventId,
         collection: 'users',
         collectionId: id,
         data,
      })
      let endTime = new Date().valueOf()
      Logger.info(`> (${req.eventId}) ${fn} took ${endTime - startTime}ms...`)
      Logger.info(`> (${req.eventId}) ${fn} created ${id}...`)
      res.status(201).send(id)
   } catch (error) {
      Logger.info(`< (${req.eventId}) ${fn} failed...`)
      Logger.error(`!!!!`)
      Logger.error(`! Source: ${fn}`)
      Logger.error(`! Event ID: ${req.eventId}`)
      Logger.error(`! ${error.message}`)
      Logger.error(`!!!!`)
      res.status(400).send()
   } finally {
      Logger.info(`< (${req.eventId}) ${fn} ending...`)
   }
})

router.post('/token', async (req, res) => {
   const fn = 'PUBLIC-REQUEST-JWT'
   try {
      Logger.info(`> (${req.eventId}) Starting ${fn}...`)
      const reqUser = req.body
      Logger.debug(`**** (${req.eventId}) ${JSON.stringify(reqUser)}`)
      let startTime = new Date().valueOf()
      let dbUserResult = []
      if (reqUser.username) {
         dbUserResult = await db.getDocs({
            eventId: req.eventId,
            collection: 'users',
            where: [{ field: 'username', operator: '==', value: reqUser.username }],
         })
      }
      let profile
      if (!dbUserResult.length) {
         Logger.info(`> (${req.eventId}) User not found in database...`)
         profile = { ...reqUser, role: 'anonymous' }
      } else {
         Logger.info(`> (${req.eventId}) User found in database...`)
         profile = { ...dbUserResult[0] }
      }
      const token = await jwt.generate({ eventId: req.eventId, profile })
      let endTime = new Date().valueOf()
      Logger.info(`> (${req.eventId}) ${fn} took ${endTime - startTime}ms...`)
      Logger.info(`> (${req.eventId}) ${fn} returned token...`)
      Logger.debug(`**** (${req.eventId}) ${token}`)
      res.status(200).send(token)
   } catch (error) {
      Logger.info(`< (${req.eventId}) ${fn} failed...`)
      Logger.error(`!!!!`)
      Logger.error(`! Source: ${fn}`)
      Logger.error(`! Event ID: ${req.eventId}`)
      Logger.error(`! ${error.message}`)
      Logger.error(`!!!!`)
      res.status(400).send()
   } finally {
      Logger.info(`< (${req.eventId}) ${fn} ending...`)
   }
})

module.exports = router
