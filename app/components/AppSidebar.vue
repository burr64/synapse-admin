<script setup>
const config = useRuntimeConfig();
</script>
<template>
  <header class="rounded-2xl w-64 h-full p-4 flex flex-col justify-between bg-white">
    <div class="flex flex-col gap-8">
      <h2 class="text-xl font-bold">{{ config.public.serverName }}</h2>
      <ul class="flex flex-col gap-2">
        <li>
          <UButton variant="ghost" size="xl" to="/users" icon="material-symbols:group-outline" class="w-full">{{
            $t("users") }}</UButton>
        </li>
        <li>
          <UButton variant="ghost" size="xl" to="/rooms" icon="material-symbols:android-messages-outline"
            class="w-full">{{ $t("rooms") }}</UButton>
        </li>
      </ul>
    </div>
    <UButton variant="ghost" size="xl" to="/auth" icon="ic:baseline-log-out">{{ $t("logout") }}</UButton>
  </header>
</template>
