export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  css: ['@/assets/styles/main.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/styles/vars.scss" as *;'
        }
      }
    }
  },


  compatibilityDate: '2025-03-25'
})