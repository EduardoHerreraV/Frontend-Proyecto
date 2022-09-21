export default [
  { path: 'task', component: () => import('components/task/Index.vue') },
  { path: 'task/Create', component: () => import('components/task/Create.vue') },
  { path: 'task/:id/edit', component: () => import('components/task/Edit.vue') },
  { path: 'task/:id/status', component: () => import('components/task/Status.vue') },
  { path: 'task/:id/binnacle', component: () => import('components/task/Binnacle.vue') }

]
