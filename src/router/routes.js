import User from './partials/User'
import IndexCatalogs from 'src/router/admin/Catalogs/index'
import Groups from 'src/router/admin/Catalogs/groups/groups'
import Degree from 'src/router/admin/Catalogs/degree/degree'
import Matter from 'src/router/admin/Catalogs/matter/matter'
import Modules from 'src/router/admin/Catalogs/modules/modules'
import Profiles from 'src/router/admin/Catalogs/profiles/profiles'
import Students from './partials/Students'
import Professor from './partials/Professor'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'index', component: () => import('pages/Index.vue') },
      { path: 'test', name: 'test', component: () => import('pages/Test.vue') },
      ...User,
      ...IndexCatalogs,
      ...Groups,
      ...Degree,
      ...Matter,
      ...Modules,
      ...Profiles,
      ...Students,
      ...Professor
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
