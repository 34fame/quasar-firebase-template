const routes = [
   {
      name: 'login',
      path: 'login',
      component: () => import('./pages/Login.vue'),
      children: [
         {
            name: 'identify',
            path: 'identify',
            component: () => import('./components/Identify.vue'),
         },
         {
            name: 'providers',
            path: 'providers',
            component: () => import('./components/Providers.vue'),
         },
         {
            name: 'signup',
            path: 'signup',
            component: () => import('./components/Signup.vue'),
         },
      ],
   },

   {
      name: 'logout',
      path: 'logout',
      component: () => import('./pages/Logout.vue'),
   },
]

export default routes
