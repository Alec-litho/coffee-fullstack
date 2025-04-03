<template>
  <div>
    <NuxtPage/>
  </div>
</template>

<script>

onMounted(() => {
  const authStore = useAuthStore()

  authStore.initializeAuth()
})
</script>