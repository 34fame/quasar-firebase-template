const express = require('express')
const router = express.Router()

const Logger = require('../lib/logger')
const db = require('../lib/db')
const jwt = require('../lib/jwt')

router.get('/:id', async (req, res) => {
   const fn = 'GET-COLLECTION-DOC'
   try {
      Logger.info(`> (${req.eventId}) Starting ${fn}...`)
      let startTime = new Date().valueOf()
      const doc = await db.getDoc({
         eventId: req.eventId,
         collection: req.collection,
         collectionId: req.params.id,
      })
      let endTime = new Date().valueOf()
      Logger.info(`> (${req.eventId}) ${fn} took ${endTime - startTime}ms...`)
      if (!doc) {
         Logger.info(`> (${req.eventId}) ${fn} no document found`)
         res.status(404).send(doc)
         return
      }
      Logger.info(`> (${req.eventId}) ${fn} found document`)
      Logger.debug(`**** (${req.eventId}) ${JSON.stringify(doc)}`)
      res.status(200).send(doc)
   } catch (error) {
      Logger.info(`< (${req.eventId}) ${fn} failed...`)
      Logger.error(`!!!!`)
      Logger.error(`! Event ID: ${req.eventId}`)
      Logger.error(`! ${error.message}`)
      Logger.error(`!!!!`)
      res.status(400).send()
   } finally {
      Logger.info(`< (${req.eventId}) ${fn} ending...`)
   }
})

router.get('/', async (req, res) => {
   const fn = 'GET-COLLECTION-DOCS'
   try {
      Logger.info(`> (${req.eventId}) Starting ${fn}...`)
      let startTime = new Date().valueOf()
      const docs = await db.getDocs({
         eventId: req.eventId,
         collection: req.collection
      })
      let endTime = new Date().valueOf()
      Logger.info(`> (${req.eventId}) ${fn} took ${endTime - startTime}ms...`)
      Logger.info(`> (${req.eventId}) ${fn} found ${docs.length} documents...`)
      Logger.debug(`**** (${req.eventId}) ${JSON.stringify(docs)}`)
      res.status(200).send(docs)
   } catch (error) {
      Logger.info(`< (${req.eventId}) ${fn} failed...`)
      Logger.error(`!!!!`)
      Logger.error(`! Event ID: ${req.eventId}`)
      Logger.error(`! ${error.message}`)
      Logger.error(`!!!!`)
      res.status(400).send()
   } finally {
      Logger.info(`< (${req.eventId}) ${fn} ending...`)
   }
})

router.post('/search', async (req, res) => {
   try {
      const { where, orderBy, limit } = req.body
      const docs = await db.getDocs({ collection: req.collection, where, orderBy, limit })
      res.status(200).send(docs)
   } catch (error) {
      res.status(400).send()
   }
})

router.post('/:id', async (req, res) => {
   const fn = 'POST-COLLECTION-DOC-ID'
   try {
      Logger.info(`> (${req.eventId}) Starting ${fn}...`)
      const data = req.body
      Logger.debug(`**** (${req.eventId}) ${JSON.stringify(data)}`)
      let startTime = new Date().valueOf()
      await db.setDoc({
         eventId: req.eventId,
         collection: req.collection,
         collectionId: req.params.id,
         data,
      })
      let endTime = new Date().valueOf()
      Logger.info(`> (${req.eventId}) ${fn} took ${endTime - startTime}ms...`)
      Logger.info(`> (${req.eventId}) ${fn} created ${req.params.id}...`)
      res.status(201).send()
   } catch (error) {
      Logger.info(`< (${req.eventId}) ${fn} failed...`)
      Logger.error(`!!!!`)
      Logger.error(`! Event ID: ${req.eventId}`)
      Logger.error(`! ${error.message}`)
      Logger.error(`!!!!`)
      res.status(400).send()
   } finally {
      Logger.info(`< (${req.eventId}) ${fn} ending...`)
   }
})

