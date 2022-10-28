export default [
  { path: 'modules', component: () => import('components/admin/catalogs/modules/Index.vue') },
  { path: 'modules/create', component: () => import('components/admin/catalogs/modules/Create.vue') },
  { path: 'modules/:id/edit', component: () => import('components/admin/catalogs/modules/Edit.vue') }
]
