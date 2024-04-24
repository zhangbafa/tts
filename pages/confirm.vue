<script setup lang="ts">
const user = useSupabaseUser()
// const cookieName = useRuntimeConfig().public.supabase.cookieName
// const redirectPath = useCookie(`${cookieName}-redirect-path`).value

watch(user, () => {
  if (user.value) {
      // Redirect to protected page
      return navigateTo('/')

  }
}, { immediate: true })
</script>

<template>
  <div class="text-sm text-gray-600 p-2">Waiting for login...</div>
</template>
