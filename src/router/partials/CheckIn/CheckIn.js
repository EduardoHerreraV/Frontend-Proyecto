export default [
  { path: 'register-visit', component: () => import('components/visit/Index.vue') },
  { path: 'visit/register-visitor', component: () => import('components/visit/partials/Visitor.vue') }
]
