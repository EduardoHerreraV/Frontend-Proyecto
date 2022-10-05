export default [
  { path: 'user', component: () => import('components/user/Index.vue') },
  { path: 'user/create', component: () => import('components/user/Create.vue') },
  { path: 'user/:id/edit', component: () => import('components/user/Edit.vue') }
]
