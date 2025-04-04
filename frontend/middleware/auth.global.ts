import { useAuthStore } from "~/stores/auth.store";

export default defineNuxtRouteMiddleware((to) => {
  
  const authStore = useAuthStore()
  authStore.initializeAuth()

  if (to.path === '/login' && authStore.isAuthenticated) {
    return navigateTo('/products')
  }

  if (to.path !== '/login' && !authStore.isAuthenticated) {
    return navigateTo('/login')
  }
}) 