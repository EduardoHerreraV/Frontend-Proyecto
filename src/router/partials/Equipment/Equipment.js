export default [
  { path: 'visits/equipment', component: () => import('components/equipment/Index.vue') },
  { path: 'visits/equipment/create', component: () => import('components/equipment/Create.vue') },
  { path: 'visits/equipment/:id/edit', component: () => import('components/equipment/Edit.vue') }
]
