/**
 * Top level routes
 */
const anonymous = {
   path: '/',
   component: () => import('layouts/PublicLayout.vue'),
   children: [],
}

const auth = {
   path: '/auth',
   component: () => import('layouts/EmptyLayout.vue'),
   children: [],
}

const secure = {
   path: '/secure',
   component: () => import('layouts/MainLayout.vue'),
   children: [
      { name: 'home', path: '', component: () => import('pages/Index.vue') },
      // { path: '', redirect: { name: 'users-list' } },
   ],
}

/**
 * Add Anonymous routes
 */
import anonymousRoutes from '../modules/anonymous/routes'
anonymous.children.push(...anonymousRoutes)

/**
 * Add Authentication routes
 */
import authRoutes from '../modules/auth/routes'
auth.children.push(...authRoutes)

/**
 * Add Secure routes
 */
import usersRoutes from '../modules/users/routes'
secure.children.push(...usersRoutes)

import rolesRoutes from '../modules/roles/routes'
secure.children.push(...rolesRoutes)

import eventsRoutes from '../modules/events/routes'
secure.children.push(...eventsRoutes)

import accountRoutes from '../modules/account/routes'
secure.children.push(...accountRoutes)

import settingsRoutes from '../modules/settings/routes'
secure.children.push(...settingsRoutes)

/**
 * Apply all routes
 */
const routes = [].concat(anonymous, auth, secure)

/**
 * Append catchall route
 */
routes.push(
   // Always leave this as last one,
   // but you can also remove it
   {
      path: '*',
      component: () => import('pages/Error404.vue'),
   }
)

export default routes
