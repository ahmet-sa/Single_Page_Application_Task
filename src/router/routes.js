const routes = [
  {
    path: '/',
    component: () => import('C:\\Users\\ahmee\\OneDrive\\Masaüstü\\d7k\\d7kTask\\src\\layout\\MainLayout.vue'),
    children: [
      { path: '', component: () => import('C:\\Users\\ahmee\\OneDrive\\Masaüstü\\d7k\\d7kTask\\src\\pages\\MainPage.vue') },
      { path: 'user', component: () => import('C:\\Users\\ahmee\\OneDrive\\Masaüstü\\d7k\\d7kTask\\src\\pages\\UserPage.vue') }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('C:\\Users\\ahmee\\OneDrive\\Masaüstü\\d7k\\d7kTask\\src\\pages\\ErrorNotFound.vue')
  }
]

export default routes
