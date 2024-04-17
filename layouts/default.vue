<script setup lang="ts">
</script>

<template>
  <div>
    <Header />

    <main class="min-h-[calc(100vh-var(--header-height))]">
      <slot />
    </main>

    <Footer />
  </div>
</template>
