import User from './partials/User'
import IndexCatalogs from 'src/router/admin/index'
import Degree from 'src/router/admin/Catalogs/degree/degree'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'index', component: () => import('pages/Index.vue') },
      { path: 'test', name: 'test', component: () => import('pages/Test.vue') },
      ...User,
      ...IndexCatalogs,
      ...Degree
    ],
    beforeEnter: (to, from, next) => {
      if (sessionStorage.getItem('sci_token')) {
        next()
      } else {
        next('/login')
      }
      // if (to.name !== 'index' && !sessionStorage.getItem('sci_token')) next('/login')
      // next()
    }
  },
  {
    path: '/login',
    component: () => import('pages/Login.vue'),
    beforeEnter: (to, from, next) => {
      if (to.name !== 'Login' && sessionStorage.getItem('sci_token')) next('/')
      next()
    },
    children: [
      { path: '', name: 'Login', component: () => import('pages/Index.vue') }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
