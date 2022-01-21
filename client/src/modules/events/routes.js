const routes = [
   {
      path: 'events',
      component: () => import('./pages/Index.vue'),
      children: [
         {
            name: 'events-list',
            path: '',
            component: () => import('pages/List.vue'),
         },
         {
            name: 'events-view',
            path: 'view/:id',
            component: () => import('pages/ViewForm.vue'),
         },
      ],
   },
]

export default routes
