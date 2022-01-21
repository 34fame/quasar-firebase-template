const routes = [
   {
      path: 'roles',
      component: () => import('./pages/Index.vue'),
      children: [
         {
            name: 'roles-list',
            path: '',
            component: () => import('pages/List.vue'),
         },
         {
            name: 'roles-view',
            path: 'view/:id',
            component: () => import('pages/ViewForm.vue'),
         },
         {
            name: 'roles-create',
            path: 'create',
            component: () => import('pages/CreateForm.vue'),
         },
         {
            name: 'roles-update',
            path: 'update/:id',
            component: () => import('pages/UpdateForm.vue'),
         },
      ],
   },
]

export default routes
