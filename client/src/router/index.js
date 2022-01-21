import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import { storage } from 'boot/storage'

Vue.use(VueRouter)

const router = new VueRouter({
   scrollBehavior: () => ({ x: 0, y: 0 }),
   routes,
   mode: process.env.VUE_ROUTER_MODE,
   base: process.env.VUE_ROUTER_BASE,
})

router.beforeEach((to, from, next) => {
   if (to.name === 'public') next()

   const securePath = to.path.startsWith('/secure')

   const isAuthenticated = storage.has('isAuthenticated')

   if (securePath && !isAuthenticated) {
      next({ name: 'login' })
   } else {
      if (to.name === 'users-create') console.log(to)
      next()
   }
})

export default function () {
   return router
}

export { router }
