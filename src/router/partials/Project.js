export default [
  { path: 'project', component: () => import('components/project/Index.vue') },
  { path: 'project/create', component: () => import('components/project/Create.vue') },
  { path: 'project/:id/edit', component: () => import('components/project/Edit.vue') }
]
