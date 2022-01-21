// TODO add event logging
const algoliasearch = require('algoliasearch')

exports.save = (data) => {
   if (process.env.APP_ENV === 'local') {
      console.info('mock algolia save', data)
      return true
   }
   const client = algoliasearch(process.env.ALGOLIA_APPID, process.env.ALGOLIA_ADMINKEY)
   const index = client.initIndex(process.env.ALGOLIA_INDEX)

   try {
      index.saveObjects([data])
      return true
   } catch (error) {
      throw new Error(error)
   }
}

exports.delete = (id) => {
   if (process.env.APP_ENV === 'local') {
      console.info('mock algolia delete', id)
      return true
   }
   const client = algoliasearch(process.env.ALGOLIA_APPID, process.env.ALGOLIA_ADMINKEY)
   const index = client.initIndex(process.env.ALGOLIA_INDEX)

   try {
      index.deleteObjects([id])
      return true
   } catch (error) {
      throw new Error(error)
   }
}

exports.search = async (searchString) => {
   if (process.env.APP_ENV === 'local') {
      console.info('mock algolia search', searchString)
      return []
   }
   const client = algoliasearch(process.env.ALGOLIA_APPID, process.env.ALGOLIA_ADMINKEY)
   const index = client.initIndex(process.env.ALGOLIA_INDEX)

   try {
      let results = await index.search(searchString)
      return results.hits ? results.hits : []
   } catch (error) {
      throw new Error(error)
   }
}
