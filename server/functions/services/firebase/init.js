// TODO add event logging
const admin = require('firebase-admin')
const serviceAccount = require('./service-account.json')
const projectId = serviceAccount.project_id

if (process.env.FUNCTIONS_EMULATOR === 'true') {
   admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: `https://${projectId}.firebaseio.com`,
   })
} else {
   admin.initializeApp()
}

exports.firestore = admin.firestore()
exports.fireauth = admin.auth()
exports.firebucket = admin.storage().bucket(projectId + '.appspot.com')
