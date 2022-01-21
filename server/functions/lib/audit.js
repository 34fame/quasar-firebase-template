const db = require('./db')

// TODO add event logging
exports.save = async ({
   actionId,
   performedBy = '',
   performedOn = '',
   data = '',
   context = '',
}) => {
   try {
      await db.createDoc({
         collection: 'audit',
         data: {
            timestamp: new Date().valueOf(),
            actionId,
            performedBy,
            performedOn,
            data,
            context,
         },
      })
   } catch (error) {
      console.error('audit', error.message)
   }
}
