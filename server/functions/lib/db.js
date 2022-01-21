const { firestore } = require('../services/firebase/init')
const Logger = require('../lib/logger')

const getDocs = async ({
   eventId,
   collection,
   collectionId,
   subcollection,
   where,
   orderBy,
   limit,
}) => {
   const fn = 'DB-GET-DOCS'
   try {
      Logger.debug(`*** (${eventId}) ${fn} starting...`)
      Logger.debug(`*** (${eventId}) -> collection ${collection}...`)
      Logger.debug(`*** (${eventId}) -> collectionId ${collectionId}...`)
      Logger.debug(`*** (${eventId}) -> subcollection ${subcollection}...`)
      Logger.debug(`*** (${eventId}) -> where ${JSON.stringify(where)}...`)
      Logger.debug(`*** (${eventId}) -> orderBy ${orderBy}...`)
      Logger.debug(`*** (${eventId}) -> limit ${limit}...`)
      let docRef = firestore.collection(collection)
      if (collectionId && subcollection) {
         docRef = docRef.doc(collectionId).collection(subcollection)
      }
      if (where) {
         where.map((clause) => {
            docRef = docRef.where(clause.field, clause.operator, clause.value)
         })
      }
      if (orderBy) {
         orderBy.map((order) => {
            const field = `${order.field}`
            const direction = order.direction ? `${order.direction}` : 'asc'
            docRef = docRef.orderBy(field, direction)
         })
      }
      if (limit) {
         docRef = docRef.limit(limit)
      }

      const snapshot = await docRef.get()
      let arr = []
      if (snapshot.empty) {
         Logger.debug(`*** (${eventId}) snapshot is empty...`)
         return arr
      } else {
         snapshot.forEach((doc) => {
            arr.push({
               id: doc.id,
               ...doc.data(),
            })
         })
         Logger.debug(`*** (${eventId}) found ${arr.length} documents...`)
         return arr
      }
   } catch (error) {
      Logger.error(`!!!!`)
      Logger.error(`! Source: ${fn}`)
      Logger.error(`! Event ID: ${eventId}`)
      Logger.error(`! ${error.message}`)
      Logger.error(`!!!!`)
      throw new Error(error)
   } finally {
      Logger.debug(`*** (${eventId}) ${fn} ending...`)
   }
}

const getDoc = async ({
   eventId,
   collection,
   collectionId,
   subcollection,
   subcollectionId,
}) => {
   const fn = 'DB-GET-DOCS'
   try {
      Logger.debug(`*** (${eventId}) ${fn} starting...`)
      Logger.debug(`*** (${eventId}) -> collection ${collection}...`)
      Logger.debug(`*** (${eventId}) -> collectionId ${collectionId}...`)
      Logger.debug(`*** (${eventId}) -> subcollection ${subcollection}...`)
      Logger.debug(`*** (${eventId}) -> subcollectionId ${subcollectionId}...`)
      let docRef = firestore.collection(collection).doc(collectionId)
      if (subcollection && subcollectionId) {
         docRef = docRef.collection(subcollection).doc(subcollectionId)
      }

      const doc = await docRef.get()
      if (doc.exists) {
         Logger.debug(`*** (${eventId}) found document...`)
         return {
            id: doc.id,
            ...doc.data(),
         }
      } else {
         Logger.debug(`*** (${eventId}) doc does not exist...`)
         return false
      }
   } catch (error) {
      Logger.error(`!!!!`)
      Logger.error(`! Source: ${fn}`)
      Logger.error(`! Event ID: ${eventId}`)
      Logger.error(`! ${error.message}`)
      Logger.error(`!!!!`)
      throw new Error(error)
   } finally {
      Logger.debug(`*** (${eventId}) ${fn} ending...`)
   }
}

const setDoc = async ({
   eventId,
   collection,
   collectionId,
   subcollection,
   subcollectionId,
   data,
}) => {
   const fn = 'DB-SET-DOC'
   try {
      Logger.debug(`*** (${eventId}) ${fn} starting...`)
      Logger.debug(`*** (${eventId}) -> collection ${collection}...`)
      Logger.debug(`*** (${eventId}) -> collectionId ${collectionId}...`)
      Logger.debug(`*** (${eventId}) -> subcollection ${subcollection}...`)
      Logger.debug(`*** (${eventId}) -> subcollectionId ${subcollectionId}...`)
      Logger.debug(`*** (${eventId}) -> data ${JSON.stringify(data)}...`)
      let docRef = firestore.collection(collection).doc(collectionId)
      if (subcollection && subcollectionId) {
         docRef = docRef.collection(subcollection).doc(subcollectionId)
      }
      delete data.id
      await docRef.set(data)
      Logger.debug(`*** (${eventId}) document saved...`)
      return true
   } catch (error) {
      Logger.error(`!!!!`)
      Logger.error(`! Source: ${fn}`)
      Logger.error(`! Event ID: ${eventId}`)
      Logger.error(`! ${error.message}`)
      Logger.error(`!!!!`)
      throw new Error(error)
   } finally {
      Logger.debug(`*** (${eventId}) ${fn} ending...`)
   }
}