router.post('/', async (req, res) => {
   const fn = 'POST-COLLECTION-DOC'
   try {
      Logger.info(`> (${req.eventId}) Starting ${fn}...`)
      const data = req.body
      Logger.debug(`**** (${req.eventId}) ${JSON.stringify(data)}`)
      let startTime = new Date().valueOf()
      const id = await db.createDoc({
         eventId: req.eventId,
         collection: req.collection,
         data,
      })
      let endTime = new Date().valueOf()
      Logger.info(`> (${req.eventId}) ${fn} took ${endTime - startTime}ms...`)
      Logger.info(`> (${req.eventId}) ${fn} created ${id}...`)
      res.status(201).send(id)
   } catch (error) {
      Logger.info(`< (${req.eventId}) ${fn} failed...`)
      Logger.error(`!!!!`)
      Logger.error(`! Event ID: ${req.eventId}`)
      Logger.error(`! ${error.message}`)
      Logger.error(`!!!!`)
      res.status(400).send()
   } finally {
      Logger.info(`< (${req.eventId}) ${fn} ending...`)
   }
})

router.patch('/:id', async (req, res) => {
   const fn = 'PATCH-COLLECTION-DOC'
   try {
      Logger.info(`> (${req.eventId}) Starting ${fn}...`)
      const changes = req.body
      Logger.debug(`**** (${req.eventId}) ${JSON.stringify(changes)}`)
      let startTime = new Date().valueOf()
      await db.updateDoc({
         eventId: req.eventId,
         collection: req.collection,
         collectionId: req.params.id,
         changes,
      })
      let endTime = new Date().valueOf()
      Logger.info(`> (${req.eventId}) ${fn} took ${endTime - startTime}ms...`)
      Logger.info(`> (${req.eventId}) ${fn} updated ${req.params.id}...`)
      res.status(200).send()
   } catch (error) {
      Logger.info(`< (${req.eventId}) ${fn} failed...`)
      Logger.error(`!!!!`)
      Logger.error(`! Event ID: ${req.eventId}`)
      Logger.error(`! ${error.message}`)
      Logger.error(`!!!!`)
      res.status(400).send()
   } finally {
      Logger.info(`< (${req.eventId}) ${fn} ending...`)
   }
})

router.put('/:id', async (req, res) => {
   const fn = 'PUT-COLLECTION-DOC'
   try {
      Logger.info(`> (${req.eventId}) Starting ${fn}...`)
      const data = req.body
      Logger.debug(`**** (${req.eventId}) ${JSON.stringify(data)}`)
      let startTime = new Date().valueOf()
      await db.setDoc({
         eventId: req.eventId,
         collection: req.collection,
         collectionId: req.params.id,
         data,
      })
      let endTime = new Date().valueOf()
      Logger.info(`> (${req.eventId}) ${fn} took ${endTime - startTime}ms...`)
      Logger.info(`> (${req.eventId}) ${fn} updated ${req.params.id}...`)
      res.status(200).send()
   } catch (error) {
      Logger.info(`< (${req.eventId}) ${fn} failed...`)
      Logger.error(`!!!!`)
      Logger.error(`! Event ID: ${req.eventId}`)
      Logger.error(`! ${error.message}`)
      Logger.error(`!!!!`)
      res.status(400).send()
   } finally {
      Logger.info(`< (${req.eventId}) ${fn} ending...`)
   }
})

router.delete('/:id', async (req, res) => {
   const fn = 'DELETE-COLLECTION-DOC'
   try {
      Logger.info(`> (${req.eventId}) Starting ${fn}...`)
      let startTime = new Date().valueOf()
      await db.deleteDoc({
         eventId: req.eventId,
         collection: req.collection,
         collectionId: req.params.id,
      })
      let endTime = new Date().valueOf()
      Logger.info(`> (${req.eventId}) ${fn} took ${endTime - startTime}ms...`)
      Logger.info(`> (${req.eventId}) ${fn} deleted ${req.params.id}...`)
      res.status(204).send()
   } catch (error) {
      Logger.info(`< (${req.eventId}) ${fn} failed...`)
      Logger.error(`!!!!`)
      Logger.error(`! Event ID: ${req.eventId}`)
      Logger.error(`! ${error.message}`)
      Logger.error(`!!!!`)
      res.status(400).send()
   } finally {
      Logger.info(`< (${req.eventId}) ${fn} ending...`)
   }
})

module.exports = router
