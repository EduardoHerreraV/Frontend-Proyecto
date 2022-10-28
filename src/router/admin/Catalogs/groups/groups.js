export default [
  { path: 'groups', component: () => import('components/admin/catalogs/groups/Index.vue') },
  { path: 'groups/create', component: () => import('components/admin/catalogs/groups/Create.vue') },
  { path: 'groups/:id/edit', component: () => import('components/admin/catalogs/groups/Edit.vue') }
]
