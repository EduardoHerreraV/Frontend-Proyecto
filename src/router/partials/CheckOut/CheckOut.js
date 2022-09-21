export default [
  { path: 'visits/check-out', component: () => import('components/check-out/Index.vue') },
  { path: 'visits/check-out/:id/register', component: () => import('components/check-out/Create.vue') }
]
