export default [
  { path: 'degree', component: () => import('components/admin/catalogs/degree/Index.vue') },
  { path: 'degree/create', component: () => import('components/admin/catalogs/degree/Create.vue') },
  { path: 'degree/:id/edit', component: () => import('components/admin/catalogs/degree/Edit.vue') }
]
