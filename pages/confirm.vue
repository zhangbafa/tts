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
  <div>Waiting for login...</div>
  <pre>
    <!-- {{ cookieName }}
    {{ redirectPath }} -->
    </pre>
</template>
