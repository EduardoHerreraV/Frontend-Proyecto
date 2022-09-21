export default [
  { path: 'initiative', component: () => import('components/initiative/Index.vue') },
  { path: 'initiative/create', component: () => import('components/initiative/Create.vue') },
  { path: 'initiative/:id/edit', component: () => import('components/initiative/Edit.vue') }
]
