<script setup>
const config = useRuntimeConfig();
</script>
<template>
  <header
    class="rounded-2xl w-64 h-full p-4 flex flex-col justify-between bg-white"
  >
    <div class="flex flex-col gap-8">
      <h2 class="text-xl font-bold">{{ config.public.serverName }}</h2>
      <ul class="flex flex-col gap-2">
        <li class="w-fit">
          <NuxtLink to="/users" class="flex items-center gap-2">
            <Icon name="material-symbols:group-outline" size="1.5em" />
            <span>{{ $t("users") }}</span>
          </NuxtLink>
        </li>
        <li class="w-fit">
          <NuxtLink to="/rooms" class="flex items-center gap-2">
            <Icon name="material-symbols:android-messages-outline" size="1.5em" />
            <span>{{ $t("rooms") }}</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
    <UButton variant="ghost" to="/auth" icon="ic:baseline-log-out">{{ $t("logout") }}</UButton>
  </header>
</template>
