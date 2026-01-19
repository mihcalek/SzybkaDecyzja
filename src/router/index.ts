import { createRouter, createWebHistory } from 'vue-router'
import AllFormsView from '@/views/AllFormsView.vue'
import FormDetailsView from '@/views/FormDetailsView.vue'
import NewFormView from '@/views/NewFormView.vue'
import ImportFormView from '@/views/ImportFormView.vue'
import TestView from '@/views/TestView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'AllForms', component: AllFormsView },
    { path: '/form', name: 'NewForm', component: NewFormView},
    { path: '/form/:id', name: 'FormDetails', component: FormDetailsView},
    { path: '/import', name: 'ImportForm', component: ImportFormView },
    { path: '/test', name: "Test", component: TestView },
  ],
})

export default router
