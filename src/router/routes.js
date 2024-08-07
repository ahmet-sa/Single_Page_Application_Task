const routes = [
  {
    path: '/',
    component: () => import('@/layout/MainLayout.vue'), // '@' is a common alias for 'src'
    children: [
      { path: '', component: () => import('@/pages/MainPage.vue') },
      { path: 'post', component: () => import('@/pages/MainPage.vue') },
      { path: 'user', component: () => import('@/pages/UserPage.vue') }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('@/pages/ErrorNotFound.vue')
  }
]

export default routes
