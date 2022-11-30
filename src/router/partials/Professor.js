export default [
  { path: 'professor', component: () => import('components/professor/Index.vue') },
  { path: 'professor/create', component: () => import('components/professor/Create.vue') },
  { path: 'professor/:id/edit', component: () => import('components/professor/Edit.vue') }
]
