import Vue from 'vue'
import VueLogger from 'vuejs-logger'
const isProduction = process.env.ENV === 'prod'

const options = {
   isEnabled: true,
   logLevel: isProduction ? 'error' : 'debug',
   stringifyArguments: false,
   showLogLevel: true,
   showMethodName: true,
   separator: '|',
   showConsoleColors: true,
}

Vue.use(VueLogger, options)

/**
data() {
    return {
      a : 'a',
      b : 'b'
   }
},
created() {
   this.$log.debug('test', this.a, 123)
   this.$log.info('test', this.b)
   this.$log.warn('test')
   this.$log.error('test')
   this.$log.fatal('test')
}

function externalFunction() {
   Vue.$log.debug('log from function outside component.');
}
*/
