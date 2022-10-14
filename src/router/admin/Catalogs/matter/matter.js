export default [
  { path: 'matter', component: () => import('components/admin/catalogs/matter/Index.vue') },
  { path: 'matter/create', component: () => import('components/admin/catalogs/matter/Create.vue') },
  { path: 'matter/:id/edit', component: () => import('components/admin/catalogs/matter/Edit.vue') }
]
