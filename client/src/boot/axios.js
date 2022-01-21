import Vue from 'vue'
import axios from 'axios'

import { storage } from './storage'

const instance = axios.create({})

instance.defaults.baseURL = process.env.API_BASEURL
instance.defaults.headers.common['Accept'] = 'application/json'
instance.defaults.headers.post['Content-Type'] = 'application/json'
instance.defaults.headers.patch['Content-Type'] = 'application/json'

const setAuthorizationHeader = (config) => {
   console.log('setAuthorizationHeader')
   if (storage.has('tokens')) {
      const tokens = storage.getItem('tokens')
      console.log('setAuthorizationHeader', 'tokens', tokens)
      if (tokens.api) {
         config.headers['Authorization'] = `Bearer ${tokens.api}`
      }
   }
   console.log('setAuthorizationHeader', 'headers', config.headers)
   return config
}

const setAppHeaders = (config) => {
   if (storage.has('profiles')) {
      const profiles = storage.getItem('profiles')
      config.headers.c_userid = profiles.app ? profiles.app.id : profiles.auth.id
      // config.headers.c_tenantid = profiles.app ? profiles.app.tenantId : profiles.auth.tenantId
   }
   console.log('setAppHeaders', 'headers', config.headers)
   return config
}

instance.interceptors.request.use(
   function (config) {
      setAuthorizationHeader(config)
      setAppHeaders(config)
      return config
   },
   function (error) {
      return error
   }
)

Vue.prototype.$axios = instance
export { instance }
