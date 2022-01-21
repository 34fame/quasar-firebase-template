const routes = [
   {
      name: 'public',
      path: '',
      component: () => import('./pages/Index.vue'),
   },
   {
      name: 'learn',
      path: 'learn',
      component: () => import('./pages/Learn.vue'),
   },
   {
      name: 'pricing',
      path: 'pricing',
      component: () => import('./pages/Pricing.vue'),
   },
   {
      name: 'products',
      path: 'products',
      component: () => import('./pages/Products.vue'),
   },
]

export default routes
