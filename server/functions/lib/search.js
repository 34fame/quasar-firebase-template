// TODO add event logging
const algolia = require('../services/algolia')

exports.save = (data) => {
   data.objectID = data.id
   data._tags = data.tags ? data.tags : []
   delete data.id
   delete data.tags

   try {
      algolia.save(data)
      return true
   } catch (error) {
      throw new Error(error)
   }
}

exports.delete = (id) => {
   try {
      algolia.delete(id)
      return true
   } catch (error) {
      throw new Error(error)
   }
}

exports.exec = async (searchString) => {
   try {
      return await algolia.search(searchString)
   } catch (error) {
      throw new Error(error)
   }
}
