<script setup>
const config = useRuntimeConfig()

useHead({
  style: [
    {
      children: `:root { --ui-primary: ${config.public.mainColor}; }`
    }
  ]
})
</script>
<template>
  <div class="md:min-h-screen md:h-screen">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <AppNotification />
  </div>
</template>