export default [
  { path: 'visits/no-exit', component: () => import('components/no-exit/Index.vue') },
  { path: 'visits/no-exit/:id/register', component: () => import('components/no-exit/Edit.vue') }
]