const createDoc = async ({ eventId, collection, collectionId, subcollection, data }) => {
   const fn = 'DB-CREATE-DOC'
   try {
      Logger.debug(`*** (${eventId}) ${fn} starting...`)
      Logger.debug(`*** (${eventId}) -> collection ${collection}...`)
      Logger.debug(`*** (${eventId}) -> collectionId ${collectionId}...`)
      Logger.debug(`*** (${eventId}) -> subcollection ${subcollection}...`)
      Logger.debug(`*** (${eventId}) -> data ${JSON.stringify(data)}...`)
      let docRef = firestore.collection(collection)
      if (collectionId && subcollection) {
         docRef = docRef.doc(collectionId).collection(subcollection)
      }
      const doc = await docRef.add(data)
      Logger.debug(`*** (${eventId}) document created ${doc.id}...`)
      return doc.id
   } catch (error) {
      Logger.error(`!!!!`)
      Logger.error(`! Source: ${fn}`)
      Logger.error(`! Event ID: ${eventId}`)
      Logger.error(`! ${error.message}`)
      Logger.error(`!!!!`)
      throw new Error(error)
   } finally {
      Logger.debug(`*** (${eventId}) ${fn} ending...`)
   }
}

const updateDoc = async ({
   eventId,
   collection,
   collectionId,
   subcollection,
   subcollectionId,
   changes,
}) => {
   const fn = 'DB-CREATE-DOC'
   try {
      Logger.debug(`*** (${eventId}) ${fn} starting...`)
      Logger.debug(`*** (${eventId}) -> collection ${collection}...`)
      Logger.debug(`*** (${eventId}) -> collectionId ${collectionId}...`)
      Logger.debug(`*** (${eventId}) -> subcollection ${subcollection}...`)
      Logger.debug(`*** (${eventId}) -> changes ${JSON.stringify(changes)}...`)
      let docRef = firestore.collection(collection).doc(collectionId)
      if (subcollection && subcollectionId) {
         docRef = docRef.collection(subcollection).doc(subcollectionId)
      }
      delete changes.id
      await docRef.update(changes)
      Logger.debug(`*** (${eventId}) document updated...`)
      return true
   } catch (error) {
      Logger.error(`!!!!`)
      Logger.error(`! Source: ${fn}`)
      Logger.error(`! Event ID: ${eventId}`)
      Logger.error(`! ${error.message}`)
      Logger.error(`!!!!`)
      throw new Error(error)
   } finally {
      Logger.debug(`*** (${eventId}) ${fn} ending...`)
   }
}

const deleteDoc = async ({
   eventId,
   collection,
   collectionId,
   subcollection,
   subcollectionId,
}) => {
   const fn = 'DB-DELETE-DOC'
   try {
      Logger.debug(`*** (${eventId}) ${fn} starting...`)
      Logger.debug(`*** (${eventId}) -> collection ${collection}...`)
      Logger.debug(`*** (${eventId}) -> collectionId ${collectionId}...`)
      Logger.debug(`*** (${eventId}) -> subcollection ${subcollection}...`)
      Logger.debug(`*** (${eventId}) -> subcollectionId ${subcollectionId}...`)
      let docRef = firestore.collection(collection).doc(collectionId)
      if (subcollection && subcollectionId) {
         docRef = docRef.collection(subcollection).doc(subcollectionId)
      }
      await docRef.delete()
      Logger.debug(`*** (${eventId}) document deleted...`)
      return true
   } catch (error) {
      Logger.error(`!!!!`)
      Logger.error(`! Source: ${fn}`)
      Logger.error(`! Event ID: ${eventId}`)
      Logger.error(`! ${error.message}`)
      Logger.error(`!!!!`)
      throw new Error(error)
   } finally {
      Logger.debug(`*** (${eventId}) ${fn} ending...`)
   }
}

module.exports = {
   getDocs,
   getDoc,
   setDoc,
   createDoc,
   updateDoc,
   deleteDoc,
}
