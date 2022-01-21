const Logger = require('./logger')
const jwt = require('jsonwebtoken')

const jwt_secret = process.env.JWT_SECRET

const generate = async ({ eventId, profile }) => {
   const fn = 'JWT-GENERATE'
   try {
      Logger.debug(`*** (${eventId}) ${fn} starting...`)
      Logger.debug(`*** (${eventId}) -> profile ${JSON.stringify(profile)}...`)

      const accessToken = jwt.sign(profile, jwt_secret)

      Logger.debug(`*** (${eventId}) created jwt...`)
      return accessToken
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

const verify = (token) => {
   console.log('v-token', token)
   console.log('v-secret', jwt_secret)
   const result = jwt.verify(token, jwt_secret, (err, profile) => {
      if (err) {
         console.error('v-err', err)
         return false
      }
      console.log('v-profile', profile)
      return profile
   })
   return result
}

const authorize = (req, res, next) => {
   const fn = 'JWT-VERIFY'
   try {
      Logger.debug(`*** (${req.eventId}) ${fn} starting...`)
      const authHeader = req.headers.authorization
      const token = authHeader.substr(7)
      Logger.debug(`*** (${req.eventId}) -> token ${token}...`)
      const profile = verify(token)
      if (!!profile) {
         Logger.debug(`*** (${req.eventId}) verified token...`)
         Logger.debug(`*** (${req.eventId}) ${JSON.stringify(profile)}`)
         req.profile = profile
         next()
      } else {
         Logger.debug(`*** (${req.eventId}) -> token could not be verified...`)
         return res.sendStatus(403)
      }
   } catch (error) {
      Logger.error(`!!!!`)
      Logger.error(`! Source: ${fn}`)
      Logger.error(`! Event ID: ${req.eventId}`)
      Logger.error(`! ${error.message}`)
      Logger.error(`!!!!`)
      res.sendStatus(401)
   } finally {
      Logger.debug(`*** (${req.eventId}) ${fn} ending...`)
   }
}

module.exports = {
   generate,
   authorize,
   verify,
}
