import Vue from 'vue'
import Vuex from 'vuex'

import users from '../modules/users/store'
import roles from '../modules/roles/store'
import events from '../modules/events/store'

Vue.use(Vuex)

const store = new Vuex.Store({
   modules: {
      users,
      roles,
      events,
   },
   strict: process.env.DEBUGGING,
})

export default function () {
   return store
}

export { store }
