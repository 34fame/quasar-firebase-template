const routes = [
   {
      path: 'users',
      meta: { module: 'users' },
      component: () => import('./pages/Index.vue'),
      children: [
         {
            name: 'users-list',
            path: '',
            component: () => import('pages/List.vue'),
         },
         {
            name: 'users-view',
            path: 'view/:id',
            component: () => import('pages/ViewForm.vue'),
         },
         {
            name: 'users-create',
            path: 'create',
            component: () => import('pages/CreateForm.vue'),
         },
         {
            name: 'users-update',
            path: 'update/:id',
            component: () => import('pages/UpdateForm.vue'),
         },
      ],
   },
]

export default routes
