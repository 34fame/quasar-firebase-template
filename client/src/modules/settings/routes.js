const routes = [
   {
      path: 'settings',
      component: () => import('./pages/Index.vue'),
      children: [
         {
            name: 'about',
            path: 'about',
            component: () => import('./components/About.vue'),
         },
         {
            name: 'appearance',
            path: 'appearance',
            component: () => import('./components/Appearance.vue'),
         },
         {
            name: 'language',
            path: 'language',
            component: () => import('./components/Language.vue'),
         },
         {
            name: 'subscription',
            path: 'subscription',
            component: () => import('./components/Subscription.vue'),
         },
      ],
   },
]

export default routes
