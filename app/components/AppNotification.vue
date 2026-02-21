<script setup>
import { useNotification } from '~/composables/useNotification'

const { notifications, removeNotification } = useNotification()
</script>

<template>
  <div class="fixed bottom-4 left-1/2 -translate-x-1/2 flex flex-col gap-2 z-50">
    <UAlert
      v-for="n in notifications"
      :key="n.id"
      :color="n.type === 'error' ? 'error' : n.type === 'success' ? 'success' : 'warning'"
      variant="soft"
      class="w-80"
      closable
      @close="removeNotification(n.id)"
    >
      <template #title>
        {{ n.title }}
      </template>
      {{ n.message }}
    </UAlert>
  </div>
</template>
