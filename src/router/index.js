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
    },
    {
      path: '/nuevo-meeti',
      name: 'new-meeti',
      component: () => import('@/views/admin/meeti/NewMeetiView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/editar-meeti/:id',
      name: 'edit-meeti',
      component: () => import('@/views/admin/meeti/EditMeetiView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/delete-meeti/:id',
      name: 'delete-meeti',
      component: () => import('@/views/admin/meeti/DeleteMeetiView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/editar-perfil',
      name: 'edit-profile',
      component: () => import('@/views/admin/EditProfileView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/editar-imagen-perfil',
      name: 'edit-image-profile',
      component: () => import('@/views/admin/EditImageProfile.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/meeti/:id',
      name: 'meeti',
      component: () => import('@/views/MeetiView.vue')
    },
    {
      path: '/asistentes-meeti/:id',
      name: 'assistants',
      component: () => import('@/views/AssistantsMeetiView.vue')
    },
    {
      path: '/usuario/:id',
      name: 'user',
      component: () => import('@/views/UserView.vue')
    },
    {
      path: '/grupo/:id',
      name: 'group',
      component: () => import('@/views/GroupView.vue')
    },
    {
      path: '/meetis/category/:id',
      name: 'meetis-category',
      component: () => import('@/views/MeetisCategoryView.vue')
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
