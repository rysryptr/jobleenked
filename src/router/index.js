import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import JobsView from '@/views/JobsView.vue'
import JobView from '@/views/JobView.vue'
import JobVacancyView from '@/views/JobVacancyView.vue'
import AddJobView from '@/views/AddJobView.vue'
import EditJobView from '@/views/EditJobView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/jobs',
      name: 'jobs',
      component: JobsView
    },
    {
      path: '/jobs/:id',
      name: 'job',
      component: JobView
    },
    {
      path: '/company/:name',
      name: 'company-name',
      component: JobVacancyView
    },
    {
      path: '/jobs/add',
      name: 'add-job',
      component: AddJobView
    },
    {
      path: '/jobs/edit/:id',
      name: 'edit-job',
      component: EditJobView
    },
  ]
})

export default router;