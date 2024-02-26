import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/auth/RegisterView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/admin/AdminView.vue')
    },
    {
      path: '/nuevo-grupo',
      name: 'new-group',
      component: () => import('@/views/admin/group/NewGroupView.vue')
    },
    {
      path: '/editar-grupo/:id',
      name: 'edit-group',
      component: () => import('@/views/admin/group/EditGroupView.vue')
    },
    {
      path: '/editar-imagen-grupo/:id',
      name: 'edit-image-group',
      component: () => import('@/views/admin/group/EditImageView.vue')
    },
    {
      path: '/eliminar-grupo/:id',
      name: 'delete-group',
      component: () => import('@/views/admin/group/DeleteGroupView.vue')
    }
  ]
})

export default router
