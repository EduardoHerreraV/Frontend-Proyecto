export default [
  { path: 'profiles', component: () => import('components/admin/catalogs/profiles/Index.vue') },
  { path: 'profiles/create', component: () => import('components/admin/catalogs/profiles/Create.vue') },
  { path: 'profiles/:id/edit', component: () => import('components/admin/catalogs/profiles/Edit.vue') }
]
