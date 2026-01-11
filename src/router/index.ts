import { createRouter, createWebHistory } from 'vue-router'
import AllFormsView from '@/views/AllFormsView.vue'
import FormDetailsView from '@/views/FormDetailsView.vue'
import NewFormView from '@/views/NewFormView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'AllForms', component: AllFormsView },
    { path: '/form', name: 'NewForm', component: NewFormView},
    { path: '/form/:id', name: 'FormDetails', component: FormDetailsView}
  ],
})

export default router
