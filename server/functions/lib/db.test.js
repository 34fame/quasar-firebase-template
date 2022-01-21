const axios = require('axios')
const db = require('./db')

const testData = {
   users: {
      case1: { id: '1', data: { name: 'Sam', email: 'sam@gmail.io' } },
      case2: { id: '1', data: { name: 'Samuel', email: 'sam@gmail.io' } },
      case3: { data: { name: 'Tony', email: 'tony@tigers.io' } },
   },
}

const collection = Object.keys(testData)[0]

describe('Database Library Functions', () => {
   beforeAll(async () => {
      try {
         await axios.delete(
            `http://localhost:8070/emulator/v1/projects/fame-sandbox-dev/databases/(default)/documents`
         )
      } catch (error) {
         console.error(error)
      }
   })

   it('should return empty array', async () => {
      const results = await db.getDocs({ collection })
      expect(results).toStrictEqual([])
   })

   it('should create a new doc', async () => {
      const results = await db.setDoc({
         collection,
         collectionId: testData.users.case1.id,
         data: testData.users.case1.data,
      })
      expect(results).toBe(true)
   })

   it('should return array of one', async () => {
      const results = await db.getDocs({ collection })
      expect(results.length).toBe(1)
   })

   it('should return doc', async () => {
      const results = await db.getDoc({
         collection,
         collectionId: testData.users.case1.id,
      })
      expect(results).toStrictEqual({
         id: testData.users.case1.id,
         ...testData.users.case1.data,
      })
   })

   it('should update doc', async () => {
      const results = await db.updateDoc({
         collection,
         collectionId: testData.users.case1.id,
         changes: { name: testData.users.case2.data.name },
      })
      expect(results).toBe(true)
   })

   it('should return updated doc', async () => {
      const results = await db.getDoc({
         collection,
         collectionId: testData.users.case2.id,
      })
      expect(results).toStrictEqual({
         id: testData.users.case2.id,
         ...testData.users.case2.data,
      })
   })

   it('should add doc', async () => {
      const id = await db.createDoc({
         collection,
         data: testData.users.case3.data,
      })
      if (id) testData.users.case3.data.id = id
      expect(typeof id).toBe('string')
   })

   it('should delete all docs', async () => {
      let docs = await db.getDocs({ collection })
      await Promise.all(
         docs.map(async (doc) => {
            const results = await db.deleteDoc({
               collection,
               collectionId: doc.id,
            })
            expect(results).toBe(true)
         })
      )
      docs = await db.getDocs({ collection })
      expect(docs).toStrictEqual([])
   })
})
