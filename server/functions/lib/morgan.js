const morgan = require('morgan')

const Logger = require('./logger')

const stream = {
   write: (message) => Logger.http(message),
}

const skip = () => {
   const env = process.env.APP_ENV || 'dev'
   return env === 'prod'
}

const morganMiddleware = morgan(
   ':method :url :status :res[content-length] - :response-time ms',
   { stream, skip }
)

module.exports = morganMiddleware
