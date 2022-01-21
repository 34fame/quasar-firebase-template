const routes = [
   {
      path: 'account',
      component: () => import('./pages/Index.vue'),
      children: [
         {
            name: 'profile',
            path: 'profile',
            component: () => import('./components/Profile.vue'),
         },
         {
            name: 'featurerequest',
            path: 'feature-request',
            component: () => import('./components/FeatureRequest.vue'),
         },
         {
            name: 'reportbug',
            path: 'report-bug',
            component: () => import('./components/ReportBug.vue'),
         },
      ],
   },
]

export default routes
