import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { authApi } from '@/api/authApi'

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
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/admin/AdminView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/nuevo-grupo',
      name: 'new-group',
      component: () => import('@/views/admin/group/NewGroupView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/editar-grupo/:id',
      name: 'edit-group',
      component: () => import('@/views/admin/group/EditGroupView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/editar-imagen-grupo/:id',
      name: 'edit-image-group',
      component: () => import('@/views/admin/group/EditImageView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/eliminar-grupo/:id',
      name: 'delete-group',
      component: () => import('@/views/admin/group/DeleteGroupView.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.meta.requiresAuth
  if (requiresAuth) {
    try {
      await authApi.private()
      next()
    } catch (error) {
      console.log(error)
      next({ name: 'login'})
    }
  } else {
    next()
  }
})

export default router
